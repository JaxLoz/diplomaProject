<template>
  <div class="relative overflow-x-auto">
    <p></p>
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md"
    >
      <caption
        class="p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
      >
        Acta
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Acta de la sesión #</p>
      </caption>
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Id del acta</th>
          <th scope="col" class="px-1 py-3">Estado del acta</th>
        </tr>
      </thead>
      <tbody>
        <!-- Filtramos las actas para mostrar solo las que coinciden con la sesión actual -->
      </tbody>

      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            
          </th>
          <td class="px-2 py-4">
            <form class="mx-auto">
              <select
                id="acta"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value="pediente">Pendiente</option>
                <option value="aprobada">Aprobada</option>
                <option value="rechazada">Rechazada</option>
              </select>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>

</script>
