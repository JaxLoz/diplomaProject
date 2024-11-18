<template>
    <div id="CreateTarea" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ props.title }}
                </h3>
                <button type="button" @click="CloseModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="CreateTarea">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5" @submit.prevent="submitTask">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <searchFieldIdSesion
                        v-if="!onUpdateMode"
                        v-model="search"
                        :searchInfo="id_sesion"
                        :label="'Buscar Sesión'"
                        :placeholder="'Buscar ID de la sesión'"
                        :style="'field-model'"
                        @itemSelected="handleItemSelected"
                        />
                    </div>
                    <div class="col-span-2">
                        <ListIdSesion
                      :label="''"
                      :style="'field-model'"
                      :elements="id_sesion"
                      @deleteItem="handleDelete"
                      />
                    </div>
                    <div class="col-span-2">
                        <label for="encargado" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Encargado de Tarea</label>
                        <input type="encargado" name="encargado" id="encargado" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Encargado de tarea" >
                    </div>
                    <div class="col-span-2">
                        <label for="fechaTarea" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de entrega</label>
                        
<div class="relative max-w-sm">
  <div class="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
     <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
      </svg>
  </div>
  <input id="datepicker-actions" datepicker datepicker-buttons datepicker-autoselect-today type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Selecciona una fecha">
</div>

                    </div>
                   
                    <div class="col-span-2">
                        <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                        <textarea id="descripcion" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descripción"></textarea>                    
                    </div>
                    

                    
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar
                </button>
            </form>
        </div>
    </div>
</div> 
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSessionStore } from '@/stores/session';
import { useTareaStore } from '@/stores/tarea';
import listIdSesion from '@/components/util/listIdSesion.vue';
import searchFieldIdSesion from '@/components/util/searchFieldIdSesion.vue';


//Inicialización de los stores
const sessionStore = useSessionStore();
const tareaStore = useTareaStore();


// Props, emits, models
const props = defineProps({
  title: { type: String, required: true, default: "Crear Tarea" },
  infoToUpdate: { type: Object, required: false, default: () => ({}) }
});

//variables computadas
const id_sesion = computed(() => sessionStore.sessions)
const onUpdateMode = computed(()=> tareaStore.getOnUpdateMode())

//variables reactivas

const search = ref("");
const dataTarea = ref({
    ID_SESION: "",


})
onMounted(()=> {
    sessionStore.fetchSessions();
})



</script>