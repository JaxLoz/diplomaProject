<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4 space-y-8">
    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <!-- Sección de Encabezado -->
      <div class="p-4 border-b dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Acta
        </h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Acta de la sesión #
        </p>
      </div>

      <!-- Contenedor de Tabla -->
      <div class="overflow-hidden rounded-b-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">ID del acta</th>
              <th scope="col" class="px-4 py-3">Estado del acta</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(acta, index) in actas"
              :key="acta.ID_ACTA"
              :class="[
                'bg-white dark:bg-gray-800',
                index !== actas.length - 1 ? 'border-b dark:border-gray-700' : ''
              ]"
            >
              <td
                scope="row"
                class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ acta.ID_ACTA }}
              </td>
              <td class="px-4 py-4">
                <!-- Selector de Estado -->
                <select
                  v-model="acta.ESTADO"
                  @change="updateActaState(acta)"
                  class="w-full max-w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="aprobada">Aprobada</option>
                  <option value="rechazada">Rechazada</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useActaStore } from '@/stores/actas.js'

const route = useRoute()
const actasStore = useActaStore()
const emits = defineEmits(['updateStateOfActa'])

// Local variable to store fetched actas
const actas = ref([])

// Fetch actas when the component is mounted
onMounted(async () => {
  const fetchedActas = await actasStore.fetchActaOfSesionById(route.params.idSesion)
  actas.value = fetchedActas // Store the fetched actas in the local variable
})

// Method to handle the update of the acta state
const updateActaState = async (acta) => {
  try {
    const response = await actasStore.estado(acta) // Using the 'estado' method from the store
    emits('updateStateOfActa', acta.ESTADO) 
    console.log('Estado de acta actualizado:', response)
  } catch (error) {
    console.error('Error al actualizar el estado de la acta:', error)
  }
}
</script>
