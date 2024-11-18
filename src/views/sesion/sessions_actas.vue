<template>    
  <div class="content overflow-hidden">
    <div class="flex flex-col gap-6 items-center">
      <div class="overflow-x-auto w-full">
        <sesionTabla 
        :sesionInf="infoSession"
        @updateSession="getInfoSessionForUpdate"
        @deleteSesionSelected="deleteSesion"
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

    <modalDeleteAlert 
    ref="deleteModal"
    :infSesionToRemove="removeSesionInf"
    @confirmAction="confirmDeleteSesion"
    @cancelAction="closemodalDeleteAlert"
    />
    
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
  import modalDeleteAlert from './modalDeleteAlert.vue';
  import paginationBar from '@/components/util/paginationBar.vue';
  import urlService from '@/service/urlService.js';

  import { Modal } from 'flowbite';
  import { useSessionStore } from '@/stores/session'
  import { computed, onMounted, ref, useTemplateRef} from 'vue';

  const sessionStore = useSessionStore()

  const infoSession = computed(() => sessionStore.sessions)
  const showModal = computed(() => sessionStore.getShowModelSession())
  const showModalResume = computed(() => sessionStore.getShowResumenModalSession())
  const onUpdateModeModal = computed(() => sessionStore.getOnUpdateMode())

  const infoSessionToUpdate = ref({})
  const params = ref({})
  const removeSesionInf = ref({}) 
  const modalInstance = ref(null)
  const targetElement = useTemplateRef('deleteModal');
  
  const optionsModal = {
      placement: 'center',
      backdrop: 'static',
      backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40 backdrop-blur-sm',
      closable: false
  }

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

const closemodalDeleteAlert = () => {
  modalInstance.value.hide()
}

const confirmDeleteSesion = () => {
  modalInstance.value.hide()
}

const deleteSesion = (infoSesion) => {
  removeSesionInf.value = infoSesion
  modalInstance.value.show()

}

onMounted(() => {
  modalInstance.value = new Modal(targetElement.value.target, optionsModal);
  sessionStore.fetchSessions();
})

</script>
  

  