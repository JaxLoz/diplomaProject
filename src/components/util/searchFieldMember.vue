<template>
  <div id="search-content" class="max-w-2xl mx-auto mt-2">
    <div id="search-section" class="relative">
      <label for="search-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {{ label }}
      </label>
    <input
        v-model="searchField"
        id="search-input"
        type="text"
        :placeholder="placeholder"
        class="py-2 px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <ul
        v-if="searchField != ''"
        class="absolute w-full mt-2 text-base list-none bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
      >
        <li
          v-for="member in props.listmember"
          :key="member.miembro_id"
          class="flex items-center justify-between p-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          <span class="font-medium">{{ member.nombre }}</span>
          <span class="font-medium">{{ member.email }}</span>
          <button
            type="button"
            @click="selectMember(member)"
            class="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            Seleccionar
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  members: { type: Array, required: true, default: () => [] }, // Lista de miembros
  label: { type: String, default: "Buscar miembro" },
  placeholder: { type: String, default: "Escribe el nombre del miembro..." },
  listmember:{type:Object, default: new Object(), required: true},
  
});

const emit = defineEmits(["memberSelected"]); // Evento para seleccionar un miembro

 const searchField = defineModel('modelValue'); // Campo de búsqueda


// Emitir el miembro seleccionado
const selectMember = (member) => {
  emit("memberSelected", member);
};
</script>
