<template>    
  <div class="content overflow-hidden">
    <div class="overflow-x-auto w-full">
      <sesionTabla 
      :data="infoSession"
      @updateSession="getInfoSessionForUpdate"
      @viewSession="console.log('view')"
      />
    </div>
    <modalSession
      v-if="showModal"  
    :title="!onUpdateModeModal ? 'Nueva sesion' : 'Actualizar sesion'"
    :infoToUpdate="!onUpdateModeModal ? {} : infoSessionToUpdate"
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

const getInfoSessionForUpdate = (idSession) => {
    infoSessionToUpdate.value = sessionStore.getSessionByid(idSession) //informacion de la acta para actualizar
}

</script>
  

  