<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4 space-y-8">
        <!-- Sección de Encabezado -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <!-- Header Section -->
            <div class="p-4 border-b dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Solicitudes
                </h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Solicitudes pendientes a revisar en la sesión
                </p>
            </div>

            <!-- Botón Crear -->
            <div class="p-4 border-b dark:border-gray-700 flex flex-row gap-4">
                <button @click="openCreateSolicitudModal" type="button"
                    class="inline-flex items-center justify-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Crear solicitud
                </button>


                <button @click="searchSolicitudes" type="button"
                    class="inline-flex items-center justify-center focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Actualizar tabla
                </button>

                <input v-model="asunto" @input="searchSolicitudes" type="text" id="table-search-users"
                    class="ml-auto block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar solicitud por asunto">

            </div>

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Dependencia
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Asunto
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Decisión
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fecha de solicitud
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Solicitante
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Descripción
                        </th>

                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="solicitud in solicitudes.data"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ solicitud.id }}
                        </th>
                        <td class="px-6 py-4">
                            {{ solicitud.dependencia }}
                        </td>
                        <td class="px-6 py-4">
                            {{ solicitud.asunto }}
                        </td>
                        <td class="px-2 py-4">
                            {{ solicitud.desicion }}
                        </td>
                        <td class="px-6 py-4">
                            {{ formatDateService.extractDate(solicitud.fecha_solicitud) }}
                        </td>
                        <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div class="flex items-center">
                                <div
                                    class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span class="font-medium text-gray-600 dark:text-gray-300">{{
                                        getAcronymName.getAcronymName(solicitud.solicitante.nombre) }}</span>
                                </div>
                                <div class="ps-3">
                                    <div class="text-base font-semibold">{{ solicitud.solicitante.nombre }}</div>
                                    <div class="font-normal text-gray-500">{{ solicitud.solicitante.email }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            {{ solicitud.descripcion.evento }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="centroAction">
                                <button type="button" @click="deleteSolicitud(solicitud.id)"
                                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Borrar</button>

                                <button @click="openUpdateSolicitudModal(solicitud.id)"
                                    data-modal-target="EditSolicitud" data-modal-toggle="EditSolicitud"
                                    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button">Editar</button>



                            </div>
                        </td>
                    </tr>


                </tbody>
            </table>

            <nav v-if="solicitudes.links" class="flex justify-center" aria-label="Page navigation example">
                <ul class="inline-flex m-4 -space-x-px text-sm">

                    <button @click="getPageFromUrl(solicitudes.prev_page_url)"
                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Anterior
                    </button>
                    <button v-for="link in solicitudes.links.slice(1, solicitudes.links.length - 1)"
                        @click="getPageFromUrl(link.url)" type='button' v-html="link.label"
                        :class="{ 'dark:bg-gray-400 dark:text-gray-700': link.active }" :disabled="link.active"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">

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
import SolicitudModal from '@/views/solicitudes/SolicitudModal.vue';
import getAcronymName from '@/service/stringFormat';
import formatDateService from '@/service/formatDateService';
import { initFlowbite } from 'flowbite';
import { useTemplateRef, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import debounce from '@/utils/debounce';
import useSolicitudStore from '@/stores/solicitud';

const solicitudModal = useTemplateRef('solicitudModal')

const asunto = ref('');
const route = useRoute();
const solicitudStore = useSolicitudStore();

const {
    solicitudes
} = storeToRefs(solicitudStore);

const {
    fetchSolicitudes,
    deleteSolicitud
} = solicitudStore;

const openCreateSolicitudModal = () => {
    solicitudModal.value.setSesionId(route.params.idSesion);
    solicitudModal.value.toggleModal();
}

const openUpdateSolicitudModal = (id) => {
    solicitudModal.value.loadInfoBySesionId(id);
    solicitudModal.value.toggleModal();
}

const searchSolicitudes = debounce(async () => {

    let query = `filter[sesion_id]=${route.params.idSesion}&page=1`;

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

    let query = `filter[sesion_id]=${route.params.idSesion}&page=${page}`;

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