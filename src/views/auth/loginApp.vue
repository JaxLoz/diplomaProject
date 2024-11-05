<template>
    <div class="dark:bg-gray-900 bg-white flex flex-col min-h-screen items-center justify-center font-sans p-4">
        <form class="px-8 pt-9 pb-5 bg-white rounded-lg shadow dark:bg-gray-700 flex flex-col gap-y-4 drop-shadow-lg w-1/4 min-w-[300px]" @submit.prevent="login">
            <div class="text-center">
                <h1 class="text-gray-900 dark:text-white text-3xl mb-5 font-semibold" >Login</h1>
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
                <button class="w-full text-white inline-flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Login</button>
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
