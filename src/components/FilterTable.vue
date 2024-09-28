<template>
  <div class="table-responsive max-h-96 overflow-y-auto"> <!-- Contenedor con scroll y altura máxima -->
    <div class="relative overflow-x-auto"> <!-- Este contenedor se mantiene para el scroll horizontal -->
      <table class="min-w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Periodo</th>
            <th scope="col" class="px-6 py-3">Facultad</th>
            <th scope="col" class="px-6 py-3">Programa</th>
            <th scope="col" class="px-6 py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in props.datos" :key="fila.id" class="bg-white border-b">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ fila.periodo }}
            </th>
            <td class="px-6 py-4">{{ fila.facultad }}</td>
            <td class="px-6 py-4">{{ fila.programa }}</td>
            <td class="px-6 py-4">{{ fila.total_matricula }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  datos: {
    type: Array,
    required: true
  }
})
</script>



  