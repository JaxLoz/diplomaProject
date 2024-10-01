<template>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg max-h-96 overflow-y-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="px-4 py-3 bg-gray-50 dark:bg-gray-800">Periodo</th>
                <th scope="col" class="px-4 py-3 bg-gray-50 dark:bg-gray-800">Facultad</th>
                <th scope="col" class="px-4 py-3 bg-gray-50 dark:bg-gray-800">Programa</th>
                <th scope="col" class="px-4 py-3 bg-gray-50 dark:bg-gray-800">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fila in props.datos" :key="fila.id" class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  {{ fila.periodo }}
                </th>
                <td class="px-4 py-4">{{ fila.facultad }}</td>
                <td class="px-4 py-4 bg-gray-50 dark:bg-gray-800">{{ fila.programa }}</td>
                <td class="px-4 py-4">{{fila.total_matricula}}</td>
            </tr>
            
        </tbody>
    </table>
</div>

</template>

<script setup>

const props = defineProps({
  datos: {
    type: Array,
    required: true
  }
})
</script>



  