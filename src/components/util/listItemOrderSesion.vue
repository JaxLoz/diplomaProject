<template>
    <div v-if="elements.length > 0" id="list-content" class="max-w-full">
        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ props.label }}</label>
        <!-- Contenedor con scroll -->
        <div class="max-h-[400px] overflow-y-auto">
            <ul :class="props.style">
                <li 
                    v-for="element in props.elements" 
                    :key="element.orden" 
                    class="flex items-center justify-between p-3 mb-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 dark:text-gray-200"
                >
                    <div class="flex flex-row gap-x-8 flex-1 min-w-0">
                        <div class="self-center flex-shrink-0 inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span class="font-medium text-gray-600 dark:text-gray-300">{{ element.orden }}</span>
                        </div>
  
                        <div class="flex flex-col justify-start items-start flex-1 min-w-0">
                            <span class="font-medium break-words w-full">{{ element.TEMA }}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-400 break-words w-full">{{ element.DESCRIPCION.length > 30 ? element.DESCRIPCION.slice(0,30)+"...": element.DESCRIPCION }}</span>
                        </div>
                    </div>
  
                    <button 
                        v-if="!element.dataBaseOrigin || props.isUpdateMode"
                        type="button" 
                        @click="updateItem(element)"
                        class="flex-shrink-0 ml-4"
                    >
                      <svg class="w-[18px] h-[18px] text-gray-800 dark:text-gray-400 dark:hover:text-blue-600 transition-colors duration-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                      </svg>
                    </button> 
                    
                    <button
                        v-if="!element.dataBaseOrigin && !props.isUpdateMode" 
                        type="button" 
                        @click="deleteItem(element)"
                        class="flex-shrink-0 ml-4"
                    >
                        <svg class="w-[18px] h-[18px] text-gray-800 dark:text-gray-400 dark:hover:text-red-600 transition-colors duration-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                    </button> 
                </li>
            </ul>
        </div>
    </div>
  </template>
<script setup>
import { onMounted } from 'vue';


    const props = defineProps({
        label: {type: String, Required: true, default: "TextLabel"},
        style: {type: String, Required: false, default: ""},
        elements: {type: Array, Required: false, default: new Array()},
        isUpdateMode: {type: Boolean, Required: false, default: false}
    })

    const emit = defineEmits(['deleteItem', 'updateItem']);

    const deleteItem = (element) => {
        emit('deleteItem', element)
    }

    const updateItem = (element) => {
      emit('updateItem', element)
    }

    onMounted(() => {
        console.log("se monto la lista de items")
    })
</script>