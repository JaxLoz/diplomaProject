<script setup>
import ModalEditProposicionEspecifico from './ModalEditProposicionEspecifico.vue';
import ModalCreateProposicionEspecifico from './ModalCreateProposicionEspecifico.vue';
</script>
<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md">
    <caption class="p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 rounded-t-lg">
        Proposiciones
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Proposiciones de la Sesión #</p>
    </caption>
    </table>
    <div class="createAction">
         <!-- Boton de creación  -->
        <div data-modal-target="CreateProposicion" data-modal-toggle="CreateProposicion"  class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Crear Proposición</button>
        <!-- Search para busqueda  -->
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative px-5">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-7 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" class="block pt-2 ps-7 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar Proposición">
        </div>
    </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Descripción
                </th>
                <th scope="col" class="px-6 py-3">
                    Decisión
                </th>
                <th scope="col" class="px-6 py-3">
                    Proponente
                </th>
                
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1
                </th>
                <td class="px-6 py-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis sapiente recusandae aperiam. Nobis ipsa nulla exercitationem voluptas, tempore corrupti nesciunt, sed nemo quos autem illum et perspiciatis reprehenderit ratione?
                </td>
             <td class="px-2 py-4">
                   <form class="mx-auto">
             <select id="acta" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select">
    <option value="pendiente" data-color="#facc15">Pendiente</option>
    <option value="aprobada" data-color="#22c55e">Aprobada</option>
    <option value="rechazada" data-color="#ef4444">Rechazada</option>
       </select>
         </form>
                </td>

                    <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div class="flex items-center">
                                <div
                                    class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span class="font-medium text-gray-600 dark:text-gray-300">ML</span>
                                </div>
                                <div class="ps-3">
                                    <div class="text-base font-semibold">María López</div>
                                    <div class="font-normal text-gray-500">maria.lopez@example.com</div>
                                </div>
                            </div>
                        </td>
                    
                <td class="px-6 py-4">
                    <div class="centroAction">
                        <button data-modal-target="EditProposicion" data-modal-toggle="EditProposicion" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Editar</button>
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Borrar</button>
                    </div>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    2
                </th>
                <td class="px-6 py-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo neque odit quod architecto cupiditate iure cum quidem repellendus illo delectus ipsa, ratione harum facere rerum excepturi nisi numquam deserunt alias.
                </td>
                <td class="px-2 py-4">
                   <form class="mx-auto">
             <select id="acta" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select">
    <option value="pendiente" data-color="#facc15">Pendiente</option>
    <option value="aprobada" data-color="#22c55e">Aprobada</option>
    <option value="rechazada" data-color="#ef4444">Rechazada</option>
       </select>
         </form>
                </td>

                    <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div class="flex items-center">
                                <div
                                    class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span class="font-medium text-gray-600 dark:text-gray-300">ML</span>
                                </div>
                                <div class="ps-3">
                                    <div class="text-base font-semibold">María López</div>
                                    <div class="font-normal text-gray-500">maria.lopez@example.com</div>
                                </div>
                            </div>
                        </td>
                    
                <td class="px-6 py-4">
                    <div class="centroAction">
                        <button data-modal-target="EditProposicion" data-modal-toggle="EditProposicion" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Editar</button>
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Borrar</button>
                    </div>
                </td>
            </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    3
                </th>
                <td class="px-6 py-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo voluptate in esse consectetur. Placeat vitae voluptas eum laboriosam dignissimos! Mollitia eius obcaecati blanditiis nobis? Ipsam reprehenderit aperiam quaerat a ad?
                </td>
                <td class="px-2 py-4">
                   <form class="mx-auto">
             <select id="acta" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select">
    <option value="pendiente" data-color="#facc15">Pendiente</option>
    <option value="aprobada" data-color="#22c55e">Aprobada</option>
    <option value="rechazada" data-color="#ef4444">Rechazada</option>
       </select>
         </form>
                </td>
                    <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div class="flex items-center">
                                <div
                                    class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span class="font-medium text-gray-600 dark:text-gray-300">ML</span>
                                </div>
                                <div class="ps-3">
                                    <div class="text-base font-semibold">María López</div>
                                    <div class="font-normal text-gray-500">maria.lopez@example.com</div>
                                </div>
                            </div>
                        </td>
                    
                <td class="px-6 py-4">
                    <div class="centroAction">
                        <button data-modal-target="EditProposicion" data-modal-toggle="EditProposicion" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Editar</button>
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Borrar</button>
                    </div>
                </td>
            </tr>

        </tbody>
    </table>
    <!--Modal Edit Proposición -->
<ModalEditProposicionEspecifico />
<!-- Modal Creación Proposición -->
<ModalCreateProposicionEspecifico />
</div>
<br>
<center>
    <!-- Paginacion de tabla de proposiciones -->
<nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px text-sm">
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>
</center>
</template>