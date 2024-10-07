<template>
    
 <div class="relative overflow-y-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div>
            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span class="sr-only">Action button</span>
                Action
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <!-- Dropdown menu -->
            <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li>
                        <button @click="openCreateModal" class="flex flex-row items-center gap-x-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
                                </svg>
                                <span>Crear Tarea</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <label for="table-search" class="sr-only">Search </label>
        <div class="relative">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar tarea por sesion">
        </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Presidente
                </th>

                <th scope="col" class="px-6 py-3">
                    Secretario
                </th>

                <th scope="col" class="px-6 py-3">
                    Fecha
                </th>
                <th scope="col" class="px-6 py-3">
                    Hora de inicio
                </th>
                <th scope="col" class="px-6 py-3">
                    hora de fin
                </th>
            </tr>
        </thead>
        <tbody>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <td class="px-6 py-4">
                    1
                </td>

                <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span class="font-medium text-gray-600 dark:text-gray-300">{{ 'JL' }}</span>
                    </div>
                    <div class="ps-3">
                        <div class="text-base font-semibold">A1</div>
                        <div class="font-normal text-gray-500">a1@flowbite.com</div>
                    </div>  
                </td>

                

                <td class="px-6 py-4">
                    28/02/2023
                </td>
                
                <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span class="font-medium text-gray-600 dark:text-gray-300">{{ 'JL' }}</span>
                    </div>
                    <div class="ps-3">
                        <div class="text-base font-semibold">A1</div>
                        <div class="font-normal text-gray-500">a1@flowbite.com</div>
                    </div>  
                </td>

                <td class="px-6 py-4">
                    28/02/2023
                </td>

                <td class="px-6 py-4">
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Sapien rhoncus bibendum nisi lorem imperdiet tempus.
                </td>
                <td class="px-6 py-4">
                    <a href="#" 
                    @click.prevent="openEditModal({ name: 'A1', description: 'Descripción de A1', date: '28/02/2023' })" 
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>

                

            </tr>
            
        </tbody>
    </table>

    
</div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
import { useSessionStore } from '@/stores/session';

const sessionStore = useSessionStore();


// Estado para controlar la visibilidad del modal y si se está editando
const showModal = defineModel()
const isEditing = ref(false);
const modalTitle = ref('');
const taskName = ref('');
const taskDescription = ref('');
const taskDate = ref('');
const sessionId = ref(''); // Solo para cuando se crea una nueva tarea

// Inicializar Flowbite
onMounted(() => {
    initFlowbite();
});

// Función para abrir el modal para editar
const openEditModal = (task) => {
    modalTitle.value = 'Editar tarea';
    isEditing.value = true;
    taskName.value = task.name;
    taskDescription.value = task.description;
    taskDate.value = task.date;
    sessionId.value = ''; // No se necesita en edición
    showModal.value = true; // Asegúrate de que esta línea esté presente
};
// Función para abrir el modal para crear una nueva tarea
const openCreateModal = () => {
    sessionStore.setShowModelSession(true);
};

// Función para cerrar el modal
const closeModal = () => {
    showModal.value = false;
};

// Función para manejar el envío del formulario
const submitTask = () => {
    if (isEditing.value) {
        console.log(`Editando tarea: ${taskName.value}, Descripción: ${taskDescription.value}, Fecha: ${taskDate.value}`);
    } else {
        console.log(`Nueva tarea creada: ${taskName.value}, Descripción: ${taskDescription.value}, Fecha: ${taskDate.value}, ID de Sesión: ${sessionId.value}`);
    }
    closeModal();
};
</script>