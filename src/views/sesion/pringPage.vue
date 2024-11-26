<template>
  <div class="min-h-screen flex flex-col mt-20 items-center justify-center p-6 bg-white dark:bg-gray-900">
    <div class="w-full max-w-4xl mx-auto print:m-0 relative">
      <!-- Contenedor de botones y título -->
      <div class="flex items-center mb-8 print:mb-20">
        <!-- Botón de volver a la izquierda -->
        <button 
          @click="backLayout" 
          class="mr-auto px-2 py-2 bg-gray-200 text-white rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 print:hidden"
        >
          <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
          </svg>

        </button>

        <!-- Título centrado -->
        <h1 class="text-3xl font-bold text-center text-gray-900 dark:text-white flex-grow">
          Detalles de la Sesión
        </h1>

        <!-- Botón de impresión a la derecha -->
        <button 
            @click.prevent="PringPage"
            type="submit" 
            class="w-10 h-10 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            
            <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
            </svg>
          </button>
      </div>

      <!-- Informacion de la sesion -->
      
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
          <!-- Header Section -->
          <div class="p-4 border-b dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Sesión
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Detalles completos de la sesión
            </p>
          </div>

          <!-- Tabla -->
          <div class="" id="SesionTable">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">Id</th>
                  <th scope="col" class="px-4 py-3">Presidente</th>
                  <th scope="col" class="px-4 py-3">Secretario</th>
                  <th scope="col" class="px-4 py-3">Lugar</th>
                  <th scope="col" class="px-4 py-3">Fecha</th>
                  <th scope="col" class="px-4 py-3">Hora de inicio</th>
                  <th scope="col" class="px-4 py-3">Hora de fin</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white dark:bg-gray-800">
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ sesionInf.IDSESION }}
                  </th>
                  <td class="px-4 py-3">
                    {{ sesionInf.PRESIDENTE }}
                  </td>
                  <td class="px-4 py-3">
                    {{ sesionInf.SECRETARIO }}
                  </td>
                  <td class="px-4 py-3">
                    {{ sesionInf.LUGAR }}
                  </td>
                  <td class="px-4 py-3">
                    {{ formatDateService.extractDate(sesionInf.FECHA) }}
                  </td>
                  <td class="px-4 py-3">
                    {{ formatDateService.extractHour(sesionInf.HORARIO_INICIO) }}
                  </td>
                  <td class="px-4 py-3">
                    {{ formatDateService.extractHour(sesionInf.HORARIO_FINAL) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


      <!-- Acta -->

    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
      <!-- Sección de Encabezado -->
      <div class="p-4 border-b dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Acta
        </h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Acta de la sesión #
        </p>
      </div>

      <!-- Contenedor de Tabla -->
      <div class="overflow-hidden rounded-b-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">ID del acta</th>
              <th scope="col" class="px-4 py-3">Estado del acta</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(acta, index) in sesionInf.actas"
              :key="acta.ID_ACTA"
              :class="[
                'bg-white dark:bg-gray-800',
                index !== sesionInf.actas.length - 1 ? 'border-b dark:border-gray-700' : ''
              ]"
            >
              <td
                scope="row"
                class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ acta.ID_ACTA }}
              </td>
              <td class="px-4 py-4">
                <!-- Estado de asistencia cuando el acta no está pendiente -->
                <div  class="flex items-center gap-2">
                    <div :class="['h-2.5 w-2.5 rounded-full', acta.ESTADO == 'aprobada' ? 'bg-green-500' : 'bg-red-500']"></div>
                    <span>{{ acta.ESTADO }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  <!-- Orden de la sesion -->
        <!-- Sección de Encabezado -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
            <!-- Header Section -->
            <div class="p-4 border-b dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Orden de la sesión
                </h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Actividades que se llevarán a cabo en la sesión
                </p>
            </div>
           
            <!-- Contenedor de Tabla -->
            <div class="overflow-x-auto flex flex-col items-center rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4 hidden sm:table-cell"></th>
                            <th scope="col" class="px-4 py-3">Orden</th>
                            <th scope="col" class="px-4 py-3">Tema</th>
                            <th scope="col" class="px-4 py-3">Descripción</th>
                            <th scope="col" class="p-4 hidden sm:table-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in sesionInf.orden_sesions"
                            :key="item.ID_ORDEN_SESION"
                            :class="[
                            'bg-white dark:bg-gray-800',
                            index !== sesionInf.orden_sesions.length - 1 ? 'border-b dark:border-gray-700' : ''
                            ]"
                        >
                            <td class="w-4 p-4 hidden sm:table-cell"></td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                {{ item.orden }}
                            </td>
                            <td class="px-4 py-4">
                                <div class="text-base font-semibold text-gray-900 dark:text-white">
                                    {{ item.TEMA }}
                                </div>
                            </td>
                            <td class="px-4 py-4">
                                <div class="break-words">
                                    {{ item.DESCRIPCION }}
                                </div>
                            </td>

                            <td class="w-4 p-4 hidden sm:table-cell"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      
      <!-- Asistencia miembros -->

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
            <!-- Header Section -->
            <div class="p-4 border-b dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Asistentes de miembros del comité
                </h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Asistentes de la sesión
                </p>
            </div>

            <!-- Tabla Miembros -->
            <div class="overflow-x-auto flex flex-col items-center rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4"></th>
                            <th scope="col" class="px-4 py-3">Asistente</th>
                            <th scope="col" class="px-4 py-3">Cargo</th>
                            <th scope="col" class="px-4 py-3">Asistencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(member, index) in listMemberInvited" 
                            :key="member.miembro_id"
                            :class="[
                            'bg-white dark:bg-gray-800',
                            index !== listMemberInvited.length - 1 ? 'border-b dark:border-gray-700' : ''
                            ]"
                            >
                            <td class="w-4 p-4"></td>
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-3">
                                    <div>
                                        <div class="font-semibold text-gray-900 dark:text-white">
                                            {{ member.nombre }}
                                        </div>
                                        <div class="text-sm text-gray-500">{{ member.email }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3">{{ member.cargo }}</td>
                            <td class="px-4 py-3">
                                <!-- Estado de asistencia cuando el acta no está pendiente -->
                                <div
                                     class="flex items-center gap-2">
                                    <div :class="['h-2.5 w-2.5 rounded-full', member.asistencia == 'Asistio' ? 'bg-green-500' : 'bg-red-500']"></div>
                                    <span>{{member.asistencia != 'Pendiente' ? member.asistencia : 'No asistio'}}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Asistencia invitados -->

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <!-- Header Section -->
            <div class="p-4 border-b dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Asistentes de invitados a la sesión
                </h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Invitados a la sesión
                </p>
            </div>
            <!-- Tabla invitados -->
        <div class="overflow-x-auto flex flex-col items-center mb-6 rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4"></th>
                            <th scope="col" class="px-4 py-3">Asistente</th>
                            <th scope="col" class="px-4 py-3">Cargo</th>
                            <th scope="col" class="px-4 py-3">Asistencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(guest, index) in listGuestInvited" 
                            :key="guest.invitado_id"
                            :class="[
                            'bg-white dark:bg-gray-800',
                            index !== listGuestInvited.length - 1 ? 'border-b dark:border-gray-700' : ''
                            ]"
                            >
                            <td class="w-4 p-4"></td>
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-3">
                                    <div>
                                        <div class="font-semibold text-gray-900 dark:text-white">
                                            {{ guest.nombre }}
                                        </div>
                                        <div class="text-sm text-gray-500">{{ guest.email }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3">{{ guest.cargo }}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-2">
                                    <div :class="['h-2.5 w-2.5 rounded-full',guest.asistencia == 'Asistio' ? 'bg-green-500' : 'bg-red-500']"></div>
                                    <span>{{guest.asistencia != 'Pendiente' ? guest.asistencia : 'No asistio'}}</span>
                                </div>
                                
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
              </div>
        </div>

        <!-- Tabla de tareas -->


        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <!-- Encabezado -->
      <div class="p-4 border-b dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Encargados de Tareas
        </h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Encargados de Tareas de la Sesión #
        </p>
      </div>

      <!-- Tabla -->
      <div class="overflow-x-auto flex flex-col items-center rounded-lg mb-6">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4"></th>
              <th scope="col" class="px-4 py-3">ID Tarea</th>
              <th scope="col" class="px-4 py-3">Encargado de la Tarea</th>
              <th scope="col" class="px-4 py-3">Fecha de entrega</th>
              <th scope="col" class="px-4 py-3">Descripción</th>
              <th scope="col" class="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in listTareas"
              :key="task.tareas[index].IDTAREAS"
              class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="w-4 p-4"></td>
              <td class="px-4 py-4">{{ task.tareas[index].IDTAREAS }}</td>
              <th
                scope="row"
                class="flex items-center px-4 py-12 text-gray-900 whitespace-nowrap dark:text-white"
              >
                
                <div class="ps-3">
                  <div class="text-base font-semibold">{{ task.tareas[index].encargados_tareas[index].miembro.NOMBRE }}</div>
                  <div class="font-normal text-gray-500">
                    {{ task.tareas[index].encargados_tareas[index].miembro.users.email }}
                  </div>
                </div>
              </th>
              <td class="px-4 py-4">
                {{ formatDateService.extractDate(task.tareas[index].FECHA_ENTREGA) }}
              </td>
              <td class="px-4 py-4">{{ task.tareas[index].DESCRIPCION }}</td>
              <td class="px-4 py-4">
                <!-- estado de la tarea cuando el acta no está pendiente  -->
                {{ task.tareas[index].encargados_tareas[index].ESTADO }}        
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
        <!-- tabla de propocisiones -->

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div class="p-4 border-b dark:border-gray-700">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Proposiciones
                    </h2>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Proposiciones de la sesion
                    </p>
                </div>

        <div class="overflow-x-auto flex flex-col items-center rounded-lg mb-6">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-6">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4"></th>
              <th scope="col" class="p-4">ID</th>
              <th scope="col" class="px-4 py-3">Descripción</th>
              <th scope="col" class="px-4 py-3">Decisión</th>
              <th scope="col" class="px-4 py-3">Proponente</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(proposicion, index) in listProposiciones"
              :key="proposicion.ID_PROPOSICIONES"
              :class="[
                    'bg-white dark:bg-gray-800',
                    index !== listProposiciones.length - 1 ? 'border-b dark:border-gray-700' : ''
                  ]">
                  <td class="w-4 p-4"></td>
                  
                  <td scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ proposicion.ID_PROPOSICIONES }}
                </td>
              <td class="px-10 py-4">{{ proposicion.DESCRIPCION }}</td>
              <td class="px-2 py-4">
                {{ proposicion.DESICION }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  
                  <div class="ps-3">
                    <!-- Nombre del miembro -->
                    <div class="text-base font-semibold">{{ proposicion.miembro.NOMBRE }}</div>
                    <!-- Correo del miembro -->
                    <div class="font-normal text-gray-500">{{ proposicion.miembro.users.email }}</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

        <!-- Tabla de Solicitudes -->

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md print:w-full print:overflow-hidden">
    <!-- Header Section -->
          <div class="p-4 border-b dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Solicitudes
              </h2>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Solicitudes pendientes a revisar en la sesión
              </p>
          </div>
          <div class="overflow-x-auto mb-6 rounded-lg print:overflow-visible">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 print:table-fixed print:w-full">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-2 py-3 print:p-1 print:text-xs">ID</th>
                          <th scope="col" class="px-2 py-3 print:p-1 print:text-xs">Dependencia</th>
                          <th scope="col" class="px-2 py-3 print:p-1 print:text-xs">Asunto</th>
                          <th scope="col" class="px-2 py-3 print:p-1 print:text-xs">Decisión</th>
                          <th scope="col" class="px-2 py-3 print:p-1 print:text-xs">Fecha</th>
                          <th scope="col" class="px-2 py-3 print:p-1 print:text-xs">Solicitante</th>
                          <th scope="col" class="px-2 py-3 print:p-1 print:text-xs">Descripción</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(solicitud, index) in solicitudes" :key="solicitud.ID_SOLICITUD"
                          :class="[
                              'bg-white dark:bg-gray-800',
                              index !== solicitudes.length - 1 ? 'border-b dark:border-gray-700' : ''
                          ]"    
                      >
                          <th scope="row" class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white print:p-1 print:text-xs print:break-words">
                              {{ solicitud.ID_SOLICITUD }}
                          </th>
                          <td class="px-2 py-2 print:p-1 print:text-xs print:break-words">
                              {{ solicitud.DEPENDENCIA }}
                          </td>
                          <td class="px-2 py-2 print:p-1 print:text-xs print:break-words">
                              {{ solicitud.ASUNTO }}
                          </td>
                          <td class="px-2 py-2 print:p-1 print:text-xs print:break-words">
                              {{ solicitud.DESICION }}
                          </td>
                          <td class="px-2 py-2 print:p-1 print:text-xs print:break-words">
                              {{ formatDateService.extractDate(solicitud.FECHA_DE_SOLICITUD) }}
                          </td>
                          <td class="px-2 py-2 print:p-1 print:text-xs">
                              <div class="flex items-center">
                                  <div class="ps-1">
                                      <div class="text-base font-semibold print:text-xs">{{ solicitud.solicitante.NOMBRE }}</div>
                                      <div class="font-normal text-gray-500 print:text-xs print:break-words">{{ solicitud.solicitante.EMAIL }}</div>
                                  </div>
                              </div>
                          </td>
                          <td class="px-2 py-2 print:p-1 print:text-xs print:break-words">
                              {{ solicitud.descripcion.EVENTO }}
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>



    </div>
  </div>
</template>

<script setup>
import formatDateService from '@/service/formatDateService';
import router from '@/router';
import { computed, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useSessionStore } from '@/stores/session';
import { useOrderSesion } from '@/stores/orderSesion';
import { usePrintStore } from '@/stores/print';


const sesionStore = useSessionStore();
const orderSesionStore = useOrderSesion();
const printStore = usePrintStore();

const sesionInf = computed(() => sesionStore.getInfoViewSesion())
const listMemberInvited = computed(() => printStore.getListMemberInvited())
const listGuestInvited = computed(() => printStore.getListGuestInvited())
const solicitudes = computed(() => printStore.getListSolicitud())
const listProposiciones = computed(() => printStore.getListProposicion())
const listTareas = computed(() => printStore.getListTask())

const route = useRoute()

const PringPage = () => {
  window.print()
}

const backLayout = () => {
  console.log(route.params.idSesion)
  router.push({ name: 'SesionView', params: { idSesion: route.params.idSesion }})
}

onMounted( async () => {
  sesionStore.fetchSessionById(route.params.idSesion)
  orderSesionStore.getSesionOrderBySesion(route.params.idSesion)
  printStore.fetchListMemberInvited(route.params.idSesion)
  printStore.fetchListGuestInvited(route.params.idSesion)
  printStore.fetchTaskNoPaginate(route.params.idSesion)
  printStore.fetchProposicionNoPaginate(route.params.idSesion)
  printStore.fetchSolicitudNoPaginate(route.params.idSesion)
  
})
</script>