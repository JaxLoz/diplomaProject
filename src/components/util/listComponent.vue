<template>
    <div v-if="elements.length > 0" id="list-content" class="max-w-full">
        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ props.label }}</label>
        <ul :class="props.style">
            <li 
            v-for="element in props.elements" 
            :key="element.id" 
            class="flex items-center justify-between p-3 mb-1 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 dark:text-gray-200"
          >
          
            <div class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span class="font-medium text-gray-600 dark:text-gray-300">{{ element.firstname.slice(0,1)+element.lastname.slice(0,1) }}</span>
            </div>

            <div>
              <span class="block font-medium">{{ element.firstname + ' ' + element.lastname }}</span>
              <span class="block text-sm text-gray-500 ml-2 dark:text-gray-400">{{ element.email }}</span>
            </div>

            <button 
              type="button" 
              @click="deleteItem(element)">
            <svg class="w-[18px] h-[18px] text-gray-800 dark:text-gray-400 dark:hover:text-red-600 transition-colors duration-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>
            </button> 
          </li>
        </ul>
    </div>
</template>
<script setup>
    const props = defineProps({
        label: {type: String, Required: true, default: "TextLabel"},
        style: {type: String, Required: false, default: ""},
        elements: {type: Array, Required: false, default: new Array()}
    })

    const emit = defineEmits(['deleteItem']);

    const deleteItem = (element) => {
        emit('deleteItem', element)
    }
</script>