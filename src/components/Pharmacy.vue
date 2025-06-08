<script setup>
import MedicationList from "@/components/MedicationList.vue";
import DoCommand from "@/components/DoCommand.vue";
import AddMedication from "@/components/AddMedication.vue";
import Command from "@/Command.js";
import Header from "@/components/Header.vue";

import {reactive, ref} from "vue";
const display = ref(false)
const newMedication = ref(false)
const newList = ref(null);
const listCommand = reactive([new Command("Dupont", "Doliprane", 5), new Command("Lemont", "Doliprane", 5)])
let displayList = ref(false);
let textButtonListCommand = ref("Liste des commandes")

function displayCommandField() {
  display.value = !display.value
}

function displayListCommand() {
  displayList.value = !displayList.value
  if (displayList.value){
    textButtonListCommand = "Fermer"
  }
  else{
    textButtonListCommand = "Liste des commandes"
  }
}

function displayMedicationField() {
  newMedication.value = !newMedication.value
}


function refreshListMedications() {
  if (newList.value) {
    newList.value.getMedication();
    newMedication.value = false;
  }
}

function displayCommand() {
  if (display) {
    display.value = false;
  }
}

</script>

<template>
  <Header/>
  <button @click="displayCommandField">Faire une commande</button>

  <DoCommand v-if="display" :listCommand="listCommand" @displayCommand="displayCommand" />


  <button @click="displayListCommand">{{ textButtonListCommand }}</button>
  <div v-if="displayList">
    <h4>Commandes passées :</h4>
    <ul
        v-for="(command, index) in listCommand"
        :key="index">
      <li>{{ command.toDisplay() }}</li>
    </ul>
  </div>

  <MedicationList ref="newList"/>

  <button @click="displayMedicationField">Ajout d'un medicament</button>

  <AddMedication v-if="newMedication" @refreshListMedications="refreshListMedications" />
</template>

<style scoped>

</style>