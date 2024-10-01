<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
import navBar from '../components/navBar.vue'
import Side_bar from '@/components/side_bar.vue';

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
