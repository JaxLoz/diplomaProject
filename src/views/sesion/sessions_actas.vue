<template>    
  <div class="content overflow-hidden">
    <div class="overflow-x-auto w-full">
      <mainTable />
    </div>
    <modalSession :title="'Nueva sesion'" />
  </div>

</template>

<script setup>

import mainTable from '@/components/util/mainTable.vue';
import modalSession from '@/views/sesion/modalSession.vue'

</script>
  

  