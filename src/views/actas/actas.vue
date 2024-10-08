<template>    
    <div class="content overflow-hidden">
      <div class="overflow-x-auto w-full">
        <mainTable />
      </div>
      <modalactas :title="'Nuevas actas'" />
    </div>
  
  </template>
  
  <script setup>
  
  import mainTable from '@/components/actas/actascomponente.vue';
  import modalactas from '@/views/actas/modalactas.vue'
  
  </script>