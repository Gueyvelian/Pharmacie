<script setup>
import {ref} from "vue";
import Commande from "@/Commande.js";

const props = defineProps(["listCommande"]);
const emit = defineEmits(["displayCommande"]);
const commandeNom = ref ("");
const medicament = ref ("");
const medicamentQuantite = ref ("");


function nouvelleCommande(){
  emit("displayCommande");
  let newCommande = new Commande(commandeNom.value, medicament.value, medicamentQuantite.value);
  props.listCommande.push(newCommande);
}

</script>


<template>
  <form @submit.prevent="nouvelleCommande">
    <input type="text" v-model="commandeNom" placeholder="Nom du demandeur" required/>
    <input type="text" v-model="medicament" placeholder="Medicament" required/>
    <input type="number" v-model="medicamentQuantite" placeholder="Quantité" min="1" required/>
    <input type="submit" value="valider" />
  </form>

</template>

<style scoped>

</style>