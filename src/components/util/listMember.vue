<template>
  <div v-if="Object.keys(props.elements).length > 0" id="list-content" class="max-w-full">
    <label for="list-label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <ul class="divide-y divide-gray-100 dark:divide-gray-600">
      <li
        class="flex items-center justify-between p-3 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
      >
        <div class="flex flex-col">
          <span class="font-medium">{{ props.elements.nombre }}</span>
          <span class="font-medium">{{ props.elements.email}}</span>
        </div>
        <button
          type="button"
          @click="removeMember()"
          class="text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>

const props = defineProps({
  elements: { type: Object, required: true, default: new Object()}, // Lista de miembros
  label: { type: String, default: "Miembros seleccionados" },
});

const emit = defineEmits(["removeMember"]); // Evento para eliminar un miembro

// Emitir evento para eliminar un miembro
const removeMember = () => {
  emit("removeMember");
};
</script>
