<template>    
  <div class="content overflow-hidden">
    <div class="overflow-x-auto w-full">
      <sesionTabla 
      :data="infoSession"
      />
    </div>
    <modalSession :title="'Nueva sesion'" />
  </div>

</template>

<script setup>
import sesionTabla from '@/components/sesion/sesionTabla.vue'
import modalSession from '@/views/sesion/modalSession.vue'

import { useSessionStore } from '@/stores/session'
import { computed } from 'vue';

const sessionStore = useSessionStore()

const infoSession = computed(() => sessionStore.sessions)

</script>
  

  