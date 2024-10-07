<template>
  <div class="relative max-w-sm">
    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ props.label }}</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
      </div>
      <input 
        ref="datepickerRef" 
        v-model="dateInfo" 
        type="text" 
        :class="props.style !== '' ? props.style : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'" 
        :placeholder="props.placeholder"
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Datepicker } from 'flowbite-datepicker';

const datepickerRef = ref(null); // en vue 3 en vez de obtener la referencia el elemento input por medio de getById, se obtiene por medio del atributo ref en el elemento input
const dateInfo = defineModel();
const props = defineProps({
  title: {type: String, Required: false, default: "Date"},
  label: {type: String, Required: false, default: "LabelDefault"},
  placeholder: {type: String, Required: false, default: ""},
  style: {type: String, Required: false, default: ""}
})

onMounted(() => {
  console.log(props.title)
  if (datepickerRef.value) {
    new Datepicker(datepickerRef.value, {
      autohide: true,
      orientation: 'top',
      format: 'dd/mm/yyyy',
      autoSelectToday: true,
      title: props.title,
    });
  }
});
</script>