<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed } from 'vue'
import axios from 'axios'
import navBar from '../components/navBar.vue'

// Almacena los datos de la respuesta de la API
const respuesta = ref([])

// Almacena el valor seleccionado del filtro de facultad, programa y periodo
const filtroFacultad = ref('')
const filtroPrograma = ref('')
const filtroPeriodo = ref('')

// Hacer la solicitud a la API
axios
  .get('https://www.datos.gov.co/resource/r86y-229a.json')
  .then(function (response) {
    // Manejar respuesta exitosa
    respuesta.value = response.data
    console.log(response.data) // Verifica que los datos se estén recibiendo correctamente
  })
  .catch(function (error) {
    // Manejar error
    console.log(error)
  })

// Computed para obtener la lista de facultades únicas
const facultades = computed(() => {
  const todasLasFacultades = respuesta.value.map((fila) => fila.facultad)
  return [...new Set(todasLasFacultades)] // Elimina duplicados
})

// Computed para obtener los programas únicos basados en la facultad seleccionada
const programas = computed(() => {
  if (!filtroFacultad.value) {
    return [] // Si no se ha seleccionado ninguna facultad, no hay programas
  }
  const programasPorFacultad = respuesta.value
    .filter((fila) => fila.facultad === filtroFacultad.value)
    .map((fila) => fila.programa)
  return [...new Set(programasPorFacultad)] // Elimina duplicados
})

// Computed para obtener los periodos únicos
const periodos = computed(() => {
  const todosLosPeriodos = respuesta.value.map((fila) => fila.periodo)
  return [...new Set(todosLosPeriodos)] // Elimina duplicados
})

// Computed para filtrar los datos por facultad, programa y periodo seleccionados
const datosFiltrados = computed(() => {
  return respuesta.value.filter((fila) => {
    const coincideFacultad = !filtroFacultad.value || fila.facultad === filtroFacultad.value
    const coincidePrograma = !filtroPrograma.value || fila.programa === filtroPrograma.value
    const coincidePeriodo = !filtroPeriodo.value || fila.periodo === filtroPeriodo.value
    return coincideFacultad && coincidePrograma && coincidePeriodo
  })
})
</script>


<template>
    <div class="body-content">
    <div class="navBar">
        <navBar />
    </div>
  <div class="tablita">
    <div class="selects">
    <!-- Selector para filtrar por facultad -->
    <form class="max-w-sm mx-auto">
        <label for="filtroFacultad" class="block mb-2 text-sm font-medium text-gray-900">
            Selecciona una facultad:
        </label>
        <select id="filtroFacultad" v-model="filtroFacultad" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">Todas las Facultades</option>
            <option v-for="facultad in facultades" :key="facultad" :value="facultad">
                {{ facultad }}
            </option>
        </select>
        <br>
    </form>

    <!-- Selector para filtrar por programa, se actualiza según la facultad seleccionada -->
    <form class="max-w-sm mx-auto">
        <label for="filtroPrograma" class="block mb-2 text-sm font-medium text-gray-900">
            Selecciona un programa:
        </label>
        <select id="filtroPrograma" v-model="filtroPrograma" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">Todos los programas</option>
            <option v-for="programa in programas" :key="programa" :value="programa">
                {{ programa }}
            </option>
        </select>
        <br>
    </form>

    <!-- Selector para filtrar por periodo -->
    <form class="max-w-sm mx-auto">
        <label for="filtroPeriodo" class="block mb-2 text-sm font-medium text-gray-900">
            Selecciona un periodo:
        </label>
        <select id="filtroPeriodo" v-model="filtroPeriodo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">Todos los periodos</option>
            <option v-for="periodo in periodos" :key="periodo" :value="periodo">
                {{ periodo }}
            </option>
        </select>
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
            <tr v-for="fila in datosFiltrados" :key="fila.id" class="bg-white border-b">
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
