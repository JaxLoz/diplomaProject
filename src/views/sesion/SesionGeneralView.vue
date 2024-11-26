<template>
  <!-- Contenedor de Breadcrumb -->
  <div class="title">
  <!-- Título -->
  <h2 class="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
    Act Manager Sesión
  </h2>

  <button 
    @click.prevent="toPringPage"
    type="submit" 
    class="w-10 h-10 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <svg v-if="isLoading" aria-hidden="true" role="status" class="w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    <svg v-else class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
    </svg>
  </button>
</div>
  <!-- Contenedor Primario -->
  <div class="centro">
    <!-- Contenedor secudario -->
    <div class="centro2">
      <!-- Tabla de sesión -->
      <SesionEspecifico 
      :sesionInf="infoSesion" 
      :actStatusTarea="statusActa"
      />
      
      <!-- Tabla de actas de la sesión  -->
      <ActaEspecifico 
      @updateStateOfActa="actionsWhereActStatusChange"
      />
      
      <!-- Tabla de orden de la sesión -->
       <OrdenSesionEspecifico
       :orderSesionInf="orderSesionInf"
       :sesionInf="infoSesion"
       />

      <!-- Tabla de asistentes de la sesión -->
      <AsistenteEspecifico 
      :invitedMemberInf="attendanceRegisterMembers" 
      :invitedGuestInf="attendanceRegisterGuests" 
      :sesionInf="infoSesion"
      :actStatus="statusActa"
      />
      <!-- Tabla de encargados de Tareas y Tareas  -->
      <TareaEspecifico
      :tareaInf="infoTarea"/> <!-- Prompt para la tarea  -->
      <!-- Tabla de solicitudes -->
      <SolicitudesEspecifico />
      <!-- Tabla de proposiciones  -->
      <ProposicionesEspecificos />
    </div>
  </div>
</template>

<script setup>

// Importaciones 
import SesionEspecifico from '@/components/sesion/SesionVistaEspecifica/SesionEspecifico.vue'
import AsistenteEspecifico from '@/components/sesion/SesionVistaEspecifica/AsistenteEspecifico.vue'
import ActaEspecifico from '@/components/sesion/SesionVistaEspecifica/ActaEspecifico.vue'
import TareaEspecifico from '@/components/sesion/SesionVistaEspecifica/TareaEspecifico.vue'
import SolicitudesEspecifico from '@/components/sesion/SesionVistaEspecifica/SolicitudesEspecifico.vue'
import ProposicionesEspecificos from '@/components/sesion/SesionVistaEspecifica/ProposicionesEspecificos.vue'
import OrdenSesionEspecifico from '@/components/sesion/SesionVistaEspecifica/OrdenSesionEspecifico.vue'
import formatDateService from '@/service/formatDateService'

import { computed, onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'
import { useSessionStore } from '@/stores/session.js'
import { useInvitacionStore } from '@/stores/invitacion'
import { useTareaStore } from '@/stores/tarea'
import { useOrderSesion } from '@/stores/orderSesion';
import router from '@/router'

const route = useRoute()
const sesionStore = useSessionStore()
const invitacionStore = useInvitacionStore()
const tareaStore = useTareaStore();
const orderSesionStore = useOrderSesion();

const statusActa = ref('')

const infoSesion = computed(() => sesionStore.getInfoViewSesion())
const attendanceRegisterMembers = computed(() =>invitacionStore.getAttendanceRegisterMembersState())
const attendanceRegisterGuests = computed(() => invitacionStore.getAttendanceRegisterGuestsState())
const orderSesionInf = computed(() => orderSesionStore.getOrderSesion())

//Para tarea

const infoTarea = computed(() => tareaStore.getInfoViewTarea())

const actionsWhereActStatusChange = (actaStatus) => {

  statusActa.value = actaStatus
  if (actaStatus === 'aprobada' || actaStatus === 'rechazada') { 
  
    // Acciones que competen a la sesion segun el estado del acta
    const currenHour = formatDateService.getCurrentHour();
    sesionStore.updateHourEndSession(infoSesion.value, currenHour)
    sesionStore.fetchSessionById(route.params.idSesion)

    
  } 
}

const toPringPage = () =>{
  router.push({name: 'printPage', params: {idSesion: route.params.idSesion}})
}

onMounted(() => {
  sesionStore.fetchSessionById(route.params.idSesion)
  orderSesionStore.getSesionOrderBySesion(route.params.idSesion)
  invitacionStore.getAttendanceRegisterMembers(route.params.idSesion)
  invitacionStore.getAttendanceRegisterGuests(route.params.idSesion)
})
</script>
