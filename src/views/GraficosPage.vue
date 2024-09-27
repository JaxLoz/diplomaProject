<template>
    <div class="body-content">
        <div class="tablita">
    
        <div class="selects">
        
        <form class="max-w-sm mx-auto">
            <selectorComponent 
                v-model="filtroFacultad"
                :titleLabel="'Selecciona una facultad'"
                :defaultOption="'Todas las facultades'"
                :arrayOptions="facultades"
            />
    
            <selectorComponent 
                v-model="filtroPrograma"
                :titleLabel="'Selecciona un programa'"
                :defaultOption="'Todos los programas'"
                :arrayOptions="programas"
            />
    
            <selectorComponent 
                v-model="filtroPeriodo"
                :titleLabel="'Selecciona un periodo'"
                :defaultOption="'Todos los periodos'"
                :arrayOptions="periodos"
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
import { useRegitrosStore } from '@/stores/registros.js'
import { computed, ref } from 'vue';

const useRegistros = useRegitrosStore()

const facultades = computed(() => useRegistros.facultades)
const programas = computed(() => useRegistros.programas)
const periodos = computed(() => useRegistros.periodos)

const filtroFacultad = ref('')
const filtroPrograma = ref('')
const filtroPeriodo = ref('')


</script>