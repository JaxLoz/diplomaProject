<template>
    <div class="content overflow-hidden">
        <div class="relative overflow-y-auto shadow-md sm:rounded-lg">
            <div
                class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">

                <label for="table-search" class="sr-only">Search </label>
                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input v-model="asunto" @input="searchSolicitudes" type="text" id="table-search-users"
                        class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar solicitud por asunto">
                </div>
            </div>


            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        <th scope="col" class="px-6 py-3">
                            ID SOLICITUD
                        </th>
                        <th scope="col" class="px-6 py-3">
                            DEPENDENCIA
                        </th>

                        <th scope="col" class="px-6 py-3">
                            ASUNTO
                        </th>

                        <th scope="col" class="px-6 py-3">
                            DECISIÓN
                        </th>

                        <th scope="col" class="px-6 py-3">
                            FECHA DE SOLICITUD
                        </th>

                        <th scope="col" class="px-6 py-3">
                            SOLICITANTE
                        </th>

                        <th scope="col" class="px-6 py-3">
                            SESIÓN
                        </th>

                        <th scope="col" class="px-6 py-3">

                        </th>

                    </tr>
                </thead>
                <tbody>

                    <tr v-for="solicitud in solicitudes.data" :key="solicitud.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4">
                            {{ solicitud.id }}
                        </td>

                        <td class="px-6 py-4">
                            {{ solicitud.dependencia }}
                        </td>

                        <td class="px-6 py-4">
                            {{ solicitud.asunto }}
                        </td>

                        <td class="px-6 py-4">
                            {{ solicitud.desicion }}
                        </td>

                        <td class="px-6 py-4">
                            {{ formatDateService.extractDate(solicitud.fecha_solicitud) }}
                        </td>

                        <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div class="flex items-center">
                                <div
                                    class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span
                                        class="font-medium text-gray-600 dark:text-gray-300">{{ getAcronymName.getAcronymName(solicitud.solicitante.nombre) }}</span>
                                </div>
                                <div class="ps-3">
                                    <div class="text-base font-semibold">{{ solicitud.solicitante.nombre }}</div>
                                    <div class="font-normal text-gray-500">{{ solicitud.solicitante.email }}</div>
                                </div>
                            </div>
                        </td>

                        <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div class="flex items-center">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">{{ solicitud.sesion.lugar }}</div>
                                    <div class="font-normal text-sm text-gray-500"> {{
                                        formatDateService.extractDate(solicitud.sesion.fecha) }}</div>
                                    <div class="font-normal text-sm text-gray-500"> {{
                                        formatDateService.extractHour(solicitud.sesion.hora_inicio) }}</div>
                                </div>
                            </div>
                        </td>


                        <td class="px-6 py-4">
                            <div class="flex flex-row justify-between items-center">
                                <div>
                                    <button @click="openUpdateSolicitudModal(solicitud.id)">
                                        <svg class="w-[18px] h-[18px] icon-button" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd"
                                                d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                                clip-rule="evenodd" />
                                            <path fill-rule="evenodd"
                                                d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>


                                <div>
                                    <button @click="deleteSolicitud(solicitud.id)">
                                        <svg class="w-[18px] h-[18px] text-gray-800 dark:text-gray-400 dark:hover:text-red-600 transition-colors duration-200"
                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>



                        </td>
                    </tr>


                </tbody>
            </table>

            <nav v-if="solicitudes.links" class="flex justify-center" aria-label="Page navigation example">
                <ul class="inline-flex m-4 -space-x-px text-sm">
                    
                        <button @click="getPageFromUrl(solicitudes.prev_page_url)" 
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Anterior
                        </button>
                        <button v-for="link in solicitudes.links.slice(1, solicitudes.links.length - 1 )" @click="getPageFromUrl(link.url)"  type='button' v-html="link.label" :class="{ 'dark:bg-gray-400 dark:text-gray-700': link.active }" :disabled="link.active"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            
                        </button>
        
                        <button @click="getPageFromUrl(solicitudes.next_page_url)"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Siguiente
                        </button>
                    
                </ul>
            </nav>
        </div>
    </div>
    <SolicitudModal ref="solicitudModal" />

</template>
<script setup>
import SolicitudModal from './SolicitudModal.vue';
import getAcronymName from '@/service/stringFormat';
import formatDateService from '@/service/formatDateService';
import { initFlowbite } from 'flowbite';
import { useTemplateRef, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import debounce from '@/utils/debounce';
import useSolicitudStore from '@/stores/solicitud';

const solicitudModal = useTemplateRef('solicitudModal')

const asunto = ref('');
const solicitudStore = useSolicitudStore();

const {
    solicitudes
} = storeToRefs(solicitudStore);

const {
    fetchSolicitudes,
    deleteSolicitud
} = solicitudStore;


const openUpdateSolicitudModal = (id) => {
    solicitudModal.value.loadInfoBySesionId(id);
    solicitudModal.value.toggleModal();
}

const searchSolicitudes = debounce(async () => {

    let query = `page=1`;

    if (asunto.value) {
        query += `&filter[asunto]=${asunto.value}`;
    }

    await fetchSolicitudes(query);

}, 500);

const getPageFromUrl = (url) => {
    if (url === null) return;

    const urlObject = new URL(url);

    const page = urlObject.searchParams.get('page') || 1;

    changePage(page);
}

const changePage = async (page) => {

    let query = `page=${page}`;

    if (asunto.value) {
        query += `&filter[asunto]=${asunto.value}`;
    }


    await fetchSolicitudes(query);
}


onMounted(() => {
    initFlowbite();

    searchSolicitudes();
});
</script>