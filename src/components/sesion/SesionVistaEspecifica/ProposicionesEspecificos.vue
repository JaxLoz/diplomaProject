<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md"
    >
      <caption
        class="p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 rounded-t-lg"
      >
        Proposiciones
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
          Proposiciones de la Sesión #
        </p>
      </caption>
    </table>

    <div class="createAction">
      <div
        class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900"
      >
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          @click="openCreateModal"
        >
          Crear Proposición
        </button>
      </div>
    </div>

    <!-- Tabla de Proposiciones -->
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">ID</th>
          <th scope="col" class="px-6 py-3">Descripción</th>
          <th scope="col" class="px-6 py-3">Decisión</th>
          <th scope="col" class="px-6 py-3">Proponente</th>
          <th scope="col" class="px-6 py-3"><span class="sr-only">Edit</span></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="proposiciones in proposiciones.data"
          :key="selectedProposicionId"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ proposiciones.ID_PROPOSICIONES }}
          </th>
          <td class="px-6 py-4">{{ proposiciones.DESCRIPCION }}</td>
          <td class="px-2 py-4">
            <form class="mx-auto">
              <select
                v-model="proposiciones.DESICION"
                @change="updateDecision(proposiciones)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="pendiente">Pendiente</option>
                <option value="aprobada">Aprobada</option>
                <option value="rechazada">Rechazada</option>
              </select>
            </form>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
              >
                <span class="font-medium text-gray-600 dark:text-gray-300">{{
                  proposiciones.MIEMBRO_IDMIEMBRO
                }}</span>
              </div>
              <div class="ps-3">
                <!-- Nombre del miembro -->
                <div class="text-base font-semibold">{{ proposiciones.miembro.NOMBRE }}</div>
                <!-- Correo del miembro -->
                <div class="font-normal text-gray-500">{{ proposiciones.miembro.users.email }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="centroAction">
              <button
                data-modal-target="EditProposicion"
                data-modal-toggle="EditProposicion"
                class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                type="button"
                @click="openEditModal(proposiciones)"
              >
                Editar
              </button>
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                @click="deleteProposicion(proposiciones)"
              >
                Borrar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div class="p-4">
      <paginationBar :pages="proposiciones" :size="'small'" @change-page="changePage" />
    </div>

    <!-- Modal for Edit Proposition -->
    <ModalEditProposicionEspecifico
      :idProposicion="selectedProposicionId"
      ref="editProposicionModal"
    />
    <!-- Modal for Create Proposition -->
    <ModalCreateProposicionEspecifico ref="createProposicionModal" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import urlService from '@/service/urlService';


import ModalCreateProposicionEspecifico from './ModalCreateProposicionEspecifico.vue';
import ModalEditProposicionEspecifico from './ModalEditProposicionEspecifico.vue';
import { useProposicionStore } from '@/stores/proposiciones.js';
import paginationBar from '@/components/util/paginationBar.vue';

const route = useRoute()
// Aquí solo debes usar useProposicionStore() para acceder al store
const proposicionStore = useProposicionStore() // Cambié el nombre a 'proposicionStore' para evitar el conflicto
const emits = defineEmits(['updateDecision'])

// Local variable to store fetched proposiciones
const proposiciones = ref([])

const changePage = (numPage) =>{
 proposiciones.value = proposicionStore.fetchProposicionesOfSesion(route.params.idSesion, urlService.getParamsFromUrl({page:numPage}))

}

const selectedProposicionId = computed(() => proposicionStore.selectedProposicion?.ID_PROPOSICIONES)
// Fetch proposiciones when the component is mounted
onMounted(async () => {
  const fetchedProposiciones = await proposicionStore.fetchProposicionesOfSesion(
    route.params.idSesion
  )
  proposiciones.value = fetchedProposiciones // Store the fetched proposiciones in the local variable
})

// Method to handle the update of the proposicion decision
const updateDecision = async (proposicion) => {
  try {
    const response = await proposicionStore.updateDecision(proposicion) // Using the 'updateDecision' method from the store
    emits('updateDecision', proposicion.ESTADO)
    console.log('Decisión actualizada:', response)
  } catch (error) {
    console.error('Error al actualizar la decisión de la proposición:', error)
  }
}

const deleteProposicion = async (proposicion) => {
  if (!proposicion || !proposicion.ID_PROPOSICIONES) {
    console.log('Fetched proposiciones:', proposiciones.value)
    console.error('Proposición no válida:', proposicion)
    return
  }
  try {
    const response = await proposicionStore.deleteProposicion(proposicion.ID_PROPOSICIONES)
    if (response) {
      // Remove deleted proposition from local data
      proposiciones.value = proposiciones.value.filter(
        (p) => p.ID_PROPOSICIONES !== proposicion.ID_PROPOSICIONES
      )
      console.log('Proposición eliminada')
    }
  } catch (error) {
    console.error('Error al eliminar la proposición:', error)
  }
}

const createProposicionModal = ref(null)

const openCreateModal = () => {
  createProposicionModal.value.openModal()
}
const editProposicionModal = ref(null)

const openEditModal = (id) => {
  editProposicionModal.value.openModal(id) // Llama al método y pasa el ID
}
</script>
