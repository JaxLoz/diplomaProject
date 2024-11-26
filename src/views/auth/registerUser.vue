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
                    <svg v-if="isLoading" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                        
                    
                      {{ isLoading ? 'Registrando..' :'Registra usuario' }}
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

const isLoading = computed(() => authStore.getIsloading())

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