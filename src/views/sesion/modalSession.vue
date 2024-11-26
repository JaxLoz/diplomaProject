<template>
  <div 
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-900 bg-opacity-50 backdrop-blur-sm"
  >
    <div class="relative w-full max-w-md p-4">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ props.title }}</h3>
          <button 
            type="button" 
            @click="closeModal" 
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Cerrar modal</span>
          </button>
        </div>

        <!-- Modal body -->
        <div class="max-h-[calc(100vh-200px)] overflow-y-auto">
          <form class="p-4 md:p-5" @submit.prevent="submitTask">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <!-- Place input -->
              <div class="col-span-2">
                <fieldForm
                  v-model="dataSession.place"
                  :fieldType="'text'"
                  :label="'Lugar'"
                  :style="'field-model'"
                  :placeholder="'Donde se realizara la sesion?'"
                />
              </div>

              <!-- President input -->
              <div class="col-span-2">
                <fieldForm
                  v-model="dataSession.president"
                  :fieldType="'text'"
                  :label="'Presidente'"
                  :style="'field-model'"
                  :placeholder="'Quien es el responsable?'"
                />
              </div>

              <!-- Secretary input -->
              <div class="col-span-2">
                <fieldForm
                  v-model="dataSession.secretary"
                  :fieldType="'text'"
                  :label="'Secretario'"
                  :style="'field-model'"
                  :placeholder="'Quien es el auxiliar?'"
                />
              </div>

              <!-- Date picker -->
              <div class="col-span-2 relative">
                
                <label for="base-input" class="form-label">Fecha</label>
                <DatePicker 
                  v-model="dataSession.date"
                  dateFormat="yy-mm-dd"
                  placeholder="Cuando se realizara la sesion?"
                  pt:root:class="relative"
                  pt:dropdown:class="absolute right-0 inset-y-0 end-0 pe-3.5"
                  pt:panel:class="calendar-style drop-shadow-md"
                  pt:pcInputText:root:class="field-model"
                  pt:calendar:class="flex flex-col items-center p-4"
                  pt:header:class="flex flex-row items-center justify-around w-full pb-6 pt-2"
                  pt:title:class="flex flex-row gap-4"
                  pt:selectMonth:class="rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500"
                  pt:selectYear:class="rounded-md px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500"
                  pt:pcPrevButton:root:class="flex flex-row items-center h-full w-10 rounded-full p-2 justify-center hover:bg-gray-200 dark:hover:bg-gray-500"
                  pt:pcNextButton:root:class="flex flex-row items-center h-full w-10 rounded-full p-2 justify-center hover:bg-gray-200 dark:hover:bg-gray-500"
                  pt:dayView:class="w-11/12"
                  pt:tableHeaderRow:class="flex flex-row justify-around pb-4"
                  pt:tableBody:class="flex flex-col gap-4 justify-center"
                  pt:tableBodyRow:class="flex flex-row justify-around items-center"
                  pt:dayCell:class="w-10 h-7 text-center"
                  pt:day:class="rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 py-2.5 px-3 cursor-pointer"
                  pt:monthView:class="grid grid-cols-3 grid-rows-4 justify-items-center gap-2 pb-6"
                  pt:month:class="rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 py-2 px-6 cursor-pointer"
                  pt:yearView:class="grid grid-cols-2 grid-rows-5 justify-items-center gap-2 pb-6"
                  pt:year:class="rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 py-2 px-4 cursor-pointer" 
                  showIcon>
                  <template #dropdownicon>
                      <svg class="w-[18px] h-[18px] text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                      </svg>
                  </template>
                </DatePicker>
              </div>

              <!-- Start time picker -->
              <div class="col-span-2 relative">
                <label for="base-input" class="form-label">Hora de Inicio</label>
                <DatePicker
                  v-model="dataSession.startHour"
                  hourFormat="12"
                  pt:root:class="relative"
                  pt:dropdown:class="absolute right-0 inset-y-0 end-0 pe-3.5"
                  pt:panel:class="calendar-style drop-shadow-md"
                  pt:pcInputText:root:class="field-model"
                  pt:timePicker:class="flex flex-row justify-center items-center gap-2 py-2"
                  pt:hourPicker:class="flex flex-col items-center gap-1.5"
                  pt:minutePicker:class="flex flex-col items-center gap-1.5"
                  pt:pcincrementbutton:root:class="flex flex-row items-center rounded-full p-2 justify-center hover:bg-gray-200 dark:hover:bg-gray-500"
                  pt:pcdecrementbutton:root:class="flex flex-row items-center rounded-full p-2 justify-center hover:bg-gray-200 dark:hover:bg-gray-500"
                  pt:pcincrementbutton:label:class="w-0 h-0"
                  pt:pcdecrementbutton:label:class="w-0 h-0"
                  timeOnly
                  showIcon
                  placeholder="A que hora inicia?"
                >
                  <template #dropdownicon>
                    <svg class="w-[18px] h-[18px] text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                    </svg>
                  </template>
                </DatePicker>
              </div>

              
              <div class="col-span-2">
                <searchField
                  v-if="!onUpdateMode"
                  v-model="search"
                  :listItems="dataSearched"
                  :label="'Invitados'"
                  :placeholder="'Buscar invitados'"
                  :style="'field-model'"
                  @itemSelected="addGuest"
                />
              </div>

              <!-- List component -->
              <div class="col-span-2">
                <listComponent
                  :label="''"
                  :style="'field-model'"
                  :elements="guests"
                  @deleteItem="deleteItem"
                />
              </div>
            </div>

            
            <button 
              @click.prevent="buttonAction" 
              type="submit" 
              class="text-white inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <svg v-if="isLoading" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                    
                <svg v-else class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    {{ isLoading ? (onUpdateMode ? "Actualizando..." : "Creando...") : (onUpdateMode ? "Actualizar sesión" : "Crear sesión") }}
            </button>
          </form>
        </div>
      </div>
    </div>

    
    <div class="flex flex-col fixed bottom-0 right-0 m-4 z-[70]">
      <AlertsModal
        v-if="sessionStore.getShowSuccessAlert()"
        :message="sessionStore.getDataSuccesfull()"
        :typeAlert="'succesfull'"
        @closeAlert="sessionStore.hidenSusccessAlertModal()"
      />

      <AlertsModal
        v-if="invitacionStore.getShowSuccessAlert()"
        :message="invitacionStore.getDataSuccesfull()"
        :typeAlert="'succesfull'"
        @closeAlert="invitacionStore.hidenSusccessAlertModal()"
      />

      <AlertsModal
        v-if="actasStore.getShowSuccessAlert()"
        :message="actasStore.getDataSuccesfull()"
        :typeAlert="'succesfull'"
        @closeAlert="actasStore.hidenSusccessAlertModal()"
      />

      <AlertsModal
        v-if="sessionStore.getShowErrorAlert()"
        :message="sessionStore.getDateError()"
        :typeAlert="'error'"
        @closeAlert="sessionStore.hidenErrorAlertModal()"
      />

      <AlertsModal
        v-if="invitacionStore.getShowErrorAlert()"
        :message="invitacionStore.getDateError()"
        :typeAlert="'error'"
        @closeAlert="invitacionStore.hidenErrorAlertModal()"
      />

      <AlertsModal
        v-if="actasStore.getShowErrorAlert()"
        :message="actasStore.getDateError()"
        :typeAlert="'error'"
        @closeAlert="actasStore.hidenErrorAlertModal()"
      />
    </div>
  </div>
</template>
<script setup>
import DatePicker from 'primevue/datepicker';
import fieldForm from '@/components/util/fieldForm.vue'
import searchField from '@/components/util/searchField.vue';
import listComponent from '@/components/util/listComponent.vue';
import formatDateService from '@/service/formatDateService';
import AlertsModal from '@/components/util/AlertsModal.vue';

import { useSessionStore } from '@/stores/session'
import { useInvitacionStore } from '@/stores/invitacion';
import { useActaStore } from '@/stores/actas';
import { computed, onMounted, ref } from 'vue';


// Inicialización de los stores
const sessionStore = useSessionStore()
const invitacionStore = useInvitacionStore()
const actasStore = useActaStore()

// Variables computadas
const guests = computed(() => invitacionStore.guests)
const onUpdateMode = computed(() => sessionStore.getOnUpdateMode())
const dataSearched = computed(() => invitacionStore.searchGuest(search.value))
const isLoading = computed(() => sessionStore.getIsloading())

// Variables reactivas
const search = ref("");
const dataSession = ref({
  IDSESION: null,
  place: "",
  president: "",
  secretary: "",
  date: "",
  startHour: "",
  endHour:"00:00"
})

// Hooks de ciclos de vida

onMounted(() => {

  if (sessionStore.getOnUpdateMode()){
    console.log("guau",props.infoToUpdate)
    dataSession.value.IDSESION = props.infoToUpdate.IDSESION
    dataSession.value.place = props.infoToUpdate.LUGAR
    dataSession.value.president = props.infoToUpdate.PRESIDENTE
    dataSession.value.secretary = props.infoToUpdate.SECRETARIO
    dataSession.value.date = formatDateService.extractDate(props.infoToUpdate.FECHA).toString()
    dataSession.value.startHour = formatDateService.extractHour(props.infoToUpdate.HORARIO_INICIO).toString()
    dataSession.value.endHour = formatDateService.extractHour(props.infoToUpdate.HORARIO_FINAL)

    formatDateService.getHourFromString(props.infoToUpdate.HORARIO_INICIO)
  }

  invitacionStore.getUserWithOutStudents();

})

// Props, emits, models
const props = defineProps({
  title: { type: String, required: true, default: "titulo del modal" },
  infoToUpdate: { type: Object, required: false, default: () => ({}) }
});

// Métodos
const buttonAction = () => {
  if (onUpdateMode.value) {
    updateSession();
  } else {
    createSession();
  }
};

const createSession = async () => {
  
  dataSession.value.date = formatDateService.extractDate(dataSession.value.date) // extracion de la fecha yyyy-mm-dd
  dataSession.value.startHour = formatDateService.extractHour(dataSession.value.startHour)
  sessionStore.setIsLoading(true)
  const responseSesionCreated = await sessionStore.createSession(dataSession.value)
  

  if(responseSesionCreated.isCreated){
    await invitacionStore.sendInvitationMembers(responseSesionCreated.dataCreated.data.data.sesion.IDSESION)
    await actasStore.createActa(responseSesionCreated.dataCreated.data.data.sesion.IDSESION)
    await sessionStore.fetchSessions()
    console.log("dejando de cargar")
    sessionStore.setIsLoading(false)
  }else{
    console.log("no se pudo crear")
    sessionStore.setIsLoading(false)
  }
  
}

const updateSession = async () => {
  console.log("Actualizando sesion");

  dataSession.value.date = formatDateService.extractDate(dataSession.value.date);
  dataSession.value.startHour = formatDateService.extractHour(dataSession.value.startHour);
  
  sessionStore.setIsLoading(true)
  const responseSesionUpdated = await sessionStore.updateSession(dataSession.value);

  if (responseSesionUpdated.isUpdated) {
    
    await sessionStore.fetchSessions();
    sessionStore.setIsLoading(false)
  }else{
    sessionStore.setIsLoading(false)
  }
};


const closeModal = () => {

  sessionStore.hidenErrorAlertModal();
  sessionStore.hidenSusccessAlertModal();

  sessionStore.setShowModelSession(false);
  sessionStore.setOnUpdateMode(false);
  invitacionStore.cleanGuestsList();
};

const addGuest = (member) => {
  invitacionStore.addGuest(member);
};

const deleteItem = (guest) => {
  invitacionStore.removeGuest(guest);
};

</script>