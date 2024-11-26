<template>
  <!-- Contenedor de Breadcrumb -->
  <div class="title">
    <!-- Titutlo -->
    <h2
      class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white"
    >
      Act Manager Sesión
    </h2>
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
      <!-- Tabla de asistentes de la sesión -->
      <AsistenteEspecifico 
      :invitedMemberInf="attendanceRegisterMembers" 
      :invitedGuestInf="attendanceRegisterGuests" 
      :sesionInf="infoSesion"
      :actStatus="statusActa"
      />
      <!-- Tabla de encargados de Tareas y Tareas  -->
      <TareaEspecifico
      :tareaInf="infoTarea.data"
      :encargadoInf="infoEncargado.data " 
      />
      <!-- se le coloca .data esos de arriba para poder paginar -->

      <!-- Prompt para la tarea  -->
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
import formatDateService from '@/service/formatDateService'

import { computed, onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'
import { useSessionStore } from '@/stores/session.js'
import { useInvitacionStore } from '@/stores/invitacion'
import { useTareaStore } from '@/stores/tarea'

const route = useRoute()
const sesionStore = useSessionStore()
const invitacionStore = useInvitacionStore()
const tareaStore = useTareaStore();

const statusActa = ref('')

const infoSesion = computed(() => sesionStore.getInfoViewSesion())
const attendanceRegisterMembers = computed(() =>invitacionStore.getAttendanceRegisterMembersState())
const attendanceRegisterGuests = computed(() => invitacionStore.getAttendanceRegisterGuestsState())

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

onMounted(() => {
  sesionStore.fetchSessionById(route.params.idSesion)
  invitacionStore.getAttendanceRegisterMembers(route.params.idSesion)
  invitacionStore.getAttendanceRegisterGuests(route.params.idSesion)
  tareaStore.getMembersSesion(route.params.idSesion,"Asistio");
  tareaStore.showTarea(route.params.idSesion); //tareas relacionadas con una sesión 
})
</script>
