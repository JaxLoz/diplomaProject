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
</script>