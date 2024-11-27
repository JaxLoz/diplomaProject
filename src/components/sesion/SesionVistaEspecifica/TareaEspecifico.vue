
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4 space-y-8">
    <!-- Contenedor principal -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <!-- Encabezado -->
      <div class="p-4 border-b dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Encargados de Tareas
        </h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Encargados de Tareas de la Sesión #
        </p>
      </div>

      <!-- Botón de creación y barra de búsqueda -->
      <div class="p-4 border-b dark:border-gray-700 flex flex-row gap-4">
        <button v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'" 
          @click="openModalCreate"
          type="button"
          class="inline-flex items-center justify-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Crear Tarea
        </button>
        <div class="relative">
          
        </div>
      </div>

      <!-- Tabla -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4"></th>
              <th scope="col" class="px-4 py-3">ID Tarea</th>
              <th scope="col" class="px-4 py-3">Encargado de la Tarea</th>
              <th scope="col" class="px-4 py-3">Fecha de entrega</th>
              <th scope="col" class="px-4 py-3">Descripción</th>
              <th scope="col" class="px-4 py-3">Estado</th>
              <th v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
                scope="col" class="px-4 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="element in props.tareaInf"
              :key="element.ID"
              class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="w-4 p-4"></td>
              <td class="px-4 py-4">{{ element.tarea_id }}</td>
              <th
                scope="row"
                class="flex items-center px-4 py-12 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div
                  class="flex-shrink-0 w-10 h-10 inline-flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-600"
                >
                  <span class="font-medium text-gray-600 dark:text-gray-300">
                    {{ stringFormat.getAcronymName(element.nombre) }}
                  </span>
                </div>
                <div class="ps-3">
                  <div class="text-base font-semibold">{{ element.nombre }}</div>
                  <div class="font-normal text-gray-500">
                    {{ element.email_miembro }}
                  </div>
                </div>
              </th>
              <td class="px-4 py-4">
                {{ formatDateService.extractDate(element.fecha_entrega) }}
              </td>
              <td class="px-4 py-4">{{ element.descripcion }}</td>
              <td class="px-4 py-4">
                <!-- estado de la tarea cuando el acta no está pendiente  -->
                <div v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO != 'pendiente'" class="flex items-center gap-2">
                  <div :class="[
                    'h-2.5 w-2.5 rounded-full',
                    element.estado_encargado == 'finalizado' ? 'bg-green-500' : 'bg-red-500'
                  ]"></div><span>
                    {{ element.estado_encargado != 'sin comenzar' ? element.estado_encargado : 'en proceso' }}
                  </span>
                </div>
                <!-- estado del selector cuando el acta está pendiente  -->
                <select v-else-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
                  v-model="element.estado_encargado"
                  @change="updateTareaState(element.tarea_id, element.estado_encargado)"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="sin comenzar">Sin comenzar</option>
                  <option value="en proceso">En proceso</option>
                  <option value="finalizado">Finalizado</option>
                </select>
              </td>
              <td v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'" class="px-4 py-4">
                <button
                  @click="openModal(element)"
                  class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                >
                  Editar
                </button>
                <br>
                <br>
                <button
                  @click="deleteTarea(element.tarea_id)"
                  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Borrar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="p-4 flex justify-center">
        <paginationBar :pages="pageTareas" :size="'small'" @change-page="changePage" />
      </div>
    </div>

    <!-- Modales -->
    <ModalEditTareaEspecifico
      :isVisible="isModalVisible"
      @close="closeModal"
      :infoToUpdate="infoUpdate"
    />
    <ModalCreateTareaEspecifico
      ref="ModalCreateTarea"
    />
  </div>
</template>


<script setup>
import stringFormat from '@/service/stringFormat';
import urlService from '@/service/urlService';
import paginationBar from '@/components/util/paginationBar.vue';
import ModalEditTareaEspecifico from './ModalEditTareaEspecifico.vue';
import ModalCreateTareaEspecifico from './ModalCreateTareaEspecifico.vue';
import { computed, ref, useTemplateRef } from 'vue';
import formatDateService from '@/service/formatDateService';
import { useTareaStore } from '@/stores/tarea';
import { useSessionStore } from '@/stores/session';


const tareaStore = useTareaStore();
const sesionStore = useSessionStore();

const infoUpdate = ref({});
const instanceCreateModal = useTemplateRef('ModalCreateTarea')

//const tareas = computed(() => tareaStore.tarea); //lista de tareas
const infoSesion = computed(() => sesionStore.getInfoViewSesion());
const pageTareas = computed(() => tareaStore.tarea);

const props = defineProps({
    tareaInf: {type: Array, required: true, default: new Array()},
    encargadoInf: {type: Array, required: true, default: new Array()},
    sesionInf: {type: Object, required: true, default: new Object()}
    
})

//Método de cambio de página 

const changePage = async (numPages) =>{
   await tareaStore.showTarea(infoSesion.value.IDSESION,urlService.getParamsFromUrl({
    page: numPages
   }))
} 

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

const openModalCreate = () => {
  instanceCreateModal.value.toggleModal();
  console.log('Modal de creación abierto');
};

//actualizar estado 
const emits = defineEmits(['updateStateOfTarea'])

const updateTareaState = async (tareaId, status) => {
    console.log('tareaId:', tareaId, 'status:', status); // Para depurar
    try {
        const response = await tareaStore.updateEstadoTarea(tareaId, status);
        if (response) {
            emits('updateStateOfTarea', response); // Emite el estado actualizado
            console.log('Estado de tarea actualizado:', response);
        } else {
            console.error('Respuesta inesperada de la API:', response);
        }
    } catch (error) {
        console.error('Error al actualizar el estado de la tarea:', error);
    }
};

</script>


