<template>
    <div id="search-content" class="max-w-2xl mx-auto mt-2">
      <div id="invitations-section" class="relative">
        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ props.label }}</label>
        <div class="mb-1">
          <input 
            v-model="searchField" 
            type="text" 
            :placeholder="props.placeholder" 
            :class="props.style !== '' ? props.style : 'py-2 px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'"
          >
        </div>
        
        <ul v-if="searchInfo !== ''" class="absolute w-full text-base list-none bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          <li 
            v-for="item in props.listItems" 
            :key="item.id" 
            class="flex items-center justify-between p-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            <div>
              <span class="block font-medium">{{ item.firstname + ' ' + item.lastname }}</span>
              <span class="block text-sm text-gray-500 ml-2 dark:text-gray-400">{{ item.email }}</span>
            </div>
            <button 
              type="button" 
              @click="addItem(item)"
              class="text-gray-400 hover:text-blue-500 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
              </svg>
            </button> 
          </li>
        </ul>
        
      </div>
    </div>
  </template>
  
<script setup>
const searchField = defineModel('modelValue');
const emit = defineEmits(['itemSelected']);

const props = defineProps({
    searchInfo: {type: Array, Required: true, default: new Array()},
    listItems: {type: Array, Required: false, default: new Array()}, 
    label: {type: String, Required: true, default: "TextLabel"},
    placeholder: {type: String, Required: false, default: ""},
    style: {type: String, Required: false, default: ""}
})

const addItem = (item) => {
    emit('itemSelected', item);
    console.log(item);
}

</script>