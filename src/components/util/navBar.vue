<template>
  <header class="antialiased">
    
<nav class="fixed top-0 left-0 w-full bg-white border-gray-200 dark:bg-gray-900 z-50">
<div class="max-w-full flex flex-wrap items-center justify-between mx-auto py-4 px-8 border-b dark:border-b-gray-800">
<a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse pt-0">
    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
</a>
<div class="flex items-center md:order-2 space-x-4 md:space-x-4 rtl:space-x-reverse">
    <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
      <span class="sr-only">Open user menu</span>
      <div class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span class="font-medium text-gray-600 dark:text-gray-300">{{ nameNomenclature() }}</span>
        </div>
    </button>

    <button @click.prevent="toggleDarkMode" type="button" class="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5  dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
      
      <svg v-if="isDarkMode" class="w-[16px] h-[16px] text-gray-500 transition duration-75 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z" clip-rule="evenodd"/>
      </svg> 

      <svg v-else class="w-[18px] h-[18px] text-gray-500 transition duration-75 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clip-rule="evenodd"/>
      </svg>

    </button>
    <!-- Dropdown menu -->
    <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
      <div class="px-4 py-3">
        <span class="block text-sm text-gray-900 dark:text-white">{{ profileInf.name }}</span>
        <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ profileInf.mail }}</span>
      </div>
        <ul class="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" @click="logOut" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cerrar sesion</a>
          </li>
        </ul>
      </div>
      <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 " id="navbar-user">
        <h2 class="text-gray-900 rounded-lg dark:text-white font-bold">ManejoActas.com</h2>
        </div>
      </div>
    </nav>
  </header>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import router from '@/router';
import { initFlowbite} from 'flowbite'
import DarkModeService from '@/service/DarkModeService.js'
import stringFormat from '@/service/stringFormat.js';

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()



const profileInf = {
   name:  computed(() => authStore.getProfile().name),
   mail: computed(() =>authStore.getProfile().email),
}


const nameNomenclature = () =>{
  if(sessionStorage.getItem('profile') !== null) {
    const profileSessinStorege = JSON.parse(sessionStorage.getItem('profile'))
    return stringFormat.getAcronymName(profileSessinStorege.name)
  }
}

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  DarkModeService.setDarMode(isDarkMode.value)
  console.log(isDarkMode.value)
}

const logOut = () => {
  router.push({name: 'login'})
  sessionStorage.removeItem('tk')
  sessionStorage.removeItem('profile')
}

onMounted(() => {
  initFlowbite()
  authStore.getInfProfile()
})

</script>
