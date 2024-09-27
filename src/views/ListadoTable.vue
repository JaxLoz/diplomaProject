<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import selectorComponent from '@/components/selectorComponent.vue';
import { useResitrosStore } from '@/stores/registros.js'
import FilterTable from '@/components/FilterTable.vue'; 

const registerStore = useResitrosStore()


const respuesta = computed(() => registerStore.registros)
const facultades = computed(() => registerStore.facultades)
const programas = computed(() => registerStore.programas)
const periodos = computed(() => registerStore.periodos)
const registrosFiltrados = computed(() => registerStore.registrosFiltrados)

// Filtros
const filtroFacultad = ref('')
const filtroPrograma = ref('')
const filtroPeriodo = ref('')

onMounted(async () => {
  await registerStore.getRegisters()
  registerStore.getFaculties()
  registerStore.getPeriods()
})

watch([filtroFacultad, filtroPrograma, filtroPeriodo], ([faculieSelected, programSelected, periodSelected]) => {
  if (faculieSelected !== '') {
    registerStore.getProgramsByFaculty(faculieSelected)
  }
  registerStore.filteredRegisters(faculieSelected, programSelected, periodSelected)
})

</script>

<template>
    <div class="body-content">
      <div class="tablita">
        <div class="selects">
          <!-- Selectores -->
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
  
        <!-- Si hay datos se muestran -->
        <div v-if="registrosFiltrados.length > 0">
          <!-- Componente de la Tabla -->
          <FilterTable :datos="registrosFiltrados" />
        </div>
  
        <div v-else>
          <!-- Si no hay se muestra este mensaje -->
          <p class="text-center text-gray-500 py-6">No se encontraron registros para los filtros seleccionados.</p>
        </div>
      </div>
    </div>
  </template>
  
