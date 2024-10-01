<script setup>
import { RouterView } from 'vue-router'
import DarkModeService from '@/service/DarkModeService.js'
import { onMounted } from 'vue';

onMounted(() => {
  DarkModeService.checkDarkModeOnMounted()
}) 

</script>
<template>
  <RouterView />
</template>


