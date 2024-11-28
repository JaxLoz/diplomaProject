<template>
    <div 
    v-if="props.profile?.rol == 'coordinador' || props.profile?.rol == 'secretario' || props.profile?.rol == 'miembro'" 
    class="relative overflow-x-auto shadow-md sm:rounded-lg p-4 space-y-8">
        <!-- Sección de Encabezado -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <!-- Header Section -->
            <div class="p-4 border-b dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Orden de la sesión
                </h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Actividades que se llevarán a cabo en la sesión
                </p>
            </div>

            <!-- Botón Crear -->
            <div 
            v-if="(profile?.rol == 'coordinador' || profile?.rol == 'secretario') && props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
            class="p-4 border-b dark:border-gray-700 flex flex-row gap-4">
            
                <button
                    @click="openModalCreateMode"
                    type="button"
                    class="inline-flex items-center justify-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Establecer orden
                </button>


                <button
                    @click="openModalUpdateMode"
                    type="button"
                    class="inline-flex items-center justify-center focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Actualizar orden
                </button>

            </div>

            <!-- Contenedor de Tabla -->
            <div class="overflow-x-auto flex flex-col items-center">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4 hidden sm:table-cell"></th>
                            <th scope="col" class="px-4 py-3">Orden</th>
                            <th scope="col" class="px-4 py-3">Tema</th>
                            <th scope="col" class="px-4 py-3">Descripción</th>
                            <th v-if=" (profile?.rol == 'coordinador' || profile?.rol == 'secretario') && props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
                                scope="col" class="px-4 py-3">Acción
                            </th>
                            <th scope="col" class="p-4 hidden sm:table-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in props.orderSesionInf.data"
                            :key="item.ID_ORDEN_SESION"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                        >
                            <td class="w-4 p-4 hidden sm:table-cell"></td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                {{ item.orden }}
                            </td>
                            <td class="px-4 py-4">
                                <div class="text-base font-semibold text-gray-900 dark:text-white">
                                    {{ item.TEMA }}
                                </div>
                            </td>
                            <td class="px-4 py-4">
                                <div class="break-words">
                                    {{ item.DESCRIPCION }}
                                </div>
                            </td>

                            <td v-if="(profile?.rol == 'coordinador' || profile?.rol == 'secretario') && props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'" class="px-4 py-4">
                                <button @click="deleteItemOrdenSesion(item)" 
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700">
                                    Borrar
                                </button>
                            </td>

                            <td class="w-4 p-4 hidden sm:table-cell"></td>
                        </tr>
                    </tbody>
                </table>
                <!-- Paginación -->
                <div class="p-4">
                    <paginationBar
                        :pages="props.orderSesionInf"
                        :size="'small'"
                        @change-page="changePage"
                    />
                </div>

                <div class="flex flex-col absolute bottom-0 right-50 m-4 z-[70]">
            <AlertsModal
                v-if="showErrorAlert && !modalIsShow"
                :typeAlert="'error'"
                :message="messageError"
                @closeAlert="orderSesionStore.hidenErrorAlertModal()"
            />

            <AlertsModal
                v-if="showSuccessAlert && !modalIsShow"
                :typeAlert="'success'"
                :message="messageSuccess"
                @closeAlert="orderSesionStore.hidenSusccessAlertModal()"
            />
        </div>
            </div>
        </div>
        
    </div>

    <ModalOrdenSesion 
        ref="orderSesionModal"
        @closeModal="closeModal"
    />
</template>

<script setup>
import paginationBar from '@/components/util/paginationBar.vue';
import ModalOrdenSesion from './ModalOrdenSesion.vue';
import urlService from '@/service/urlService';
import AlertsModal from '@/components/util/AlertsModal.vue';

import { useOrderSesion } from '@/stores/orderSesion';
import { Modal } from 'flowbite';
import { onMounted, useTemplateRef, ref, computed } from 'vue';

const orderSesionStore = useOrderSesion(); 

const isUpdateMode = computed(() => orderSesionStore.getIsUpdateMode())
const props = defineProps({
    sesionInf: {type: Object, required: true, default: new Object()},
    orderSesionInf: {type: Object, required: true, default: new Object()},
    profile: {type: Object, required: true, default: new Object()}
})

const messageError = computed(() => orderSesionStore.getDateError())
const showErrorAlert = computed(() => orderSesionStore.getShowErrorAlert())
const messageSuccess = computed(() => orderSesionStore.getDataSuccesfull())
const showSuccessAlert = computed(() => orderSesionStore.getShowSuccessAlert())

const targetModal = useTemplateRef('orderSesionModal');
const modalIntance = ref(null);
const modalIsShow = ref(false);
const optionsModal = {
      placement: 'center',
      backdrop: 'static',
      backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40 backdrop-blur-sm',
      closable: false
  }

const changePage = (numPage) =>{
    orderSesionStore.getSesionOrderBySesion(props.sesionInf.IDSESION, urlService.getParamsFromUrl({page: numPage}));
}

const deleteItemOrdenSesion = (itemOrdenSesion) => {
    orderSesionStore.deleteOrdenSesionItem(itemOrdenSesion.ID_ORDEN_SESION);
    orderSesionStore.getSesionOrderBySesion(props.sesionInf.IDSESION);
}

//Metodos para el modal

const openModalCreateMode = async () => {
    await orderSesionStore.fetcthPreOrdenSesionBySesionToCreate(props.sesionInf.IDSESION);
    modalIntance.value.show();
    modalIsShow.value = true;
}

const openModalUpdateMode = () => {
    orderSesionStore.setisUpdateMode(true);
    orderSesionStore.fetchPreOrdenSesionBySesionToUpdate(props.sesionInf.IDSESION);
    orderSesionStore.hidenErrorAlertModal();
    orderSesionStore.hidenSusccessAlertModal();
    modalIntance.value.show();
    modalIsShow.value = true;
}

const closeModal = () => {
    if(isUpdateMode.value){
        orderSesionStore.setisUpdateMode(false);
    }
    modalIntance.value.hide();
    orderSesionStore.hidenErrorAlertModal();
    orderSesionStore.hidenSusccessAlertModal();
    orderSesionStore.cleanPreordenSesion();
    modalIsShow.value = false;
}

onMounted (() => {
    modalIntance.value = new Modal(targetModal.value.targetModal, optionsModal);
    console.log(targetModal.value.targetModal)
})
</script>