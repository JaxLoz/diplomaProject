<template>
<div class="titleSolicitud">
<!-- Breadcrumb -->
<div class="max-w-md">
<nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">  <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li class="inline-flex items-center">
        <router-link to="/sesion" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
      
        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Sesiones
    </router-link>
    </li>

    <li>
      <div class="flex items-center">
        <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <router-link to="/SesionView" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Sesión #</router-link>
      </div>
    </li>
        <li>
      <div class="flex items-center">
        <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <router-link to="/SesionSolicitud" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Solicitudes</router-link>
      </div>
    </li>
    <li aria-current="page">
      <div class="flex items-center">
        <svg class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Proposiciones</span>
      </div>
    </li>

  </ol>
</nav>
</div>
<br>    
<!-- Titutlo -->
<h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Proposiciones de la Sesión #</h2>

</div>

<!-- Contenedor Primario  -->
    <div class="centroProposiciones">
        <!-- Tabla de Proposiciones -->
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Proposiciones
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Proposiciones de la Sesión #.</p>
        </caption>
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
                    
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Borrar</button>
                    </div>
                </td>
            </tr>

        </tbody>
    </table>
</div>

    </div>
</template>