<template>
<div ref="orderSesionModalMain" id="popup-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{isUpdateMode ? 'Actualizar orden de sesion' : 'Establecer orden de sesion' }}
                </h3>
                <button @click="emit('closeModal')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Orden</label>
                        <input v-model="ordenInf.orden" type="number" min="1" name="orden" id="orden" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Orden del item" required="">
                    </div>
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tema</label>
                        <input v-model="ordenInf.TEMA" type="text" name="tema" id="tema" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Cual es el tema?" required="">
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                        <textarea v-model="ordenInf.DESCRIPCION" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escriba una breve descripcion sobre el tema"></textarea>                    
                    </div>

                    <div class="col-span-2">
                        <button @click.prevent="setUpPreOrdenSesion"  type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            {{isUpdateMode ? 'Actualizar punto' : 'Establecer punto' }}
                        </button>
                    </div>

                    <div class="col-span-2">
                        <listItemOrderSesion 
                            :elements="preOrdenSesion"
                            :label="'Vista previa de la orden de sesion'"
                            :style="'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2.5 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'"
                            :isUpdateMode="isUpdateMode"
                            @deleteItem="removePreordenItem"
                            @updateItem="upLoadPreOrdenItem"
                        />
                    </div>

                </div>
                <button @click.prevent="setUpOrdenSesion"  type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg v-if="isLoading" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                        
                    <svg v-else class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    {{isLoading ? (isUpdateMode ? 'Actualizando...' : 'Estableciendo...') : (isUpdateMode ? 'Actualizar Orden' : 'Establecer Orden') }}
                </button>
                
            </form>
        </div>
    </div>

        <div class="flex flex-col absolute bottom-0 right-50 m-4 z-[70]">
            <AlertsModal
                v-if="showErrorAlert"
                :typeAlert="'error'"
                :message="messageError"
                @closeAlert="orderSesionStore.hidenErrorAlertModal()"
            />

            <AlertsModal
                v-if="showSuccessAlert"
                :typeAlert="'success'"
                :message="messageSuccess"
                @closeAlert="orderSesionStore.hidenSusccessAlertModal()"
            />
        </div>

</div> 
</template>
<script setup>
import listItemOrderSesion from '@/components/util/listItemOrderSesion.vue';
import { onMounted, useTemplateRef, computed, ref} from 'vue';
import AlertsModal from '@/components/util/AlertsModal.vue';
import { useOrderSesion } from '@/stores/orderSesion';
import { useSessionStore } from '@/stores/session';


const orderSesionStore = useOrderSesion();
const sesionStore = useSessionStore();

const preOrdenSesion = computed(() => orderSesionStore.getPreOrderSesion())
const showErrorAlert = computed(() => orderSesionStore.getShowErrorAlert())
const showSuccessAlert = computed(() => orderSesionStore.getShowSuccessAlert())
const messageError = computed(() => orderSesionStore.getDateError())
const messageSuccess = computed(() => orderSesionStore.getDataSuccesfull())
const infSesion = computed(() => sesionStore.getInfoViewSesion())
const isUpdateMode = computed(() => orderSesionStore.getIsUpdateMode())
const isLoading = computed(() => orderSesionStore.getIsloading())

const infIsLoadingToUpdate = ref(false)
const valorOrdeOld = ref(0)
const idOrdenSesionSelectedToUpdate = ref(0)
const idOrdenSesionTeporarySelected = ref(0)
const ordenInf = ref({
    orden: 1,
    TEMA: "",
    DESCRIPCION: "",
})

const targetModal = useTemplateRef('orderSesionModalMain');
const emit = defineEmits(['closeModal']);


const setUpPreOrdenSesion = () => {
    //Acciones de la lista de preordenSesion cuando el modal esta en modo creacion
    if(!isUpdateMode.value){
        if(!infIsLoadingToUpdate.value){
            // si el dato no (!infIsLoadingToUpdate.value) fue cargado para actualizar entonces se crea un nuevo item en la lista preOrdenSesion
            const ordenInfValue = {...ordenInf.value}
            ordenInfValue.SESION_IDSESION = infSesion.value.IDSESION
            ordenInfValue.dataBaseOrigin = false
            orderSesionStore.setPreOrderSesion(ordenInfValue);
        }else{
            // si el dato fue cargado para actualizar (!infIsLoadingToUpdate.value) entonces se actualiza el item en la lista preOrdenSesion
            const infOrdenToUpdate = {...ordenInf.value}
            infOrdenToUpdate.SESION_IDSESION = infSesion.value.IDSESION
            infOrdenToUpdate.idOrdenSesionTemporary = idOrdenSesionTeporarySelected.value
            infOrdenToUpdate.dataBaseOrigin = false
            orderSesionStore.updateItemPreOrderSesionForCreateMode(infOrdenToUpdate) // aqu ihay un bug
            infIsLoadingToUpdate.value = false
            valorOrdeOld.value = 0
        }
    }else{
        // acciones de actualizacion en la preOrden cuando el modal esta en modo Actualizacion
        if(infIsLoadingToUpdate.value){
            // si el dato fue cargado para actualizar (infIsLoadingToUpdate.value) entonces se actualiza el item en la lista preOrdenSesion
            const infOrdenToUpdate = {...ordenInf.value}
            infOrdenToUpdate.SESION_IDSESION = infSesion.value.IDSESION
            infOrdenToUpdate.ID_ORDEN_SESION = idOrdenSesionSelectedToUpdate.value
            infOrdenToUpdate.dataBaseOrigin = true
            infOrdenToUpdate.wasUpdate = true
            orderSesionStore. updateItemPreOrderSesionForUpdateMode(infOrdenToUpdate)
            infIsLoadingToUpdate.value = false
            valorOrdeOld.value = 0
            idOrdenSesionSelectedToUpdate.value = 0
        }
    }
    



    if(!showErrorAlert.value){
        cleanField()
    }

    console.log(infSesion.value.IDSESION)
    
}

const removePreordenItem = (item) => {
    orderSesionStore.removeItemPreOrderSesion(item)
}

const upLoadPreOrdenItem = (item) => {
    infIsLoadingToUpdate.value = true
    const itemToUpdateSelected = orderSesionStore.selectItemPreOrderSesionToUpdate(item)
    
    if(isUpdateMode.value){
        idOrdenSesionSelectedToUpdate.value = itemToUpdateSelected.ID_ORDEN_SESION; // se guarda el valor del id para recuperarlo al momento de establecer la actualizacion
    }else{
        idOrdenSesionTeporarySelected.value = itemToUpdateSelected.idOrdenSesionTemporary; // se guarda el valor del id para recuperarlo al momento de establecer la actualizacion
    }
    
    ordenInf.value.orden = itemToUpdateSelected.orden
    ordenInf.value.TEMA = itemToUpdateSelected.TEMA
    ordenInf.value.DESCRIPCION = itemToUpdateSelected.DESCRIPCION
}

// opearciones contra la base de datos

const setUpOrdenSesion = () => {
    // Si esta en modo creacion se crean los nuevos items en la base de datos
    if(!isUpdateMode.value){ 
        orderSesionStore.createOrdenSesionItem(infSesion.value.IDSESION);
        
    }else{
        // Si esta en modo actualizacion se actualizan los items en la base de datos
        orderSesionStore.updateOrdenSesionItem(infSesion.value.IDSESION) 
    }
}

const cleanField = () => {
    ordenInf.value.orden = 1
    ordenInf.value.TEMA = ""
    ordenInf.value.DESCRIPCION = ""
}

defineExpose({
    targetModal
})

onMounted(() => {
    console.log("se monto el modal de orden de sesion")
    console.log(preOrdenSesion.value)
})



</script>