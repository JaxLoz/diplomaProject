<template>
    <div
    tabindex="-1" 
    aria-hidden="true" 
    class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ props.title }}</h3>
          <button type="button" @click="closeModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Cerrar modal</span>
                  </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5" @submit.prevent="submitTask">
                  <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                      <fieldForm
                      v-model="dataSession.place" 
                      :fieldType="'text'" 
                      :label="'Lugar'"
                      :style="'field-model'"
                      :placeholder="'Donde se realizara la sesion?'"/>
                    </div>

                    <div class="col-span-2">
                      <fieldForm
                      v-model="dataSession.president" 
                      :fieldType="'text'" 
                      :label="'Presidente'"
                      :style="'field-model'"
                      :placeholder="'Quien es el responsable?'"
                      />
                    </div>
                    <div class="col-span-2">
                      <fieldForm 
                      v-model="dataSession.secretary"
                      :fieldType="'text'" 
                      :label="'Secretario'"
                      :style="'field-model'"
                      :placeholder="'Quien es el auxiliar?'"
                      />
                    </div>

                    <div class="col-span-2">
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

                    

                    <div class="col-span-2">
                      <label for="base-input" class="form-label">Hora de Inicio</label>
                      <DatePicker
                      
                      v-model="dataSession.startHour"
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
                      v-model="search"
                      :searchInfo="members"
                      :listItems="dataSearched"
                      :label="'Invitados'"
                      :placeholder="'Buscar invitados'"
                      :style="'field-model'"
                      @itemSelected="addGuest"
                      />
                    </div>
                    
                    <div class="col-span-2">
                      <listComponent 
                      :label="''"
                      :style="'field-model'"
                      :elements="guests"
                      @deleteItem="deleteItem"
                      />
                    </div>

            </div>
            <button @click.prevent="buttonAction" type="submit" class="text-white inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg v-if="!onUpdateMode" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
              </svg>
              <svg v-else class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
              </svg>
            {{ onUpdateMode ? 'Actualizar sesion' :'Crear Sesion' }}
          </button>
        </form>
      </div>
    </div>
  </div>

</template>
<script setup>
import DatePicker from 'primevue/datepicker';
import fieldForm from '@/components/util/fieldForm.vue'
import searchField from '@/components/util/searchField.vue';
import listComponent from '@/components/util/listComponent.vue';
import formatDateService from '@/service/formatDateService';
import axios from 'axios'

import { useSessionStore } from '@/stores/session'
import { useInvitacionStore } from '@/stores/invitacion';
import { computed, onMounted, ref } from 'vue';

// Inicialización de los stores
const sessionStore = useSessionStore()
const invitacionStore = useInvitacionStore()

// Variables computadas
const members = computed(() => invitacionStore.usersWithOutStudents)
const guests = computed(() => invitacionStore.guests)
const onUpdateMode = computed(() => sessionStore.getOnUpdateMode())
const dataSearched = computed(() => invitacionStore.searchGuest(search.value))

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
    console.log(props.infoToUpdate)
    dataSession.value.place = props.infoToUpdate.LUGAR
    dataSession.value.president = props.infoToUpdate.PRESIDENTE
    dataSession.value.secretary = props.infoToUpdate.SECRETARIO
    dataSession.value.date = formatDateService.extractDate(props.infoToUpdate.FECHA)
    dataSession.value.startHour = formatDateService.extractHour(props.infoToUpdate.HORARIO_INICIO)
    dataSession.value.endHour = formatDateService.extractHour(props.infoToUpdate.HORARIO_FINAL)
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
  if (!validateFields()) return;
  if (onUpdateMode.value) {
    updateSession();
  } else {
    createSession();
  }
};

const createSession = async () => {
  
  dataSession.value.date = formatDateService.extractDate(dataSession.value.date) // extracion de la fecha yyyy-mm-dd
  dataSession.value.startHour = formatDateService.extractHour(dataSession.value.startHour) // extracion de la hora hh:mm
  const responseSesionCreated = await sessionStore.createSession(dataSession.value)
  
  if(responseSesionCreated.status >= 200){
    await sessionStore.fetchSessions()
    await invitacionStore.sendInvitationMembers(responseSesionCreated.data.sesion.IDSESION)
  }
  
}

const updateSession = () => {
  console.log("Actualizando sesion")
}

const closeModal = () => {
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