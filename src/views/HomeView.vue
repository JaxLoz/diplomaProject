<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
import navBar from '../components/icons/util/navBar.vue'
</script>

<template>
  <div class="sideBar">
    <Side_bar />
  </div>
  <div class="navBar">
    <navBar />
  </div>
  <main>
    <TheWelcome />
  </main>
</template>
