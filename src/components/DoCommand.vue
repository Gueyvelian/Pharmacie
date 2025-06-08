<script setup>
import {ref} from "vue";
import Command from "@/Command.js";

const props = defineProps(["listCommand"]);
const emit = defineEmits(["displayCommand"]);
const commandName = ref ("");
const medication = ref ("");
const commandQuantity = ref ("");


function newCommand(){
  emit("displayCommand");
  let newCommand = new Command(commandName.value, medication.value, commandQuantity.value);
  props.listCommand.push(newCommand);
}

</script>


<template>
  <form @submit.prevent="newCommand">
    <input type="text" v-model="commandName" placeholder="Nom du demandeur" required/>
    <input type="text" v-model="medication" placeholder="Medication" required/>
    <input type="number" v-model="commandQuantity" placeholder="Quantité" min="1" required/>
    <input type="submit" value="valider" />
  </form>

</template>

<style scoped>

</style>