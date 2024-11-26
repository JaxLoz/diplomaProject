<template>
  <div
    v-if="isModalVisible" 
    class="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Editar Proposición</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <!-- Modal body -->
        <form @submit.prevent="submitProposicion" class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <!-- Descripción -->
            <div class="col-span-2">
              <label
                for="DESCRIPCION"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Descripción</label
              >
              <textarea
                v-model="dataproposicion.DESCRIPCION"
                rows="8"
                id="DESCRIPCION"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Descripción..."
              ></textarea>
            </div>

            <!-- Decisión -->


            <!-- Miembro ID -->
            <div class="col-span-2">
              <label
                for="MIEMBRO_IDMIEMBRO"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >ID del Miembro</label
              >
              <input
                v-model="dataproposicion.MIEMBRO_IDMIEMBRO"
                id="MIEMBRO_IDMIEMBRO"
                type="text"
                placeholder="ID del miembro..."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            </div>
          </div>

          <button
            type="submit"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Editar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import { useProposicionStore } from '@/stores/proposiciones.js'


defineProps(['idProposicion'])

const dataproposicion = ref({
  DESCRIPCION: '',
  MIEMBRO_IDMIEMBRO: ''
})

const idProposicion = ref(null)

const route = useRoute()
// Store de proposiciones
const proposicionStore = useProposicionStore()

const isModalVisible = ref(false)


const idSesion = computed(() => {
  const sessionId = route.params.idSesion // Obtener parámetro de la ruta
  return sessionId ? parseInt(sessionId, 10) : null
})

// Abrir el modal y cargar los datos
const openModal = async (proposicionId) => {
  dataproposicion.value = {
    DESCRIPCION: proposicionId.DESCRIPCION || '',
    MIEMBRO_IDMIEMBRO: proposicionId.MIEMBRO_IDMIEMBRO || '',
  }

  idProposicion.value = proposicionId 
  isModalVisible.value = true
}

// Cerrar el modal
const closeModal = () => {
  isModalVisible.value = false
}

const submitProposicion = async () => {
  try {
    const proposicionData = {
      ID_PROPOSICIONES: idProposicion.value.ID_PROPOSICIONES,
      DESCRIPCION: dataproposicion.value.DESCRIPCION,
      DESICION: idProposicion.value.DESICION,
      MIEMBRO_IDMIEMBRO: dataproposicion.value.MIEMBRO_IDMIEMBRO
    }
    console.log(proposicionData)

    const response = await proposicionStore.updateProposicion(proposicionData, idSesion.value)

    closeModal()
    proposicionStore.fetchProposicionesOfSesion(idSesion.value)
  } catch (error) {
    // Mostrar detalles del error
    if (error.response) {
      console.error('Error al crear proposición (respuesta del servidor):', error.response.data)
    }
  }
}

const proposiciones = computed(() => proposicionStore.proposiciones)

defineExpose({
  openModal
})
</script>
