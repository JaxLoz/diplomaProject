<template>
    <div :class="props.typeAlert == 'error' ? styleTextBase+' '+textColorError : props.typeAlert == 'warning' ? styleTextBase+' '+textColorWarning : styleTextBase+' '+textColorSuccesfull" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Danger</span>
  <div>
    <span class="font-medium">{{ props.message.message }}</span>
      <ul v-if="props.message.errors !== undefined" class="mt-1.5 list-disc list-inside">
        <li v-for="validation in props.message.errors" :key="validation" >
          {{ validation[0] }}
        </li>
        
    </ul>
  </div>
  <button @click="emit('closeAlert')" type="button" :class="props.typeAlert == 'error' ? styleButonBase+' '+buttonColorError : props.typeAlert == 'warning' ? styleButonBase+' '+buttonColorWarning : styleButonBase+' '+buttonColorSuccesfull" data-dismiss-target="#alert-2" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>

</template>
<script setup>

const props = defineProps({
    message: {type: Object, Required: true, default: new Object({message: 'Algo salio mal'})},
    typeAlert: {type: String, Required: false, default: "error"}
});

const emit = defineEmits(['closeAlert']);

const styleButonBase = 'ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700'
const buttonColorSuccesfull = 'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:text-green-400'
const buttonColorError = 'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:text-red-400'
const buttonColorWarning = 'bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:text-yellow-300'


const styleTextBase = 'flex p-4 mb-4 text-sm rounded-lg dark:bg-gray-800'
const textColorSuccesfull = 'text-green-800 bg-green-50 dark:text-green-400'
const textColorError = 'text-red-800 bg-red-50 dark:text-red-400'
const textColorWarning = ' text-yellow-800 bg-yellow-50 dark:text-yellow-300'


</script>