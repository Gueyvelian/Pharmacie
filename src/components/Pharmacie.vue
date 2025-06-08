<script setup>
import MedicamentList from "@/components/MedicamentList.vue";
import FaireCommande from "@/components/FaireCommande.vue";
import AjoutMedicament from "@/components/AjoutMedicament.vue";
import Commande from "@/Commande.js";
import Header from "@/components/Header.vue";

import {reactive, ref} from "vue";
const afficher = ref(false)
const nouveauMedicament = ref(false)
const nouvelleListe = ref(null);
const listCommande = reactive([new Commande("Dupont", "Doliprane", 5), new Commande("Lemont", "Doliprane", 5)])
let afficherListe = ref(false);
let textBoutonListeCommande = ref("Liste des commandes")

function ajouterChampCommande() {
  afficher.value = !afficher.value
}

function aficherListeCommande() {
  afficherListe.value = !afficherListe.value
  if (afficherListe.value){
    textBoutonListeCommande = "Fermer"
  }
  else{
    textBoutonListeCommande = "Liste des commandes"
  }
}

function ajouterChampMedicament() {
  nouveauMedicament.value = !nouveauMedicament.value
}


function rafraichirListeMedicaments() {
  if (nouvelleListe.value) {
    nouvelleListe.value.getMedicaments();
    nouveauMedicament.value = false;
  }
}

function displayCommande() {
  if (afficher) {
    afficher.value = false;
  }
}

</script>

<template>
  <Header/>
  <button @click="ajouterChampCommande">Faire une commande</button>

  <FaireCommande v-if="afficher" :listCommande="listCommande" @displayCommande="displayCommande" />


  <button @click="aficherListeCommande">{{ textBoutonListeCommande }}</button>
  <div v-if="afficherListe">
    <h4>Commandes passées :</h4>
    <ul
        v-for="(commande, index) in listCommande"
        :key="index">
      <li>{{commande.pourAfficher()}}</li>
    </ul>
  </div>

  <MedicamentList ref="nouvelleListe"/>

  <button @click="ajouterChampMedicament">Ajout d'un medicament</button>

  <AjoutMedicament v-if="nouveauMedicament" @rafraichirListeMedicaments="rafraichirListeMedicaments" />
</template>

<style scoped>

</style>