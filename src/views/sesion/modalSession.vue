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
                      <datepickedComponent 
                      v-model="dataSession.date" 
                      :title="'Fecha de la sessión'" 
                      :label="'Fecha'" 
                      :placeholder="'Cuendo sera la session?'"
                      :style="'block w-full ps-10 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'"
                      />
                    </div>

                    <div class="col-span-1">
                      <timePicket
                      v-model="dataSession.startHour" 
                      :label="'Hora de inicio'" 
                      :style="'block w-full p-2.5 leading-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'" />
                    </div>

                    <div class="col-span-1">
                      <timePicket 
                      v-model="dataSession.endHour"
                      :label="'Hora de fin'" 
                      :style="'block w-full p-2.5 leading-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'" />
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
import datepickedComponent from '@/components/util/datepickedComponent.vue'
import fieldForm from '@/components/util/fieldForm.vue'
import timePicket from '@/components/util/timePicket.vue';
import searchField from '@/components/util/searchField.vue';
import listComponent from '@/components/util/listComponent.vue';

import { useSessionStore } from '@/stores/session'
import { useInvitacionStore } from '@/stores/invitacion';
import { useMiembrosStore } from '@/stores/miembros';
import { computed, onMounted, ref } from 'vue';


// Inicializacion de los stores
const sessionStore = useSessionStore()
const invitacionStore = useInvitacionStore()
const membersStore = useMiembrosStore()

// Variables computadas
const members = computed(() => invitacionStore.members)
const guests = computed(() => invitacionStore.guests)
const onUpdateMode = computed(() => sessionStore.getOnUpdateMode())
const dataSearched = computed(() => membersStore.searchMember(search.value))

// Variables reactivas
const search = ref("") // referencia del v-model del componente searchField
const dataSession = ref({
  place: "",
  president: "",
  secretary: "",
  date: "",
  startHour: "",
  endHour: ""
})
let id = 1

// Hooks de ciclos de vida

onMounted(() => {
  if (sessionStore.getOnUpdateMode()){
    dataSession.value.place = props.infoToUpdate.place
    dataSession.value.president = props.infoToUpdate.president
    dataSession.value.secretary = props.infoToUpdate.secretary
    dataSession.value.date = props.infoToUpdate.date
    dataSession.value.startHour = props.infoToUpdate.startHour
    dataSession.value.endHour = props.infoToUpdate.endHour
  }
})

// Props, emits, models
const props = defineProps({
    title: {type: String, Required: true, Default: "titulo del modal"},
    infoToUpdate: {type: Object, Required: false, Default: {}}
})

//Metodos

const buttonAction = () => {
  !onUpdateMode.value ? createSession() : updateSession()
}

const createSession = () => {
  
  dataSession.value.id = id++;
  sessionStore.addNewSession(dataSession.value)
}

const updateSession = () => {
  console.log("Actualizando sesion")
}

const closeModal = () => {
    sessionStore.setShowModelSession(false)
    sessionStore.setOnUpdateMode(false)
    invitacionStore.cleanGuestsList()
}

const addGuest = (member) => {
    invitacionStore.addGuest(member)
}

const deleteItem = (guest) => {
  invitacionStore.removeGuest(guest)
}


</script>