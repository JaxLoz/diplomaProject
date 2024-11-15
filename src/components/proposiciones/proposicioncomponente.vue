<template>
  <div class="titleTarea">
    <!-- Tituto -->
    <h2
      class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white"
    >
      Proposiciones
    </h2>
  </div>
  <div class="centroTarea">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="createAction">
        <!-- Boton de creación de accion  -->
        <div
          class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900"
        >
          <button
            @click=""
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Crear Proposición
          </button>
          <!-- Search para busqueda  -->
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative px-5">
            <div
              class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-7 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              class="block pt-2 ps-7 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar proposición"
            />
          </div>
        </div>
      </div>
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="p-4"></th>
            <th scope="col" class="px-6 py-3">ID Proposicion</th>
            <th scope="col" class="px-6 py-3">ID Sesión</th>
            <th scope="col" class="px-6 py-3">Descripción</th>
            <th scope="col" class="px-6 py-3">Desición</th>
            <th scope="col" class="px-6 py-3">Proponente</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="w-4 p-4"></td>
            <td class="px-6 py-4">3</td>
            <td class="px-6 py-4">2</td>
            <td class="px-6 py-4">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Sapien rhoncus bibendum nisi
              lorem imperdiet tempus.
            </td>
            <td class="px-2 py-4">
              <form class="mx-auto">
                <select
                  id="acta"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select"
                >
                  <option value="sin comenzar" data-color="#facc15">Pendiente</option>
                  <option value="en proceso" data-color="#22c55e">Aprobada</option>
                  <option value="finalizado" data-color="#ef4444">Rechazada</option>
                </select>
              </form>
            </td>
            <th
              scope="row"
              class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img class="w-10 h-10 rounded-full" src="@/assets/img/image12.jpg" alt="Jese image" />
              <div class="ps-3">
                <div class="text-base font-semibold">Neil Sims</div>
                <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
              </div>
            </th>

            <td class="px-6 py-4">
              <div class="flex flex-row justify-between items-center">
                <!--Editar-->
                <div>
                  <svg
                    @click="updateSession(element)"
                    class="w-[18px] h-[18px] icon-button"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <!--Ver-->
                <div>
                  <router-link
                    to="/SesionView"
                    class="w-[18px] h-[18px] icon-button"
                    aria-hidden="true"
                  >
                    <svg
                      @click="viewSession(element)"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </router-link>
                </div>
                <!--copiar el id-->
                <div>
                  <svg
                    class="w-[18px] h-[18px] icon-button"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Modal del Edit de Tarea-->

      <br />
      <center>
        <!-- Paginacion de tabla encargados y tareas sesión -->
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px text-sm">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >Previous</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >1</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >2</a
              >
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >3</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >4</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >5</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </center>
      <br />
    </div>
  </div>
</template>
