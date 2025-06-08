<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import MedicamentItem from "@/components/MedicamentItem.vue";

const API_URL = "https://apipharmacie.pecatte.fr/api/8/medicaments";

const medicaments = reactive([]);
const formesPharmaceutiques = reactive([]);
const selectedForme = ref("");
const recherche = ref("");

// Liste filtrée selon la forme pharmaceutique sélectionnée
const medicamentsFiltres = computed(() => {
  if (!selectedForme.value) {
    return medicaments;
  }
  return medicaments.filter(
      (m) => m.formepharmaceutique === selectedForme.value
  );
});

// Récupère la liste des médicaments
function getMedicaments() {
  fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        medicaments.splice(0, medicaments.length, ...data);
        updateFormesPharmaceutiques();
      })
      .catch(console.error);
}

// Supprime un médicament via son ID
function deleteMedicament (id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => getMedicaments())
      .catch(console.error);
}

// Met à jour la quantité d’un médicament, ou le supprime si qte <= 0
function modifierQuantite(medicament) {
  const medicamentCopie = { ...medicament };
  delete medicamentCopie.photo;

  if (medicamentCopie.qte <= 0) {
    deleteMedicament(medicamentCopie.id);
  } else {
    modifierMedicament(medicamentCopie);
  }
}

// Modifie un médicament (PUT)
function modifierMedicament(medicament){
  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medicament),
  })
      .then(res => res.json())
      .then(() => getMedicaments())
      .catch(console.error);
}

// Met à jour la liste des formes pharmaceutiques
function updateFormesPharmaceutiques(){
  formesPharmaceutiques.splice(0, formesPharmaceutiques.length);
  medicaments.forEach(m => {
    if (!formesPharmaceutiques.includes(m.formepharmaceutique)) {
      formesPharmaceutiques.push(m.formepharmaceutique);
    }
  });
}

function rechercheMedicament() {
  if (!recherche.value) {
    getMedicaments();
    return;
  }
  const query = recherche.value.trim();
  if (!query) return;

  fetch(`${API_URL}?search=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((dataJSON) => {
        medicaments.splice(0, medicaments.length, ...dataJSON);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche :", error);
      });
}

onMounted(getMedicaments);

defineExpose({
  getMedicaments,
});
</script>

<template>
  <div>
    <input
        v-model="recherche"
        @keyup.enter="rechercheMedicament"
        placeholder="Rechercher un médicament..."
    />
    <button @click="rechercheMedicament">Rechercher</button>


    <select v-model="selectedForme">
      <option value="">--Choisir une catégorie--</option>
      <option
          v-for="forme in formesPharmaceutiques"
          :key="forme"
          :value="forme"
      >
        {{ forme }}
      </option>
    </select>
  </div>

  <h3>Liste des médicaments</h3>

  <div class="liste">
    <MedicamentItem
        v-for="(medicament, index) in medicamentsFiltres"
        :key="medicament.id"
        :medicament="medicament"
        :indexMedicamant="index"
        @eventDeleteItem="deleteMedicament"
        @eventModifQteItem="modifierQuantite"
        @eventModifier="modifierMedicament"
    />
  </div>
</template>

<style scoped>
.liste {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>