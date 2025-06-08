<script setup>
import {ref} from "vue";

const afficheImage = ref(false)

function modePoule(){
  afficheImage.value=!afficheImage.value
}
</script>

<template>
  <h1>Stock de la pharmacie</h1>
  <button @click="modePoule">Mode Cot Cot</button>
  <div class="image">
    <img v-if="afficheImage" src="../assets/images/cocotte.gif" alt="L'image de la poule" class="image"/>
  </div>
</template>

<style scoped>

.image {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 1000;
}

.image img {
  width: 300px;
  height: auto;
}

</style>