<template>
  <div class="relative overflow-x-auto">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md"
    >
      <caption
        class="p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
      >
        Acta
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Acta de la sesión #</p>
      </caption>
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Id del acta</th>
          <th scope="col" class="px-1 py-3">Estado del acta</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(acta) in actas"
          :key="acta.ID_ACTA"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ acta.ID_ACTA }}
          </th>
          <td class="px-2 py-4">
            <form class="mx-auto">
              <select
                v-model="acta.ESTADO"
                @change="updateActaState(acta)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 sblock w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="pendiente">Pendiente</option>
                <option value="aprobada">Aprobada</option>
                <option value="rechazada">Rechazada</option>
              </select>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useActaStore } from '@/stores/actas.js'

const route = useRoute()
const actasStore = useActaStore()

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
    console.log('Estado de acta actualizado:', response)
  } catch (error) {
    console.error('Error al actualizar el estado de la acta:', error)
  }
}
</script>
