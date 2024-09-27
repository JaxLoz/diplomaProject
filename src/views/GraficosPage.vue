<template>
    <div class="body-content">
        <div class="tablita">
    
        <div class="selects">
        
        <form class="max-w-sm mx-auto">
            <selectorComponent 
                v-model=""
                :titleLabel="'Selecciona una facultad'"
                :defaultOption="'Todas las facultades'"
                :arrayOptions=""
            />
    
            <selectorComponent 
                v-model=""
                :titleLabel="'Selecciona una programa'"
                :defaultOption="'Todos los programas'"
                :arrayOptions=""
            />
    
            <selectorComponent 
                v-model=""
                :titleLabel="'Selecciona un periodo'"
                :defaultOption="'Todos los periodos'"
                :arrayOptions=""
            />
        </form>
    </div>
        <div class="table-responsive">
            <div class="relative overflow-x-auto">
        
    </div>
    
    
        </div>
        </div>
    </div>
  </template>
<script setup>
import selectorComponent from '@/components/selectorComponent.vue';
import useResitrosStore from '@/stores/registersStore';

const useRegistros = useRes

const facultades = 
</script>