<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
import navBar from '../components/navBar.vue'
</script>

<template>
  <div class="navBar">
    <navBar />
  </div>
  <main>
    <TheWelcome />
  </main>
</template>
