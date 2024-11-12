<template>    
  <div class="content overflow-hidden">
    <div class="flex flex-col gap-6 items-center">
      <div class="overflow-x-auto w-full">
      <sesionTabla 
      :data="infoSession.data"
      @updateSession="getInfoSessionForUpdate"
      @viewSession="console.log('view')"
      />
    </div>
    <div>
      <paginationBar
      :links="infoSession.links"
      />
    </div>
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
  import paginationBar from '@/components/util/paginationBar.vue';

  import { useSessionStore } from '@/stores/session'
  import { computed, onMounted, ref } from 'vue';

  const sessionStore = useSessionStore()

  const infoSession = computed(() => sessionStore.sessions)
  const showModal = computed(() => sessionStore.getShowModelSession())
  const showModalResume = computed(() => sessionStore.getShowResumenModalSession())
  const onUpdateModeModal = computed(() => sessionStore.getOnUpdateMode())

  const infoSessionToUpdate = ref({})

const getInfoSessionForUpdate = (sesionInf) => {
  console.log(sesionInf)
    infoSessionToUpdate.value = sesionInf
}

onMounted(() => {
  sessionStore.fetchSessions();
})

</script>
  

  