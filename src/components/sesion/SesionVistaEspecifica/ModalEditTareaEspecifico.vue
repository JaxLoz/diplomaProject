<template>
<div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Editar Tarea</h3>
            <button @click="$emit('close')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
  
          <!-- Modal body -->
          <form @submit.prevent="guardarTarea" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                <textarea  v-model="dataTarea.descripcion"  id="descripcion" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descripción"></textarea>
              </div>
  
              <div class="col-span-2">
                      <label for="base-input" class="form-label">Fecha De Entrega</label>
                      <DatePicker 
                      v-model="dataTarea.dateEntrega"
                      dateFormat="yy-mm-dd"
                      placeholder="¿Cuál es la fecha de entrega?"
                      pt:root:class="relative"
                      pt:dropdown:class="absolute right-0 inset-y-0 end-0 pe-3.5"
                      pt:panel:class="calendar-style drop-shadow-md"
                      pt:pcInputText:root:class="field-model"
                      pt:calendar:class="flex flex-col items-center p-4"
                      pt:header:class="flex flex-row items-center justify-around w-full pb-6 pt-2"
                      pt:title:class="flex flex-row gap-4"
                      pt:selectMonth:class="rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500"
                      pt:selectYear:class="rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500"
                      pt:pcPrevButton:root:class="flex flex-row items-center h-full w-10 rounded-full p-2 justify-center hover:bg-gray-200 dark:hover:bg-gray-500"
                      pt:pcNextButton:root:class="flex flex-row items-center h-full w-10 rounded-full p-2 justify-center hover:bg-gray-200 dark:hover:bg-gray-500"
                      pt:dayView:class="w-11/12"
                      pt:tableHeaderRow:class="flex flex-row justify-around pb-4"
                      pt:tableBody:class="flex flex-col gap-4 justify-center"
                      pt:tableBodyRow:class="flex flex-row justify-around items-center"
                      pt:dayCell:class="w-10 h-7 text-center"
                      pt:day:class="rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 py-2.5 px-3 cursor-pointer"
                      pt:monthView:class="grid grid-cols-3 grid-rows-4 justify-items-center gap-2 pb-6"
                      pt:month:class="rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 py-2 px-6 cursor-pointer"
                      pt:yearView:class="grid grid-cols-2 grid-rows-5 justify-items-center gap-2 pb-6"
                      pt:year:class="rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 py-2 px-4 cursor-pointer" 
                      showIcon>
                      <template #dropdownicon>
                          <svg class="w-[18px] h-[18px] text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                              <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                          </svg>
                      </template>
                    </DatePicker>
                    </div>
  
              

              <div class="col-span-2">
                        <searchFieldMember
                        v-if="!onUpdateMode"
                        v-model="searchMiembroActualizado"
                        :members="membersEncargado"
                        :listmember="listSearchNew"
                        :label="'Buscar encargado'"
                        :placeholder="'Buscar nombre de encargado'"
                        :style="'field-model'"
                        @memberSelected="handleItemSelected"
                        />
                    </div>
                    <div class="col-span-2">
                        <listMember
                      :label="''"
                      :style="'field-model'"
                      :elements="EncargadoMaybe"
                      @removeMember="handleDelete"
                      />
                    </div>
            </div>
            <br>
            <br>
            <button @click.prevent="buttonUpdate" type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {{ onUpdateMode ? 'Actualizar tarea' :'Actualizar tarea' }}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  </template>
  

  <script setup>
  //importaciones
  import DatePicker from 'primevue/datepicker';
import { ref, computed, onMounted } from 'vue';
import { useSessionStore } from '@/stores/session';
import { useTareaStore } from '@/stores/tarea';
import formatDateService from '@/service/formatDateService';
import listMember from '@/components/util/listMember.vue';
import searchFieldMember from '@/components/util/searchFieldMember.vue';
import { watch } from 'vue';

//props o emits
const props = defineProps({
  isVisible: { type: Boolean, required: true },
  infoToUpdate: { type: Object, required: true },
  idTarea: {type: Object, required: true, default: () => ({}) }
});

defineEmits(["close"]);
  

 

  //inicializar stores
  const tareaStore = useTareaStore();
  const sesionStore = useSessionStore();

  //variables computadas
  const infoSesion = computed(() => sesionStore.getInfoViewSesion());
  const infotarea = computed(() => tareaStore.getInfoViewTarea());
  const tarea = computed(() => tareaStore.tarea)
  
  const onUpdateMode = computed(()=> tareaStore.getOnUpdateMode());
  const membersEncargado = computed(() =>tareaStore.memberEncargado);
  const listSearchNew = computed(() => tareaStore.searchMember(searchMiembroActualizado.value));
  const EncargadoMaybe = computed(() => tareaStore.encargadotarea);


  //ref
  const idTarea = ref(null)
  const searchMiembroActualizado = ref(""); 

  const dataTarea = ref({
  ID:null,
  descripcion: "",
  dateEntrega: "",
  sesionID: null,
});
const dataEncargado = ref({
    miembro:membersEncargado.miembro_id,
    estado:null

})

// Sincronizamos cuando cambien los datos en el padre
watch(
  () => props.infoToUpdate,
  (newValue) => {
    dataTarea.value = { ...newValue };
    dataEncargado.value.estado = newValue.estado_encargado
  }
);


// // Actualizar `dataTarea` con la información recibida
// if (infoToUpdate && infoToUpdate.tarea_id) {
//   dataTarea.value.ID = infoToUpdate.tarea_id; // Asignar el ID de la tarea
//   dataTarea.value.descripcion = infoToUpdate.descripcion || "";
//   dataTarea.value.dateEntrega = infoToUpdate.fecha_entrega || "";
//   dataTarea.value.sesionID = infoToUpdate.sesion_id || null;
// }

  //botón de actualizar
  const buttonUpdate = () =>{
    if (onUpdateMode.value) {
        updateTareaEncargado();
    }else{
      updateTareaEncargado();
    }
  }

//manejar la busqueda de posibles encargados nuevos 

const handleItemSelected = (encargadotarea) => {
    console.log(encargadotarea)
    tareaStore.addNewEncargado(encargadotarea);
    dataEncargado.value.miembro = encargadotarea.miembro_id
    dataTarea.value.sesionID = encargadotarea.sesion_id
    
}

const handleDelete = (encargadotarea) => {
    tareaStore.removeEncargado(encargadotarea);
}


  //método para actualizar 
  const updateTareaEncargado = async () => {
    console.log("Actualizando tarea y encargado");

    // Verificar que los datos de la tarea estén definidos y sean correctos
    if (!dataTarea.value || typeof dataTarea.value !== 'object' || !dataEncargado.value || typeof dataEncargado.value !== 'object') {
        console.error("Error: datos de tarea o encargado no están definidos correctamente.");
        return;
    }

    // Formatear la fecha de entrega a formato correcto
    dataTarea.value.dateEntrega = formatDateService.extractDate(dataTarea.value.dateEntrega).toString();

    console.log("Datos tarea enviados:", dataTarea.value);
    console.log("Datos encargado enviados:", {
        memberID: dataEncargado.value.miembro,  // Aquí se debe enviar el miembro correcto
        state: dataEncargado.value.estado,
    });

    try {
        // Actualizar la tarea
        const resultTarea = await tareaStore.updateTarea(dataTarea.value, {
            memberID: dataEncargado.value.miembro,  // Asegúrate de enviar el miembro correcto
            state: dataEncargado.value.estado,
        });

        // Validar la respuesta
        if (resultTarea && resultTarea.tarea && resultTarea.encargado) {
            console.log("Tarea y encargado actualizados exitosamente:", resultTarea);

            // Resetear variables si la actualización es exitosa
            dataTarea.value = { ID: null, descripcion: "", dateEntrega: "", sesionID: null };
            dataEncargado.value = { miembro: null, estado: "sin comenzar" }; // Asegúrate de resetear los valores

            // Realizar cualquier otra acción posterior (como recargar datos)
            await tareaStore.showTarea(infoSesion.value.IDSESION); // Actualizar tareas si es necesario
        } else {
            console.error("Error al actualizar la tarea o encargado: Respuesta inválida", resultTarea);
        }
    } catch (error) {
        console.error("Error en la actualización de tarea o encargado:", error);
    }

    await tareaStore.showTarea(infoSesion.value.IDSESION);
};





  </script>
