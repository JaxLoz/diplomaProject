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
      <SesionEspecifico :sesionInf="infoSesion" />
      <!-- Tabla de actas de la sesión  -->
      <ActaEspecifico />
      <!-- Tabla de asistentes de la sesión -->
      <AsistenteEspecifico :invitedMemberInf="attendanceRegisterMembers" :invitedGuestInf="attendanceRegisterGuests" :sesionInf="infoSesion"/>
      <!-- Tabla de encargados de Tareas y Tareas  -->
      <TareaEspecifico />
      <!-- Tabla de solicitudes -->
      <SolicitudesEspecifico />
      <!-- Tabla de proposiciones  -->
      <ProposicionesEspecificos />
    </div>
  </div>
</template>

<script setup>
import SesionEspecifico from '@/components/sesion/SesionVistaEspecifica/SesionEspecifico.vue'
import AsistenteEspecifico from '@/components/sesion/SesionVistaEspecifica/AsistenteEspecifico.vue'
import ActaEspecifico from '@/components/sesion/SesionVistaEspecifica/ActaEspecifico.vue'
import TareaEspecifico from '@/components/sesion/SesionVistaEspecifica/TareaEspecifico.vue'
import SolicitudesEspecifico from '@/components/sesion/SesionVistaEspecifica/SolicitudesEspecifico.vue'
import ProposicionesEspecificos from '@/components/sesion/SesionVistaEspecifica/ProposicionesEspecificos.vue'

import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useSessionStore } from '@/stores/session.js'
import { useInvitacionStore } from '@/stores/invitacion'
//import { useActaStore } from '@/stores/actas.js';

const route = useRoute()
const sesionStore = useSessionStore()
const invitacionStore = useInvitacionStore()
//const ActaStore = useActaStore()

const infoSesion = computed(() => sesionStore.getInfoViewSesion())
const attendanceRegisterMembers = computed(() =>invitacionStore.getAttendanceRegisterMembersState())
const attendanceRegisterGuests = computed(() => invitacionStore.getAttendanceRegisterGuestsState())
//const infoActa = computed(() => ActaStore.actas)

onMounted(() => {
  sesionStore.fetchSessionById(route.params.idSesion)
  invitacionStore.getAttendanceRegisterMembers(route.params.idSesion)
  invitacionStore.getAttendanceRegisterGuests(route.params.idSesion)
})
</script>
