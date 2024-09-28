<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import selectorComponent from '@/components/selectorComponent.vue';
import { useRegitrosStore } from '@/stores/registros.js'
import FilterTable from '@/components/FilterTable.vue'; 
import FooterN from '@/components/Footer-n.vue';

const registerStore = useRegitrosStore()

// Computed para obtener todos los registros, facultades, programas y periodos
const respuesta = computed(() => registerStore.registros)
const facultades = computed(() => registerStore.facultades)
const programas = computed(() => registerStore.programas)
const periodos = computed(() => registerStore.periodos)
const registrosFiltrados = computed(() => registerStore.registrosFiltrados)

// Filtros
const filtroFacultad = ref('')
const filtroPrograma = ref('')
const filtroPeriodo = ref('')

// Variables para paginación
const currentPage = ref(1) // Página actual
const itemsPerPage = ref(10) // Límite de registros por página

// Total de páginas, calculado dinámicamente
const totalPages = computed(() => Math.ceil(datosAMostrar.value.length / itemsPerPage.value))

onMounted(async () => {
  await registerStore.getRegisters()
  registerStore.getFaculties()
  registerStore.getPeriods()
  registerStore.cleanFilteredRegisters()
})

// Watcher para aplicar los filtros
watch([filtroFacultad, filtroPrograma, filtroPeriodo], ([faculieSelected, programSelected, periodSelected]) => {
  if (faculieSelected !== '') {
    registerStore.getProgramsByFaculty(faculieSelected)
  }
  registerStore.filteredRegisters(faculieSelected, programSelected, periodSelected)
  currentPage.value = 1 // Reiniciar a la primera página cuando se aplican filtros
})

// Computed para manejar los datos que se mostrarán en la tabla
const datosAMostrar = computed(() => {
  // Si no se ha seleccionado ningún filtro, mostramos todos los datos (respuesta)
  if (!filtroFacultad.value && !filtroPrograma.value && !filtroPeriodo.value) {
    return respuesta.value
  }
  // Si los filtros están aplicados, mostramos los registros filtrados
  return registrosFiltrados.value
})

// Computed para la paginación, obtiene los registros correspondientes a la página actual
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return datosAMostrar.value.slice(start, end)
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
      <div v-if="paginatedData.length > 0">
        <!-- Cambiado: Contenedor con scroll utilizando Tailwind -->
        <div class="max-h-96 overflow-y-auto border border-gray-300 mt-5">
          <!-- Componente de la Tabla -->
          <FilterTable :datos="paginatedData" />
        </div>
        <!-- Fin del contenedor con scroll -->

        <!-- Controles de paginación -->
        <div class="pagination mt-5 flex justify-center items-center space-x-4">
          <button 
            @click="currentPage = Math.max(currentPage - 1, 1)" 
            :disabled="currentPage === 1" 
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">
            Anterior
          </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button 
            @click="currentPage = Math.min(currentPage + 1, totalPages)" 
            :disabled="currentPage === totalPages" 
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50">
            Siguiente
          </button>
        </div>
      </div>

      <div v-else>
        <!-- Si no hay se muestra este mensaje -->
        <p class="text-center text-gray-500 py-6">No se encontraron registros para los filtros seleccionados.</p>
      </div>
    </div>
    <br>
  </div>
  <FooterN />
</template>


