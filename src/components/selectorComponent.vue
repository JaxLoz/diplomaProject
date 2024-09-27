<template>
    <label for="filtroFacultad" class="block mb-2 text-sm font-medium text-gray-900">
            {{ props.titleLabel+" :" }}
        </label>
        <select id="filtroFacultad" v-model="dataSelected" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="">{{ props.defaultOption }}</option>
            <option v-for="items in props.arrayOptions" :key="items">
                {{ items }}
            </option>
        </select>
        <br>
</template>
<script setup>
import { defineProps, defineModel } from 'vue'

const dataSelected = defineModel() // props bidireccional (pasar datos entre componentes padres e hijos y viceversa)

const props = defineProps({
    defaultOption: {type: String, default: 'Valor por defecto'},
    titleLabel: {type: String, default: 'Título del selector'},
    arrayOptions: {type: Array, default: () => []}
})


</script>