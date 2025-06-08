<script setup>
import {ref} from "vue";
const url = "https://apipharmacie.pecatte.fr/api/8/medicaments"
const emit = defineEmits(['rafraichirListeMedicaments']);

const denomination = ref("");
const formPharmaceutique = ref("");
const quantity = ref(0);
const photo = ref(null);


function addMedication() { // ce qui est sortie du formulaire
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST", // je dis que je veux ajouter
    headers: myHeaders,
    body: JSON.stringify({ denomination : denomination.value,formepharmaceutique: formPharmaceutique.value, photo:photo.value,qte:quantity.value }),
  };
  fetch(url, fetchOptions)
      .then((response) =>{ return response.json()
      })
      .then((dataJSON) => {
        emit('rafraichirListeMedicaments');
      })
      .catch((error) => console.log(error));

}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    photo.value = reader.result
  };
  reader.readAsDataURL(file);
};

</script>

<template>
  <form @submit.prevent="addMedication">
    <input type="text" v-model="denomination" placeholder="Nom du medicament" required/>
    <input type="text" v-model="formPharmaceutique" placeholder="Forme pharmaceutique" required/>
    <input type="number" v-model="quantity" placeholder="Quantité" min="1" required/>
    <input id="photo" @change="handleFileUpload" type="file" />
    <input type="submit" value="valider" />
  </form>
</template>

<style scoped>

</style>