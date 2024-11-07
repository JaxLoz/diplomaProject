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
  import { computed, onMounted, ref } from 'vue';

  const sessionStore = useSessionStore()

  const infoSession = computed(() => sessionStore.sessions)
  const showModal = computed(() => sessionStore.getShowModelSession())
  const showModalResume = computed(() => sessionStore.getShowResumenModalSession())
  const onUpdateModeModal = computed(() => sessionStore.getOnUpdateMode())

  const infoSessionToUpdate = ref({})

  // Método para obtener la información de una sesión para actualizar
const getInfoSessionForUpdate = (idSession) => {
    if (idSession) {
        infoSessionToUpdate.value = sessionStore.getSessionById(idSession);
        sessionStore.setOnUpdateMode(true);  // Cambia a modo de actualización
        sessionStore.setShowModelSession(true);  // Abre el modal
    } else {
        console.error("Error: idSession no definido");
    }
}


  // Método para guardar una nueva sesión o actualizar una existente
const saveSession = async (sessionData) => {
    console.log('Datos de la sesión antes de guardar:', sessionData);
    if (onUpdateModeModal.value) {
        if (sessionData && sessionData.place) {
            await sessionStore.updateSession(infoSessionToUpdate.value.id, sessionData);
        } else {
            console.error('Los datos de la sesión son inválidos:', sessionData);
        }
    } else {
        await sessionStore.createSession(sessionData);
    }
    sessionStore.setShowModelSession(false);
    infoSessionToUpdate.value = {};  // Limpiar el formulario
    sessionStore.setOnUpdateMode(false);
    await sessionStore.fetchSessions();
};



  onMounted(()=>{{
    sessionStore.fetchSessions();
    
  }})
  </script>
