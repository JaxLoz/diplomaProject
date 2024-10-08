<template>
    <div class="content">
 <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
  <a href="#" @click="openCreateModal" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
    Crear Tarea
  </a>
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
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Encargado
                </th>
                <th scope="col" class="px-6 py-3">
                    Id de sesión
                </th>
                <th scope="col" class="px-6 py-3">
                    Fecha de entrega
                </th>
                <th scope="col" class="px-6 py-3">
                    Descripción
                </th>
                <th scope="col" class="px-6 py-3">
                    Acción
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="/src/assets/img/image12.jpg" alt="Jese image">
                    <div class="ps-3">
                        <div class="text-base font-semibold">A1</div>
                        <div class="font-normal text-gray-500">a1@flowbite.com</div>
                    </div>  
                </th>
                <td class="px-6 py-4">
                    82
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
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="/src/assets/img/image12.jpg" alt="Jese image">
                    <div class="ps-3">
                        <div class="text-base font-semibold">A2</div>
                        <div class="font-normal text-gray-500">a2@flowbite.com</div>
                    </div>
                </th>
                <td class="px-6 py-4">
                    193
                </td>
                <td class="px-6 py-4">
                    16/08/2023
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
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="/src/assets/img/image12.jpg" alt="Jese image">
                    <div class="ps-3">
                        <div class="text-base font-semibold">A3</div>
                        <div class="font-normal text-gray-500">a3@flowbite.com</div>
                    </div>
                </th>
                <td class="px-6 py-4">
                    02
                </td>
                <td class="px-6 py-4">
                    05/03/2020
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
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">           
            </tr>
        </tbody>
    </table>

    <div v-if="showModal" 
             tabindex="-1" 
             aria-hidden="true" 
             class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ modalTitle }}</h3>
                        <button type="button" @click="closeModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Cerrar modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <form class="p-4 md:p-5" @submit.prevent="submitTask">
                        <div class="grid gap-4 mb-4 grid-cols-2">                            
                            <!-- Campo Descripción -->
                            <div class="col-span-2">
                                <label for="dependencia" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                                <textarea name="dependencia" id="dependencia" v-model="taskDescription" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" rows="4" placeholder="Descripción de la tarea" required></textarea>
                            </div>
                            <!-- Campo Seleccionar fecha de entrega -->
                            <div class="col-span-2">
                      <datepickedComponent 
                      v-model="dataSession.date" 
                      :title="'Fecha de la sessión'" 
                      :label="'Fecha'" 
                      :placeholder="'Fecha de entrega'"
                      :style="'block w-full ps-10 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
                      />
                    </div>


                            <!-- Campo Seleccionar Estado de la tarea -->
                            <div class="col-span-2">
                                <label for="estado" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado de la tarea</label>
                                <select v-model="taskStatus" name="estado" id="estado" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white">
                                    <option value="Sin comenzar">Sin comenzar</option>
                                    <option value="En proceso">En proceso</option>
                                    <option value="Finalizado">Finalizado</option>
                                </select>
                            </div>
                            <!-- Campo Encargado -->
                            <div class="col-span-2">
                      <searchField
                      v-model="search"
                      :searchInfo="members"
                      :listItems="dataSearched"
                      :label="'Encargado'"
                      :placeholder="'Buscar encargado'"
                      :style="'field-model'"
                      @itemSelected="addGuest"
                      />
                    </div>

                            <!-- Eliminar campo ID de sesión y tarea, los asignamos automáticamente -->
                        </div>
                        <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            {{ isEditing ? 'Guardar cambios' : 'Crear Tarea' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
</div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useInvitacionStore } from '@/stores/invitacion';
import { useMiembrosStore } from '@/stores/miembros';
import searchField from '../util/searchField.vue';
import { initFlowbite } from 'flowbite';
import datepickedComponent from '../util/datepickedComponent.vue';



// Stores
const membersStore = useMiembrosStore()
const invitacionStore = useInvitacionStore();
const dataSearched = computed(() => membersStore.searchMember(search.value))
const members = computed(() => invitacionStore.members);

// Variables reactivas
const search = ref("") // referencia del v-model del componente searchField
const dataSession = {
  date: ""
}

// Computed properties

const tasks = ref([]);  // Aquí almacenarás las tareas




// Modal data
const showModal = ref(false);
const isEditing = ref(false);
const modalTitle = ref('');
const taskName = ref('');
const taskResponsible = ref(null);
const taskStatus = ref('Sin comenzar');

// Funciones del modal
const openEditModal = (task) => {
    modalTitle.value = 'Editar tarea';
    isEditing.value = true;
    taskName.value = task.name;
    taskResponsible.value = task.responsible;
    taskStatus.value = task.status;
    showModal.value = true;
};

const openCreateModal = () => {
    modalTitle.value = 'Crear nueva tarea';
    isEditing.value = false;
    taskName.value = '';
    taskResponsible.value = null;
    taskStatus.value = 'Sin comenzar';
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const submitTask = () => {
    const newTask = {
        name: taskName.value,
        responsible: taskResponsible ? taskResponsible.name : '',
        status: taskStatus.value,
        sessionId: sessionStore.currentSessionId,  // Asumiendo que tienes un ID de sesión en el store
        date: new Date().toLocaleDateString(), // Fecha actual
    };

    if (isEditing.value) {
        // Editar tarea existente
        const taskIndex = tasks.value.findIndex(task => task.name === taskName.value);
        if (taskIndex !== -1) {
            tasks.value[taskIndex] = newTask;
        }
    } else {
        // Crear nueva tarea
        tasks.value.push(newTask);
    }

    // Cerrar el modal después de la operación
    closeModal();
};

const deleteTask = (index) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        tasks.value.splice(index, 1);
    }
};

// Función para seleccionar responsable
const selectResponsible = (member) => {
    taskResponsible.value = member; // Guardar el miembro responsable seleccionado
};

// Función para eliminar el responsable seleccionado
const removeResponsible = () => {
    taskResponsible.value = null; // Reiniciar el responsable
};

// Inicializar datos si es necesario
onMounted(() => {
    initFlowbite(); // Inicializar Flowbite si es necesario
});
</script>


