<template>
  
<div ref="deleteModalAlert" id="popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
            <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-yellow-400 w-12 h-12 dark:text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-gray-100">¿Estás seguro que deseas eliminar la sesión?</h3>
                
                <div class="mb-5 text-left bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Se eliminarán los siguientes datos:</p>
                    <ul class="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <li>{{`Datos de la sesión con id: ${Object.keys(props.infSesionToRemove).length != 0 ?  props.infSesionToRemove.IDSESION : ''}`}}</li>
                        <li>{{`Datos y referencia al acta con el numero: ${Object.keys(props.infSesionToRemove).length != 0 && props.infSesionToRemove.actas.length != 0 ? props.infSesionToRemove.actas[0].ID_ACTA : 'N/A'}`}}</li>
                        <li>Datos y referencia a invitaciones</li>
                        <li>Datos y referencia de las tareas y asignaciones</li>
                        <li>Datos y referencia de las proposiciones</li>
                    </ul>
                </div>
                
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    Luego de ejecutar esta accion no habra vuelta atras.
                </div>

                <button @click="confirmAction" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Sí, eliminar sesión
                </button>
                <button @click="emit('cancelAction')" data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    No, cancelar
                </button>
            </div>
        </div>
    </div>
</div>
</template>
<script setup>
import { useTemplateRef } from 'vue';
import { useSessionStore } from '@/stores/session';

const emit = defineEmits(['cancelAction', 'confirmAction']);
const props = defineProps({
    infSesionToRemove: {type: Object, required: true, default: new Object()}
})
const sesionStore = useSessionStore()
// obtengo la referencia del template
const target = useTemplateRef('deleteModalAlert');
// esto es para exponer la referecia del template pues no se puede acceder a ella directamente en el padre al usar script setup pues es un ambito privado
defineExpose({
    target, // aqui va la referencia del DOM de este elemento
});

const confirmAction = () => {
    sesionStore.deleteSession(props.infSesionToRemove)
    sesionStore.fetchSessions()
    emit('confirmAction')
}

</script>