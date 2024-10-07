
<template>
  <Teleport to="body">

    <div v-if="showModal" 
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
                      :fieldType="'text'" 
                      :label="'Lugar'"
                      :style="'field-model'"
                      :placeholder="'Donde se realizara la sesion?'"/>
                    </div>
                    <div class="col-span-2">
                      <fieldForm 
                      :fieldType="'text'" 
                      :label="'Presidente'"
                      :style="'field-model'"
                      :placeholder="'Quien es el responsable?'"
                      />
                    </div>
                    <div class="col-span-2">
                      <fieldForm 
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
                      :label="'Hora de inicio'" 
                      :style="'block w-full p-2.5 leading-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'" />
                    </div>

                    <div class="col-span-1">
                      <timePicket 
                      :label="'Hora de fin'" 
                      :style="'block w-full p-2.5 leading-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'" />
                    </div>

                    <div class="col-span-2">
                      <searchField
                      :searchInfo="members"
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
            <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            {{ 'Crear Sesion' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</Teleport>
</template>
<script setup>
import datepickedComponent from '@/components/util/datepickedComponent.vue'
import fieldForm from '@/components/util/fieldForm.vue'
import timePicket from '@/components/util/timePicket.vue';
import searchField from '@/components/util/searchField.vue';
import listComponent from '@/components/util/listComponent.vue';

import { useSessionStore } from '@/stores/session'
import { useInvitacionStore } from '@/stores/invitacion';
import { computed } from 'vue';

const sessionStore = useSessionStore()
const invitacionStore = useInvitacionStore()

const members = computed(() => invitacionStore.members)
const guests = computed(() => invitacionStore.guests)


const dataSession = {
  date: ""
}

const showModal = computed(() => sessionStore.getShowModelSession())
console.log(showModal.value)

const props = defineProps({
    title: {type: String, Required: true, Default: "titulo del modal"},
})

//Metodos

const closeModal = () => {
    sessionStore.setShowModelSession(false)
    invitacionStore.cleanGuestsList()
}

const addGuest = (member) => {
    invitacionStore.addGuest(member)
}

const deleteItem = (guest) => {
  invitacionStore.removeGuest(guest)
}


</script>