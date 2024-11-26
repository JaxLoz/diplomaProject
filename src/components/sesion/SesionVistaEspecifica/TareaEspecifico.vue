
<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md">
    <caption class="p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 rounded-t-lg">
        Encargados de Tareas 
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Encargados de Tareas de la Sesión #</p>
    </caption>
    </table>
        <div class="createAction">
         <!-- Boton de creación de accion  -->
        <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <button data-modal-target="CreateTarea" data-modal-toggle="CreateTarea" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Crear Tarea</button>
        <!-- Search para busqueda  -->
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative px-5">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-7 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" class="block pt-2 ps-7 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar Tarea o Encargado de tarea">
        </div>
    </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">

                </th>
                <th scope="col" class="px-6 py-3">
                    ID Tarea
                </th>
                <th scope="col" class="px-6 py-3">
                    Encargado de la Tarea
                </th>
                <th scope="col" class="px-6 py-3">
                    Fecha de entrega
                </th>
                <th scope="col" class="px-6 py-3">
                    Descripción
                </th>
                <th scope="col" class="px-6 py-3">
                    Estado
                </th>
                <th scope="col" class="px-6 py-3">
                    Acción
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="element in props.tareaInf" :key="element.ID" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    
                </td>
                <td class="px-6 py-4">
                    {{ element.tarea_id }}
                </td>
                <th  scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="@/assets/img/image12.jpg" alt="Jese image">
                    <div class="ps-3">
                        <div class="text-base font-semibold">{{element.nombre}}</div>
                        <div class="font-normal text-gray-500">{{element.email_miembro}}</div>
                    </div>  
                </th>
                
                 <td class="px-6 py-4">
                    {{formatDateService.extractDate(element.fecha_entrega)}}
                </td>
                <td class="px-6 py-4">
                    {{ element.descripcion}}
                </td>
                <td class="px-2 py-4">
                   <form class="mx-auto">
                    <select v-model="element.estadoTarea" @change="updateTareaState(element.miembro_id , element.tarea_id, element.estadoTarea)" id="estado" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select">
  <option value="sin comenzar" data-color="#facc15">Sin comenzar</option>
  <option value="en proceso" data-color="#22c55e">En proceso</option>
  <option value="finalizado" data-color="#ef4444">Finalizado</option>
</select>

         </form>
                </td>
                 <td class="px-6 py-4">
                    <div class="centroAction">
                      <button @click="openModal(element)" type="button" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Editar
                      </button>

                        <button @click="deleteTarea(element.tarea_id)" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Borrar</button>
                    </div>
                </td>
            </tr>


        </tbody>
    </table>

 <!-- Paginacion     -->
  <br>
  <center>
<paginationBar
:pages="pageTareas"
:size="'small'"
@change-page="changePage"
/>

</center>

<!-- Modal del Edit de Tarea-->
<ModalEditTareaEspecifico
  :isVisible="isModalVisible" 
  @close="closeModal"
  :infoToUpdate="infoUpdate"
/>

<!-- Modal de creación de tarea-->
<ModalCreateTareaEspecifico
:title="'Crear Tarea'"
:tareaInf="infoTarea"
:encargadoInf="infoEncargado" />
<br>

<br>
</div>
</template>

<script setup>
import urlService from '@/service/urlService';
import paginationBar from '@/components/util/paginationBar.vue';
import ModalEditTareaEspecifico from './ModalEditTareaEspecifico.vue';
import ModalCreateTareaEspecifico from './ModalCreateTareaEspecifico.vue';
import { useTareaStore } from '@/stores/tarea';
import { computed, watch } from 'vue';
import formatDateService from '@/service/formatDateService';
import {ref} from 'vue';
import { useSessionStore } from '@/stores/session';



const tareaStore = useTareaStore();
const sesionStore = useSessionStore();

const infoUpdate = ref({});




const tareas = computed(() => tareaStore.tarea); //lista de tareas
const infoSesion = computed(() => sesionStore.getInfoViewSesion());
const pageTareas = computed(() => tareaStore.tarea);

const props = defineProps({
    tareaInf: {type: Array, required: true, default: new Array()},
    // actStatusTarea: {type: String, required: true, default: ''},
    encargadoInf: {type: Array, required: true, default: new Array()}
    
})


//Método de cambio de página 

const changePage = async (numPages) =>{
   await tareaStore.showTarea(infoSesion.value.IDSESION,urlService.getParamsFromUrl({
    page: numPages
   }))
} 

const infoTarea = computed(() => tareaStore.tarea);
const infoEncargado = computed(() => tareaStore.infoEncargadosTareasAmostrar);
const removeTarea = ref({})
const modalInstance = ref(null)


// watch(() => props.actStatusTarea, (newValueStatusActTarea) => {
//     if(newValueStatusActTarea == 'aprobada' || newValueStatusActTarea == 'rechazada'){
//         return 
//     }
// })
console.log("Datos de tarea:", props.tareaInf.data);

//delete

// Métodos
async function deleteTarea(tareaID) {
  const confirmDelete = confirm(
    '¿Estás seguro de que deseas eliminar esta tarea y sus encargados?'
  );
  if (!confirmDelete) return;

  const result = await tareaStore.deleteTareaAndEncargado(tareaID);

  if (result) {
    console.log('Tarea y encargados eliminados:', result);
    await tareaStore.showTarea(infoSesion.value.IDSESION); // Actualizar lista
  }
}

//update 
const selectedTarea = ref(null);
const isModalVisible = ref(false);

const openModal = (element) => {
  infoUpdate.value = element; // Pasamos el objeto completo al modal
  console.log("Tarea seleccionada:", element.tarea_id); // Confirmación en consola
  isModalVisible.value = true;
};
const closeModal = () => {
  console.log('Modal cerrado');
  isModalVisible.value = false;
  selectedTarea.value = null;
};

// const setDataError = ref(null);
// // Asegúrate de inicializar setDataError o asignarle una función adecuada
// setDataError.value = (data) => {
//   console.log("Error:", data);
// };
// const updateEstadoTarea = async (miembroId, tareaId, status) => {
//     try {
//         const response = await axios.requestAxios(
//             `encargados_tarea/update/${miembroId}/${tareaId}`,
//             'PUT',
//             { estadoTarea: status }
//         );
        
//         this.setDataSuccesfull(response.data); // Handle success
//         this.showSucessAlertModal();
//     } catch (error) {
//         this.setDataError(error.response.data); // Handle error
//         this.ShowErrorAlertModal();
//     }
// };


//actualizar estado 
const emits = defineEmits(['updateStateOfTarea'])



const updateTareaState = async (miembroId, tareaId, status) => {
  console.log('miembroId:', miembroId, 'tareaId:', tareaId, 'status:', status);  // Para depurar
  try {
    const response = await tareaStore.updateEstadoTarea(miembroId, tareaId, status);
    if (response && response.data) {
      emits('updateStateOfTarea', response.data); // Emite el estado actualizado
      console.log('Estado de tarea actualizado:', response.data);
    } else {
      console.error('Respuesta inesperada de la API', response);
    }
  } catch (error) {
    console.error('Error al actualizar el estado de la tarea:', error);
  }
};





</script>


