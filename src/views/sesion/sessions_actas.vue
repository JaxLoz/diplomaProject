<template>    
  <div class="content overflow-hidden">
    <div class="flex flex-col gap-6 items-center">
      <div class="overflow-x-auto w-full">
        <sesionTabla 
        :sesionInf="infoSession"
        @updateSession="getInfoSessionForUpdate"
        />
      </div>

      <div>
        <paginationBar
        :pages="infoSession"
        :size="'base'"
        @change-page="changePage"
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
  import urlService from '@/service/urlService.js';

  import { useSessionStore } from '@/stores/session'
  import { computed, onMounted, ref } from 'vue';

  const sessionStore = useSessionStore()

  const infoSession = computed(() => sessionStore.sessions)
  const showModal = computed(() => sessionStore.getShowModelSession())
  const showModalResume = computed(() => sessionStore.getShowResumenModalSession())
  const onUpdateModeModal = computed(() => sessionStore.getOnUpdateMode())

  const infoSessionToUpdate = ref({})
  const params = ref({})

const getInfoSessionForUpdate = (sesionInf) => {
  console.log(sesionInf)
    infoSessionToUpdate.value = sesionInf
}


const changePage = (numPage) => {
  params.value.page = numPage
  const stringParams = urlService.getParamsFromUrl(params.value)
  sessionStore.fetchSessions(stringParams)
  console.log(stringParams)
}

onMounted(() => {
  sessionStore.fetchSessions();
})

</script>
  

  