<template>
    <Teleport to="body">

        <div v-if="showModal" tabindex="-1" aria-hidden="true"
            class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div class="relative p-4 w-full max-w-5xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Nueva Solicitud
                        </h3>
                        <button type="button" @click="closeModal"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Cerrar modal</span>
                        </button>
                    </div>

                    <!-- Modal body -->
                    <form class="flex flex-wrap p-4 md:p-5" @submit.prevent="submitHandler">
                    
                        <div class="flex flex-wrap">

                            <h2 class="w-full text-lg font-semibold text-gray-900 dark:text-white mb-4" >
                                Solicitante
                            </h2>

                            <div v-if="solicitante.nombre" >
                                 <div class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  >
                                        {{ solicitante.nombre }} <button @click="resetSolicitante" class=" px-2 py-1 rounded-xl dark:text-white dark:bg-gray-800 text-black" type="button"> x </button>
                                 </div>
                            </div>

                            <div v-else class="mb-5 relative w-full">
                                <label for="search-solicitante" class="block mb-2 text-sborderm font-medium text-gray-900 dark:text-white">Buscar por nombre</label>
                                <input v-model="nombreSolicitante"  @input="searchSolicitante"  type="text" id="search-solicitante" placeholder="Ingrese el nombre del solicitante..."  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <ul v-if="solicitantes && nombreSolicitante.length > 1" class="absolute bg-gray-700  w-full p-2" >
                                    <li v-for="solicitante in solicitantes" class="flex items-center justify-between" >
                                        <div class="flex flex-col justify-start items-start">
                                            <span class="text-gray-900 dark:text-white">{{ solicitante.nombre }}</span>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">{{ solicitante.email }}</span>
                                        </div>
                                        <div>
                                            <button @click="setSolicitante(solicitante)" type="button"
                                                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Seleccionar
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>    

                        </div>

                        <div class="flex flex-wrap">

                            <h2 class="w-full text-lg font-semibold text-gray-900 dark:text-white mb-4" >
                                Descripción
                            </h2>

                            <div class="flex items-end gap-4 justify-between" >

                                <div class="col-span-2">
                                    <fieldForm 
                                        v-model="descripcionForm.estudiantes"
                                        fieldType="text" 
                                        label="Estudiantes" 
                                        :style="'field-model'"
                                        placeholder="Escriba los nombres de los estudiantes implicados... " />
                                </div>

                                <div class="col-span-2">
                                    <fieldForm 
                                        v-model="descripcionForm.numero_estudiantes"
                                        fieldType="number" 
                                        label="Número de estudiantes implicados" 
                                        :style="'field-model'"
                                        placeholder="Escriba el número de estudiantes implicados" />
                                </div>

                                <div class="col-span-2">
                                    <fieldForm 
                                        v-model="descripcionForm.docentes"
                                        fieldType="text" 
                                        label="Docentes" 
                                        :style="'field-model'"
                                        placeholder="Escriba los nombres de los docentes implicados..." />
                                </div>

                                <div class="col-span-2">
                                    <fieldForm 
                                        v-model="descripcionForm.numero_docentes"
                                        fieldType="number" 
                                        label="Número de docentes implicados" 
                                        :style="'field-model'"
                                        placeholder="Escriba el número de docentes implicados" />
                                </div>

                            </div>

                            <div class="flex items-end gap-4 justify-between">

                                <div class="col-span-2">
                                    <fieldForm 
                                        v-model="descripcionForm.ciudad"
                                        fieldType="text" 
                                        label="Ciudad" 
                                        :style="'field-model'"
                                        placeholder="¿Escribe el nombre de la ciudad?" />
                                </div>

                                <div class="col-span-2">
                                    <fieldForm 
                                        v-model="descripcionForm.pais"
                                        fieldType="text" 
                                        label="Pais" 
                                        :style="'field-model'"
                                        placeholder="¿Escribe el nombre del pais?" />
                                </div>

                                <div class="col-span-2">
                                    <fieldForm 
                                        v-model="descripcionForm.evento"
                                        fieldType="text" 
                                        label="Evento" 
                                        :style="'field-model'"
                                        placeholder="Escribe el nombre del evento" />
                                </div>

                            </div>

                        </div>

                        <div class="flex flex-wrap">


                            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 w-full" >
                                Información de la solicitud
                            </h2>

                            <div class="flex items-end gap-5 justify-between" >

                                <div class="col-span-2">
                                    <fieldForm 
                                    v-model="solicitudForm.dependencia"
                                    fieldType="text" 
                                    label="Dependencia" 
                                    :style="'field-model'"
                                    placeholder="¿Cual es la dependencia?" />
                            </div>

                            <div class="col-span-2">
                                <fieldForm 
                                    v-model="solicitudForm.asunto"
                                    fieldType="text" 
                                    label="Asunto" 
                                    :style="'field-model'"
                                    placeholder="¿Cual es el asunto?" />
                                </div>
                                
                                <div class="  col-span-2">
                                    <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Desicion</label>
                                    <select id="desicion"     v-model="solicitudForm.desicion"
                                    class="bg-gray-50 mb-5 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select">
                                    <option value="pendiente" data-color="#facc15">Pendiente</option>
                                    <option value="aprobada" data-color="#22c55e">Aprobada</option>
                                    <option value="rechazada" data-color="#ef4444">Rechazada</option>
                                </select>
                                </div>
                                
                           
                                <div class="mb-5 col-span-2">
                      <label for="base-input" class="form-label">Fecha</label>
                      <DatePicker 
                      v-model="solicitudForm.fecha_solicitud"
                      dateFormat="yy-mm-dd"
                      placeholder="Fecha de la solicitud"
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

                      
         


                            
                        </div>
                               
                        </div>

                        <div class="flex justify-end w-full " >

                            <button type="submit"
                            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd"></path>
                        </svg>
                            Guardar
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script setup>
import DatePicker from 'primevue/datepicker';
import useSolicitanteStore from '@/stores/solicitante';
import useDescripcionStore from '@/stores/descripcion';
import useSolicitudStore from '@/stores/solicitud';
import fieldForm from '@/components/util/fieldForm.vue'
import debounce from '@/utils/debounce';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

/* 
    functions and properties for modal handling
*/

const showModal = ref(false);

const toggleModal = () => {
    showModal.value = !showModal.value;
}

const closeModal = () => {
    showModal.value = false;
    resetForm();
}



/* 
    functions and properties for applicant search
*/

const nombreSolicitante = ref('');

const solicitanteStore = useSolicitanteStore();

const {
    solicitantes
} = storeToRefs(solicitanteStore);

const {
    fetchSolicitantes
} = solicitanteStore;


const searchSolicitante = debounce(async () => {
    if(!nombreSolicitante.value) return;
    await fetchSolicitantes(`filter[nombre]=${nombreSolicitante.value}`);
}, 500);



/*  
    functions, forms and properties for creating and updating applications
*/

const solicitante = ref({
    nombre: '',
    email: '',
    celular: '',
    tipo_solicitante: ''
})


const descripcionForm = ref({
    estudiantes: '',
    numero_estudiantes: '',
    docentes: '',
    numero_docentes: '',
    ciudad: '',
    pais: '',
    evento: '',
});

const solicitudForm = ref({
    desicion: '',
    dependencia: '',
    fecha_solicitud: '',
    sesion_id: 1,
    descripcion_id: '',
    solicitante_id: '',
});

const resetForm = () => {
    descripcionForm.value = {
        estudiantes: '',
        numero_estudiantes: '',
        docentes: '',
        numero_docentes: '',
        ciudad: '',
        pais: '',
        evento: '',
    };

    solicitudForm.value = {
        desicion: '',
        dependencia: '',
        fecha_solicitud: '',
        sesion_id: 1,
        descripcion_id: '',
        solicitante_id: '',
    };

    resetSolicitante();
}

const resetSolicitante = () => {
    solicitante.value = {
    nombre: '',
    email: '',
    celular: '',
    tipo_solicitante: ''
}
}

const {
    createDescripcion,
    updateDescripcion
} = useDescripcionStore();

const {
    fetchSolicitud,
    createSolicitud,
    updateSolicitud,
} = useSolicitudStore();

const setSesionId = async (id) => {
    solicitudForm.value.sesion_id = id;
}

const loadInfoBySesionId = async (id) => {

    const response = await fetchSolicitud(id);

    solicitudForm.value = response.data.data;

    descripcionForm.value = response.data.data.descripcion;

    solicitante.value = response.data.data.solicitante;
}

const setSolicitante = (solicitanteData) => {
    solicitante.value = solicitanteData;
    solicitudForm.value.solicitante_id = solicitanteData.id;
}

const submitHandler = async () => {

    if(solicitudForm.value.id) {
        await updateDescripcion(descripcionForm.value, descripcionForm.value.id);
        await updateSolicitud(solicitudForm.value, solicitudForm.value.id);
        resetForm();
        toggleModal();
        return;
    }
    
    const descripcionResponse = await createDescripcion(descripcionForm.value);

    if(descripcionResponse.status === 201) {
        solicitudForm.value.descripcion_id = descripcionResponse.data.data.id;
    }

    const solicitudResponse = await createSolicitud(solicitudForm.value);

    if(solicitudResponse.status === 201) {
        resetForm();
        toggleModal();
    }

}




/*  
    setSesionId:
        Este método se encarga de cargar el ID de la sesión en el formulario de solicitud 
        al crear nuevas solicitudes.

        - Primero, debes llamar a setSesionId para asignar el ID de la sesión al formulario.
        - Después de esto, puedes ejecutar toggleModal para abrir el modal donde se completará el proceso de creación de la solicitud.

    loadInfoBySesionId: 
        Este método realiza las peticiones necesarias para cargar toda la información relacionada 
        con la solicitud, utilizando el ID de la sesión. Esto permite pre-poblar los campos del 
        formulario con la información correspondiente antes de que el usuario complete la solicitud.

        - Al igual que con setSesionId, primero debes llamar a loadInfoBySesionId para cargar los datos necesarios.
        - Una vez que la información esté cargada, puedes ejecutar toggleModal para abrir el modal y permitir que el usuario interactúe con el formulario.
*/


defineExpose({
    setSesionId, 
    loadInfoBySesionId,
    toggleModal
})
</script>