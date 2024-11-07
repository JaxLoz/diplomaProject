<template>
    <div class="container mx-auto p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="w-full md:w-1/3 lg:w-1/4">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <selectorComponent 
              v-model="filtroFacultad"
              :titleLabel="'Selecciona una facultad'"
              :defaultOption="'Todas las facultades'"
              :arrayOptions="facultades"
              class="mb-4"
            />
    
            <selectorComponent 
              v-model="filtroPrograma"
              :titleLabel="'Selecciona un programa'"
              :defaultOption="'Todos los programas'"
              :arrayOptions="programas"
              class="mb-4"
            />
    
            <selectorComponent 
              v-model="filtroPeriodo"
              :titleLabel="'Selecciona un periodo'"
              :defaultOption="'Todos los periodos'"
              :arrayOptions="periodos"
              class="mb-4"
            />
          </form>
        </div>
       
        <div class="w-full md:w-2/3 lg:w-3/4">
          <div class="bg-white shadow-md rounded p-4 flex flex-row justify-center">
            <barGrafic />
          </div>
        </div>
      </div>
    </div>
  </template>
<script setup>
import { useRegitrosStore } from '@/stores/registros.js'
import { computed, onMounted, ref, watch } from 'vue';

const useRegistros = useRegitrosStore()

const facultades = computed(() => useRegistros.facultades)
const programas = computed(() => useRegistros.programas)
const periodos = computed(() => useRegistros.periodos)

const filtroFacultad = ref('')
const filtroPrograma = ref('')
const filtroPeriodo = ref('')

onMounted(async () => {
    await useRegistros.getRegisters()
    useRegistros.getFaculties()
    useRegistros.getPeriods()
    useRegistros.cleanFilteredRegisters()
})

watch([filtroFacultad, filtroPrograma, filtroPeriodo], ([faculieSelected, programSelected, periodSelected]) => {
    if (faculieSelected !== '') {
        useRegistros.getProgramsByFaculty(faculieSelected)
    }
    useRegistros.filteredRegisters(faculieSelected, programSelected, periodSelected)
    useRegistros.getStratumByDataFilter()
})


</script>