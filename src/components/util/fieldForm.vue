<template>
    <div class="mb-5 max-w-full">
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ props.label }}</label>
      <input v-model="data" :type="props.fieldType" id="base-input" :placeholder="props.placeholder" :class="props.style !== '' ? props.style : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'">
  </div>
</template>
<script setup>
    const data = defineModel()
    const props = defineProps({
        fieldType: {type: String, Required: true, default: "text" },
        label: {type: String, Required: true, default: "TextLabel"},
        style: {type: String, Required: false, default: ""},
        placeholder: {type: String, Required: false, default: ""}
    })
</script>