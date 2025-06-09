<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import MedicationItem from "@/components/MedicationItem.vue";

const API_URL = "https://apipharmacie.pecatte.fr/api/8/medicaments";

const medications = reactive([]);
const pharmaceuticalForms = reactive([]);
const selectedForme = ref("");
const research = ref("");

const medicationFiltered = computed(() => {
  if (!selectedForme.value) {
    return medications;
  }
  return medications.filter(
      (med) => med.formepharmaceutique === selectedForme.value
  );
});

function getMedication() {
  fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        medications.splice(0, medications.length, ...data);
        updatePharmaceuticalForms();
      })
      .catch(console.error);
}

function deleteMedication (id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => getMedication())
      .catch(console.error);
}

function modifyQuantity(medication) {
  const copyMedication = { ...medication };
  delete copyMedication.photo;

  if (copyMedication.qte <= 0) {
    deleteMedication(copyMedication.id);
  } else {
    modifyMedication(copyMedication);
  }
}

function modifyMedication(medication){
  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medication),
  })
      .then(res => res.json())
      .then(() => getMedication())
      .catch(console.error);
}

function updatePharmaceuticalForms(){
  pharmaceuticalForms.splice(0, pharmaceuticalForms.length);
  medications.forEach(med => {
    if (!pharmaceuticalForms.includes(med.formepharmaceutique)) {
      pharmaceuticalForms.push(med.formepharmaceutique);
    }
  });
}

function researchMedcation() {
  if (!research.value) {
    getMedication();
    return;
  }
  const query = research.value.trim();
  if (!query) return;

  fetch(`${API_URL}?search=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((dataJSON) => {
        medications.splice(0, medications.length, ...dataJSON);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche :", error);
      });
}

onMounted(getMedication);

defineExpose({
  getMedication: getMedication,
});
</script>

<template>
  <div>
    <input
        v-model="research"
        @keyup.enter="researchMedcation"
        placeholder="Rechercher un médicament..."
    />
    <button @click="researchMedcation">Rechercher</button>


    <select v-model="selectedForme">
      <option value="">--Choisir une catégorie--</option>
      <option
          v-for="forme in pharmaceuticalForms"
          :key="forme"
          :value="forme"
      >
        {{ forme }}
      </option>
    </select>
  </div>

  <h3>Liste des médicaments</h3>

  <div class="liste">
    <MedicationItem
        v-for="(medication, index) in medicationFiltered"
        :key="medication.id"
        :medication="medication"
        :indexMedication="index"
        @eventDeleteItem="deleteMedication"
        @eventModifyQuantityItem="modifyQuantity"
        @eventModify="modifyMedication"
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