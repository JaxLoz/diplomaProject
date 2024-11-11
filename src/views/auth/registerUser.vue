<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 p-4 overflow-auto">
      <div class="container mx-auto flex items-center justify-center min-h-screen py-8">
        <div class="w-1/3 min-w-[300px] bg-white dark:bg-gray-700 rounded-lg shadow-lg">
          <div class="px-6 py-8">
            <div class="text-center mb-8">
              <h1 class="text-gray-900 dark:text-white text-3xl font-semibold">Registro</h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">crea una nueva cuenta</p>
            </div>
        
            <div>  
              <form class="space-y-6" @submit.prevent="">
                <div class="space-y-6">
                  <div>
                    <label for="roles" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Rol
                    </label>
                    <select 
                        v-model="registerData.rol"
                      id="roles" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Seleccione un rol</option>
                      <option value="secretario">Secretario</option>
                      <option value="miembro">Miembro</option>
                      <option value="invitado">Invitado</option>
                      <option value="estudiante">Estudiante</option>
                      <option value="coordinador">Coordinador</option>
                    </select>
                  </div>
                  
                  <div>
                    <fieldForm
                    v-model="registerData.nombre"
                      :idElement="'nombre-field'"
                      :fieldType="'text'" 
                      :label="'Nombre'"
                      :style="'field-model'"
                      :placeholder="'Ingrese su nombre completo'"
                    />
                  </div>
  
                  <div>
                    <fieldForm 
                    v-model="registerData.cargo"
                      :idElement="'cargo-field'"
                      :fieldType="'text'" 
                      :label="'Cargo'"
                      :style="'field-model'"
                      :placeholder="'Cual es su cargo?'"
                    />
                  </div>
  
                  <div>
                    <fieldForm 
                        v-if="registerData.rol === 'estudiante' || registerData.rol === 'invitado'"
                        v-model="registerData.dependencia"
                      :idElement="'dependencia-field'"
                      :fieldType="'text'" 
                      :label="'Dependencia'"
                      :style="'field-model'"
                      :placeholder="'Ingrese su dependencia si aplica'"
                    />
                  </div>
  
                  <div>
                    <fieldForm 
                    v-model="registerData.email"
                      :idElement="'email-field'"
                      :fieldType="'email'" 
                      :label="'Correo'"
                      :style="'field-model'"
                      :placeholder="'name@correo.com'"
                    />
                  </div>
  
                  <div>
                    <fieldForm 
                    v-model="registerData.password"
                      :idElement="'password-field'"
                      :fieldType="'password'" 
                      :label="'Contraseña'"
                      :style="'field-model'"
                      :placeholder="'Ingrese su contraseña'"
                    />
                  </div>
  
                  <div>
                    <fieldForm 
                    v-model="registerData.password_confirmation"
                      :idElement="'password-confirmation-field'"
                      :fieldType="'password'" 
                      :label="'Confirmar contraseña'"
                      :style="'field-model'"
                      :placeholder="'Confirme su contraseña'"
                    />
                  </div>
  
                  <div>
                    <button 
                      @click.prevent="registerUser" 
                      type="submit" 
                      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {{ 'Registra usuario' }}
                    </button>
                  </div>
  
                  <div>
                    <div class="flex justify-center items-center gap-x-1">
                      <p class="text-sm text-gray-500 dark:text-gray-400">ya tienes una cuenta?</p>
                      <router-link 
                        to="login" 
                        class="text-lg font-semibold text-gray-700 dark:text-gray-400 hover:text-blue-800 dark:hover:text-gray-200"
                      >
                        Incia sesion
                      </router-link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
          <AlertModal class="absolute bottom-0" 
            v-if="showErrorAlertModal"
            :message="messageError"
            :typeAlert="'error'"
            @closeAlert="authStore.hidenErrorAlertModal()"
           />

           <AlertModal class="absolute bottom-0" 
            v-if="showSuccesfullAlertModal"
            :message="messageSuccesfull"
            :typeAlert="'Succesfull'"
            @closeAlert="authStore.hidenSusccessAlertModal()"
           />

      </div>
    </div>

    

  </template>
<script setup>
import fieldForm from '@/components/util/fieldForm.vue';
import { computed, onBeforeUnmount, ref } from 'vue';
import AlertModal from '@/components/util/AlertsModal.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

const showErrorAlertModal = computed(() => authStore.getShowErrorAlert())
const showSuccesfullAlertModal = computed(() => authStore.getShowSuccessAlert())

const messageError = computed(() => authStore.getDateError())
const messageSuccesfull = computed(() => authStore.getDataSuccesfull())

const registerData = ref({
  rol: '',
  nombre: '',
  cargo: '',
  dependencia: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const registerUser = () => {
    authStore.register(registerData.value)
    console.log(registerData.value)
}

onBeforeUnmount(() => {
  if(showErrorAlertModal.value){
    authStore.hidenErrorAlertModal()
  }
  if(showSuccesfullAlertModal.value){
    authStore.hidenSusccessAlertModal()
  }
})

</script>