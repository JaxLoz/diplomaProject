<template>
    <Teleport to="body">

        <div v-if="showModal" tabindex="-1" aria-hidden="true"
            class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Nueva descripción
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
                    <form class="p-4 md:p-5" @submit.prevent="submitHandler">
                        <div class="grid gap-4 mb-4 grid-cols-2">

                            <div class="col-span-2">
                                <fieldForm 
                                    v-model="form.estudiantes"
                                    fieldType="text" 
                                    label="Estudiantes" 
                                    :style="'field-model'"
                                    placeholder="Escriba los nombres de los estudiantes implicados... " />
                            </div>

                            <div class="col-span-2">
                                <fieldForm 
                                    v-model="form.numero_estudiantes"
                                    fieldType="number" 
                                    label="Número de estudiantes implicados" 
                                    :style="'field-model'"
                                    placeholder="Escriba el número de estudiantes implicados" />
                            </div>

                            <div class="col-span-2">
                                <fieldForm 
                                    v-model="form.docentes"
                                    fieldType="text" 
                                    label="Docentes" 
                                    :style="'field-model'"
                                    placeholder="Escriba los nombres de los docentes implicados..." />
                            </div>

                            <div class="col-span-2">
                                <fieldForm 
                                    v-model="form.numero_docentes"
                                    fieldType="number" 
                                    label="Número de docentes implicados" 
                                    :style="'field-model'"
                                    placeholder="Escriba el número de docentes implicados" />
                            </div>

                            <div class="col-span-2">
                                <fieldForm 
                                    v-model="form.ciudad"
                                    fieldType="text" 
                                    label="Ciudad" 
                                    :style="'field-model'"
                                    placeholder="¿Escribe el nombre de la ciudad?" />
                            </div>

                            <div class="col-span-2">
                                <fieldForm 
                                    v-model="form.pais"
                                    fieldType="text" 
                                    label="Pais" 
                                    :style="'field-model'"
                                    placeholder="¿Escribe el nombre del pais?" />
                            </div>

                            <div class="col-span-2">
                                <fieldForm 
                                    v-model="form.evento"
                                    fieldType="text" 
                                    label="Evento" 
                                    :style="'field-model'"
                                    placeholder="Escribe el nombre del evento" />
                            </div>

                        </div>
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
                    </form>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script setup>
import { ref } from 'vue';
import useDescripcionStore from '@/stores/descripcion';
import fieldForm from '@/components/util/fieldForm.vue'

const showModal = ref(false);

const toggleModal = () => {
    showModal.value = !showModal.value;
}

const closeModal = () => {
    resetForm();
    showModal.value = false;
}


const form = ref({
    id: -1,
    estudiantes: '',
    numero_estudiantes: '',
    docentes: '',
    numero_docentes: '',
    ciudad: '',
    pais: '',
    evento: '',
});

const resetForm = () => {

    form.value = {
    id: -1,
    estudiantes: '',
    numero_estudiantes: '',
    docentes: '',
    numero_docentes: '',
    ciudad: '',
    pais: '',
    evento: '',
}
}


const {
    updateDescripcion
} = useDescripcionStore();

const setDescripcion = (descripcion) => {
    form.value = descripcion;
}

const submitHandler = async () => {
    
    const response = await updateDescripcion(form.value, form.value.id);

    if(response.status === 200) {
        toggleModal();
    }
}


defineExpose({
    setDescripcion,
    toggleModal
})
</script>