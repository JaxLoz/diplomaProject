<template>
    
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md">
        <caption class="p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Sesion 
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Esta es la sesión #</p>
        </caption>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-5 py-4">
                    Id
                </th>
                <th scope="col" class="px-5 py-3">
                    Presidente
                </th>
                <th scope="col" class="px-5 py-3">
                    Secretario
                </th>
                <th scope="col" class="px-5 py-3">
                    Lugar
                </th>
                <th scope="col" class="px-5 py-3">
                    Fecha
                </th>
                <th scope="col" class="px-5 py-3">
                    Hora de inicio
                </th>
                <th scope="col" class="px-5 py-3">
                    Hora de fin
                </th>


            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ props.sesionInf.IDSESION }}
                </th>
                <td class="px-6 py-4">
                    {{ props.sesionInf.PRESIDENTE }}
                </td>
                <td class="px-6 py-4">
                    {{ props.sesionInf.SECRETARIO }}
                </td>
                <td class="px-6 py-4">
                    {{ props.sesionInf.LUGAR }}
                </td>
                <td class="px-6 py-4">
                    {{ formatDateService.extractDate(props.sesionInf.FECHA) }}
                </td>
                <td class="px-6 py-4">
                    {{ formatDateService.extractHour(props.sesionInf.HORARIO_INICIO) }}
                </td>
                <td class="px-6 py-4">
                    {{ formatDateService.extractHour(props.sesionInf.HORARIO_FINAL) }}
                </td>
                
            </tr>

        </tbody>
    </table>
    
<br>
</div>
</template>
<script setup>
import formatDateService from '@/service/formatDateService.js'
const props = defineProps({
    
    sesionInf: {type: Object, required: true, default: new Object()}
})
</script>