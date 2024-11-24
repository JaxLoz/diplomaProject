<template>
  <div class="content overflow-hidden">
    <div class="relative overflow-y-auto shadow-md sm:rounded-lg">
      <div
        class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
      >
        <div>
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <span class="sr-only">Action button</span>
            Action
            <svg
              class="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <!-- Dropdown menu -->
          <div
            id="dropdownAction"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <button
                  @click="solicitanteModal.toggleModal()"
                  class="flex flex-row items-center gap-x-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    class="w-[15px] h-[15px] text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Registrar solicitante</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <label for="table-search" class="sr-only">Search </label>
        <div class="relative">
          <div
            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="searchValue"
            @input="searchSolicitante"
            type="text"
            id="table-search-users"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar solicitante"
          />
        </div>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">NOMBRE</th>

            <th scope="col" class="px-6 py-3">EMAIL</th>

            <th scope="col" class="px-6 py-3">CELULAR</th>

            <th scope="col" class="px-6 py-3">TIPO SOLICITANTE</th>

            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="solicitante in solicitantes"
            :key="solicitante.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="px-6 py-4">
              {{ solicitante.id }}
            </td>

            <td class="px-6 py-4">
              {{ solicitante.nombre }}
            </td>

            <td class="px-6 py-4">
              {{ solicitante.email }}
            </td>

            <td class="px-6 py-4">
              {{ solicitante.celular }}
            </td>

            <td class="px-6 py-4">
              {{ solicitante.tipo_solicitante }}
            </td>

            <td class="px-6 py-4">
              <div class="flex flex-row justify-between items-center">
                <div>
                  <button @click="openUpdateSolicitanteModal(solicitante)">
                    <svg
                      class="w-[18px] h-[18px] icon-button"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <button @click="deleteSolicitante(solicitante.id)">
                    <svg
                      class="w-[18px] h-[18px] text-gray-800 dark:text-gray-400 dark:hover:text-red-600 transition-colors duration-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <SolicitanteModal ref="solicitudModal" />
</template>
<script setup>
import useSolicitanteStore from '@/stores/solicitante'
import SolicitanteModal from './SolicitanteModal.vue'
import debounce from '@/utils/debounce'
import { initFlowbite } from 'flowbite'
import { useTemplateRef, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const solicitanteModal = useTemplateRef('solicitudModal')

const solicitanteStore = useSolicitanteStore()

const { solicitantes } = storeToRefs(solicitanteStore)

const { fetchSolicitantes, deleteSolicitante } = solicitanteStore

const searchValue = ref('')

const searchSolicitante = debounce(async () => {
  let filterType = 'nombre' // Valor predeterminado

  // Detectar tipo de filtro basado en el valor
  if (/^\d{10}$/.test(searchValue.value)) {
    filterType = 'celular'
  } else if (searchValue.value.includes('@')) {
    filterType = 'email'
  }

  await fetchSolicitantes(`filter[${filterType}]=${searchValue.value}`)
}, 500)

const openUpdateSolicitanteModal = (solicitante) => {
  solicitanteModal.value.setSolicitante(solicitante)
  solicitanteModal.value.toggleModal()
}

onMounted(() => {
  initFlowbite()

  fetchSolicitantes()
})
</script>
