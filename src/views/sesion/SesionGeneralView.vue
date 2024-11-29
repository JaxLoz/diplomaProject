<template>
  <!-- Contenedor de Breadcrumb -->
  <div class="title">
  <!-- Título -->
  <h2 class="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
    Act Manager Sesión
  </h2>

  <button 
    :disabled="(profile?.rol != 'coordinador' && profile?.rol != 'secretario' && profile?.rol != 'miembro')"
    @click.prevent="toPringPage"
    type="submit" 
    class="w-10 h-10 flex items-center justify-center text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-400 disabled:hover:cursor-not-allowed disabled:hover:opacity-50"
  >
    <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
      :profile="profile"
      />
      
      <!-- Tabla de actas de la sesión  -->
      <ActaEspecifico 
      @updateStateOfActa="actionsWhereActStatusChange"
      :profile="profile"
      />
      
      <!-- Tabla de orden de la sesión -->
       <OrdenSesionEspecifico
       :orderSesionInf="orderSesionInf"
       :sesionInf="infoSesion"
       :profile="profile"
       />

      <!-- Tabla de asistentes de la sesión -->
      <AsistenteEspecifico 
      :invitedMemberInf="attendanceRegisterMembers" 
      :invitedGuestInf="attendanceRegisterGuests" 
      :sesionInf="infoSesion"
      :actStatus="statusActa"
      :profile="profile"
      />
      <!-- Tabla de encargados de Tareas y Tareas  -->
      <TareaEspecifico
      :tareaInf="infoTarea.data"
      :encargadoInf="infoEncargado.data " 
       :sesionInf="infoSesion"
       :profile="profile"
      />
      <!-- se le coloca .data esos de arriba para poder paginar -->

      <!-- Prompt para la tarea  -->
      <!-- Tabla de solicitudes -->
      <SolicitudesEspecifico 
        :sesionInf="infoSesion"
        :profile="profile"
      />
      <!-- Tabla de proposiciones  -->
      <ProposicionesEspecificos 
        :sesionInf="infoSesion"
        :profile="profile"
      />
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
import { useAuthStore } from '@/stores/auth';
import router from '@/router'

const route = useRoute()
const sesionStore = useSessionStore()
const invitacionStore = useInvitacionStore()
const tareaStore = useTareaStore();
const orderSesionStore = useOrderSesion();
const authStore = useAuthStore()

const statusActa = ref('')

const infoSesion = computed(() => sesionStore.getInfoViewSesion())
const attendanceRegisterMembers = computed(() =>invitacionStore.getAttendanceRegisterMembersState())
const attendanceRegisterGuests = computed(() => invitacionStore.getAttendanceRegisterGuestsState())
const orderSesionInf = computed(() => orderSesionStore.getOrderSesion())
const profile = computed(() => authStore.getProfile())
//Para tarea

const infoTarea = computed(() => tareaStore.tarea)
const infoEncargado = computed(() => tareaStore.infoEncargadosTareasAmostrar)

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
  tareaStore.getMembersSesion(route.params.idSesion,"Asistio");
  tareaStore.showTarea(route.params.idSesion); //tareas relacionadas con una sesión 
})
</script>
