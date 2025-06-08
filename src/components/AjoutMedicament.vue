<script setup>
import {ref} from "vue";
const url = "https://apipharmacie.pecatte.fr/api/8/medicaments"
const emit = defineEmits(['rafraichirListeMedicaments']);

const denomination = ref("");
const formepharmaceutique = ref("");
const qte = ref(0);
const photo = ref(null);


function ajoutMedicament() { // ce qui est sortie du formulaire
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST", // je dis que je veux ajouter
    headers: myHeaders,
    body: JSON.stringify({ denomination : denomination.value,formepharmaceutique: formepharmaceutique.value, photo:photo.value,qte:qte.value }),
  };
  fetch(url, fetchOptions)
      .then((response) =>{ return response.json()
      })
      .then((dataJSON) => {
        emit('rafraichirListeMedicaments'); // récup des données de la BDD (dont le new "produit" ajouté)
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
  <form @submit.prevent="ajoutMedicament">
    <input type="text" v-model="denomination" placeholder="Nom du medicament" required/>
    <input type="text" v-model="formepharmaceutique" placeholder="Forme pharmaceutique" required/>
    <input type="number" v-model="qte" placeholder="Quantité" min="1" required/>
    <input id="photo" @change="handleFileUpload" type="file" />
    <input type="submit" value="valider" />
  </form>
</template>

<style scoped>

</style>