<template>    
  <div class="content overflow-hidden">
    <div class="overflow-x-auto w-full">
      <sesionTabla 
        :data="infoSession"
        @updateSession="getInfoSessionForUpdate"
        @viewSession="console.log('view')"
      />
    </div>
    
    <!-- Modal para crear o actualizar sesión -->
    <modalSession
      v-if="showModal"  
      :title="!onUpdateModeModal ? 'Nueva sesión' : 'Actualizar sesión'"
      :infoToUpdate="!onUpdateModeModal ? {} : infoSessionToUpdate"
      @saveSession="saveSession"
    />

    <modalResumeSession v-if="showModalResume"/>
  </div>
</template>

<script setup>
import sesionTabla from '@/components/sesion/sesionTabla.vue'
import modalSession from '@/views/sesion/modalSession.vue'
import modalResumeSession from './modalResumeSession.vue';

import { useSessionStore } from '@/stores/session'
import { computed, ref } from 'vue';

const sessionStore = useSessionStore()

const infoSession = computed(() => sessionStore.sessions)
const showModal = computed(() => sessionStore.getShowModelSession())
const showModalResume = computed(() => sessionStore.getShowResumenModalSession())
const onUpdateModeModal = computed(() => sessionStore.getOnUpdateMode())

const infoSessionToUpdate = ref({})

// Método para obtener la información de una sesión para actualizar
const getInfoSessionForUpdate = (idSession) => {
    infoSessionToUpdate.value = sessionStore.getSessionByid(idSession)
    sessionStore.setOnUpdateMode(true)  // Cambia a modo de actualización
    sessionStore.setShowModelSession(true)  // Abre el modal
}

// Método para guardar una nueva sesión o actualizar una existente
const saveSession = async (sessionData) => {
    if (onUpdateModeModal.value) {
        // Lógica para actualizar la sesión
        await sessionStore.updateSession(infoSessionToUpdate.value.id, sessionData)
    } else {
        // Crear una nueva sesión
        await sessionStore.createSession(sessionData)
    }
    // Cerrar el modal después de guardar
    sessionStore.setShowModelSession(false)
    infoSessionToUpdate.value = {}  // Limpiar el formulario
    sessionStore.setOnUpdateMode(false)
}
</script>
