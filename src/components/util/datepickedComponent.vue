<template>
  <div class="relative max-w-sm">
    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ props.label }}</label>

      <div class="relative max-w-sm">
        <div class="absolute inset-y-0 right-4 flex items-center ps-3 pointer-events-none">
          <svg class="w-[18px] h-[18px] text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
            </svg>
        </div>
        <input 
          id="datepicker-actions"
          ref="datepickerElement"
          v-model="dateInfo"
          type="text" 
          :class="props.style !== '' ? props.style : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'" 
          :placeholder="props.placeholder"
        >
      </div>


  </div>
</template>

<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';
import { Datepicker } from 'flowbite-datepicker';
import { initFlowbite } from 'flowbite'

const props = defineProps({
  title: {type: String, Required: false, default: "Date"},
  label: {type: String, Required: false, default: "LabelDefault"},
  placeholder: {type: String, Required: false, default: ""},
  style: {type: String, Required: false, default: ""}
})

const dateInfo = defineModel('modelValue');
const datePicketIntance = ref(null);
const datePicketTarget = useTemplateRef('datepickerElement');
const optionDatePicker = {
  rangePicker: false,
  autohide: true,
  orientation: 'top',
  autoSelectToday: 1,
  format: 'yyyy-mm-dd',
  todayButton: true,
  minDate: 'today',
  language: 'es',
};


 

onMounted(() => {
  initFlowbite();
  datePicketIntance.value = new Datepicker(datePicketTarget.value, optionDatePicker);
});


</script>