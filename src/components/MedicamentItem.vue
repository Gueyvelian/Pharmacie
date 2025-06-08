<script setup>
import {ref} from "vue";

defineProps(["medicament"]);
const afficherModif = ref(false);
const medicamentAModifier = ref(null);
const isNewImage = ref(false);
const emit = defineEmits(["eventDeleteItem", "eventModifQteItem", "eventModifier"]);

function ouvrirModif(medicament) {
  afficherModif.value = true;
  medicamentAModifier.value = { ...medicament };
}

function fermerModif() {
  afficherModif.value = false;
  medicamentAModifier.value = null;
}

function validerModification() {
  if(!isNewImage.value) {
    delete medicamentAModifier.value.photo;
  }
  afficherModif.value = false;
  emit('eventModifier', medicamentAModifier.value);
  isNewImage.value = false;
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    medicamentAModifier.value.photo = reader.result
    isNewImage.value = true;
  };
  reader.readAsDataURL(file);
};

</script>

<template>
  <div class="card">
    <p>{{medicament.denomination}}</p>
    <ul>
      <li>Quantite en stock: {{medicament.qte}} </li>
      <li>Sous forme de: {{medicament.formepharmaceutique}}</li>
    </ul>

    <div class="item">
      <button @click="$emit('eventDeleteItem', medicament.id)">Supprimer</button>
      <button @click="ouvrirModif(medicament)">Modifier</button>

      <div>
        <form v-if="afficherModif" class="modif" @submit.prevent="validerModification()">
          <h3>Modifier Médicament</h3>
          <input type="text" v-model="medicamentAModifier.denomination" placeholder="Nom" />
          <input type="text" v-model="medicamentAModifier.formepharmaceutique" placeholder="Forme" />
          <input type="number" v-model="medicamentAModifier.qte" placeholder="Quantité" min="1"/>
          <input id="photo" @change="handleFileUpload" type="file" />

          <button type="submit">Valider</button>
          <button type="button" @click="fermerModif">Annuler</button>
        </form>
      </div>

      <div>
        <button @click="$emit('eventModifQteItem', { ...medicament, qte: medicament.qte + 1 })">+1</button>
        <button @click="$emit('eventModifQteItem', { ...medicament, qte: medicament.qte - 1 })">-1</button>
      </div>
      <br>
      <div class="image">
        <img v-if="medicament.photo" :src="'https://apipharmacie.pecatte.fr/images/' + medicament.photo" alt="L'image du médicament" class="image"/>
      </div>
    </div>
  </div>

</template>

<style scoped>
.card {
  border: 2px solid gray;
  padding: 10px;
  border-radius: 10px;
}

.modif {
  display: flex;
  flex-direction: column;
}

.image {
  height: 100px;
  width: 100px;
  border-radius: 8px;
}
</style>