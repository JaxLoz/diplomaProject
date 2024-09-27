<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import selectorComponent from '@/components/selectorComponent.vue';
import { useResitrosStore } from '@/stores/registros.js'

const registerStore = useResitrosStore()

// Almacena los datos de la respuesta de la API
const respuesta = computed(() => registerStore.registros) 
const facultades = computed(() => registerStore.facultades)
const programas = computed(() => registerStore.programas)
const periodos = computed(() => registerStore.periodos)
const registrosFiltrados = computed(() => registerStore.registrosFiltrados)

// Almacena el valor seleccionado del filtro de facultad, programa y periodo
const filtroFacultad = ref('')
const filtroPrograma = ref('')
const filtroPeriodo = ref('')


onMounted(async () => {
  await registerStore.getRegisters()
  registerStore.getFaculties()
  registerStore.getPeriods()
  console.log(respuesta.value)
})

watch([filtroFacultad, filtroPrograma, filtroPeriodo], ([faculieSelected, programSeleted, periodSelected]) => {
    if(faculieSelected !== ''){
      registerStore.getProgramsByFaculty(faculieSelected)
    }
    console.log(faculieSelected)
    registerStore.filteredRegisters(faculieSelected, programSeleted, periodSelected)
    
})



// Computed para filtrar los datos por facultad, programa y periodo seleccionados



/** 
const datosFiltrados = computed(() => {
  return respuesta.value.filter((fila) => {
    const coincideFacultad = !filtroFacultad.value || fila.facultad === filtroFacultad.value
    const coincidePrograma = !filtroPrograma.value || fila.programa === filtroPrograma.value
    const coincidePeriodo = !filtroPeriodo.value || fila.periodo === filtroPeriodo.value
    return coincideFacultad && coincidePrograma && coincidePeriodo
  })
})
  */
</script>


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
            :titleLabel="'Selecciona una programa'"
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


    <!-- Tabla que muestra los datos filtrados -->
    <div class="table-responsive">
        <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Periodo
                </th>
                <th scope="col" class="px-6 py-3">
                    Facultad
                </th>
                <th scope="col" class="px-6 py-3">
                    Programa
                </th>
                <th scope="col" class="px-6 py-3">
                    Total
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fila in (registrosFiltrados.length !== 0 ? registrosFiltrados : respuesta )" :key="fila.id" class="bg-white border-b">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ fila.periodo }}
                </th>
                <td class="px-6 py-4">
                    {{ fila.facultad }}
                </td>
                <td class="px-6 py-4">
                    {{ fila.programa }}
                </td>
                <td class="px-6 py-4">
                    {{ fila.total_matricula }}
                </td>
            </tr>
        </tbody>
    </table>
</div>


    </div>
  </div>
</div>
</template>
