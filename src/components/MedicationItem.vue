<script setup>
import {ref} from "vue";

defineProps(["medication"]);
const showModification = ref(false);
const medicationToModify = ref(null);
const isNewImage = ref(false);
const emit = defineEmits(["eventDeleteItem", "eventModifyQuantityItem", "eventModify"]);

function openModify(medication) {
  showModification.value = true;
  medicationToModify.value = { ...medication };
}

function closeModify() {
  showModification.value = false;
  medicationToModify.value = null;
}

function validModification() {
  if(!isNewImage.value) {
    delete medicationToModify.value.photo;
  }
  showModification.value = false;
  emit('eventModify', medicationToModify.value);
  isNewImage.value = false;
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    medicationToModify.value.photo = reader.result
    isNewImage.value = true;
  };
  reader.readAsDataURL(file);
};

</script>

<template>
  <div class="card">
    <p>{{medication.denomination}}</p>
    <ul>
      <li>Quantite en stock: {{ medication.quantity }}</li>
      <li>Sous forme de: {{medication.formepharmaceutique}}</li>
    </ul>

    <div class="item">
      <button @click="$emit('eventDeleteItem', medication.id)">Supprimer</button>
      <button @click="openModify(medication)">Modifier</button>

      <div>
        <form v-if="showModification" class="modif" @submit.prevent="validModification()">
          <h3>Modifier Médicament</h3>
          <input type="text" v-model="medicationToModify.denomination" placeholder="Nom" />
          <input type="text" v-model="medicationToModify.formepharmaceutique" placeholder="Forme" />
          <input type="number" v-model="medicationToModify.quantity" placeholder="Quantité" min="1"/>
          <input id="photo" @change="handleFileUpload" type="file" />

          <button type="submit">Valider</button>
          <button type="button" @click="closeModify">Annuler</button>
        </form>
      </div>

      <div>
        <button @click="$emit('eventModifyQuantityItem', { ...medication, qte: medication.quantity + 1 })">+1</button>
        <button @click="$emit('eventModifyQuantityItem', { ...medication, qte: medication.quantity - 1 })">-1</button>
      </div>
      <br>
      <div class="image">
        <img v-if="medication.photo" :src="'https://apipharmacie.pecatte.fr/images/' + medication.photo" alt="L'image du médicament" class="image"/>
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