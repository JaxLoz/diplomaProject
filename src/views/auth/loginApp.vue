<template>
    <div class="dark:bg-gray-900 bg-white flex flex-col min-h-screen items-center justify-center font-sans p-4">
        <form class="px-8 pt-9 pb-5 bg-white rounded-lg shadow dark:bg-gray-700 flex flex-col gap-y-4 drop-shadow-lg w-1/4 min-w-[300px]" @submit.prevent="login">
            <div class="text-center">
                <h1 class="text-gray-900 dark:text-white text-3xl mb-5 font-semibold" >Inicio de sesión</h1>
            </div>    
            <div class="flex flex-col gap-y-2">
                <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                    <div class="flex">
                        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        </span>
                        <input v-model="loginData.email" type="email" id="correo-field" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@correo.com">
                    </div>
            </div>

            <div class="flex flex-col gap-y-2">
                <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                    <div class="flex">
                        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                            </svg>
                        </span>
                        <input v-model="loginData.password" type="password" id="password-field" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese su contraseña">
                    </div>
            </div>

            <div class="flex flex-row">
                <button class="w-full text-white inline-flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
                    <svg v-if="isLoading" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                      {{ isLoading ? 'Iniciando sesión..' :'Iniciar sesión' }}
                </button>
            </div>
            <div class="flex flex-row justify-center gap-x-1 items-baseline mt-3" >
                <p class="block text-sm text-gray-500 dark:text-gray-400" >aún no tiene cuenta?</p>
                <router-link to="register" class="block font-semibold text-gray dark:text-gray-400 hover:text-blue-800 dark:hover:text-gray-200" >Registrarte</router-link>
            </div>
        </form>
        <AlertModal class="absolute bottom-0" 
        v-if="showAlertModal"
        :message="messageError"
        :typeAlert="'error'"
        @closeAlert="closedAlertError"
        />
    </div>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

import AlertModal from '@/components/util/AlertsModal.vue';

const authStore = useAuthStore()

const isLoading = computed(() => authStore.getIsloading())

const showAlertModal = computed(() => authStore.getShowErrorAlert())
const messageError = computed(() => authStore.getDateError())

const loginData = ref({
    email: '',
    password: ''
})

const login = async () => {
    await authStore.login(loginData.value)
    
    if(sessionStorage.getItem('tk')) {
        router.push({name: 'sesion'})
    }
}

const closedAlertError = () => {
    authStore.hidenErrorAlertModal()
}

onMounted(() => {
    if(sessionStorage.getItem('profile')){
        sessionStorage.removeItem('profile')
    }
    if(sessionStorage.getItem('tk')) {
        sessionStorage.removeItem('tk')
    }
})

onBeforeUnmount(() => {
    if(showAlertModal.value){
       authStore.hidenErrorAlertModal()
    }
})

</script>
