<template>
    <div 
    v-if="props.profile?.rol == 'coordinador' || props.profile?.rol == 'secretario' || props.profile?.rol == 'miembro' || props.profile?.rol =='invitado' || props.profile?.rol =='estudiante'"
    class="relative overflow-x-auto shadow-md sm:rounded-lg p-4 space-y-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <!-- Header Section -->
            <div class="p-4 border-b dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Sesión
                </h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Esta es la sesión #
                </p>
            </div>

            <!-- Tabla -->
            <div class="overflow-hidden">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-3">Id</th>
                            <th scope="col" class="px-4 py-3">Presidente</th>
                            <th scope="col" class="px-4 py-3">Secretario</th>
                            <th scope="col" class="px-4 py-3">Lugar</th>
                            <th scope="col" class="px-4 py-3">Fecha</th>
                            <th scope="col" class="px-4 py-3">Hora de inicio</th>
                            <th scope="col" class="px-4 py-3">Hora de fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white dark:bg-gray-800">
                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ props.sesionInf.IDSESION }}
                            </th>
                            <td class="px-4 py-3">
                                {{ props.sesionInf.PRESIDENTE }}
                            </td>
                            <td class="px-4 py-3">
                                {{ props.sesionInf.SECRETARIO }}
                            </td>
                            <td class="px-4 py-3">
                                {{ props.sesionInf.LUGAR }}
                            </td>
                            <td class="px-4 py-3">
                                {{ formatDateService.extractDate(props.sesionInf.FECHA) }}
                            </td>
                            <td class="px-4 py-3">
                                {{ formatDateService.extractHour(props.sesionInf.HORARIO_INICIO) }}
                            </td>
                            <td class="px-4 py-3">
                                {{ formatDateService.extractHour(props.sesionInf.HORARIO_FINAL) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
import formatDateService from '@/service/formatDateService.js'
const props = defineProps({
    sesionInf: {type: Object, required: true, default: new Object()},
    profile: {type: Object, required: true, default: new Object()}
})
</script>