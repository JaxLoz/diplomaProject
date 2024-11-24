<template>
    <div class="titleSesion">
<!-- Titutlo -->
<h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Sesiones</h2>

</div>
    <div class="relative overflow-y-auto shadow-md sm:rounded-lg">
       <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
           <div>
               <button @click="openModal" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Crear Acta</button>
           </div>
           <label for="table-search" class="sr-only">Search </label>
           <div class="relative">
               <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                   <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                   </svg>
               </div>
               <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar tarea por sesion">
           </div>
       </div>
       <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                   
                   <th scope="col" class="px-6 py-3">
                       ID
                   </th>
                   <th scope="col" class="px-6 py-3">
                       Presidente
                   </th>
   
                   <th scope="col" class="px-6 py-3">
                       Secretario
                   </th>
   
                   <th scope="col" class="px-6 py-3">
                       Lugar
                   </th>

                   <th scope="col" class="px-6 py-3">
                       Fecha
                   </th>

                   <th scope="col" class="px-6 py-3">
                       Hora de inicio
                   </th>
                   <th scope="col" class="px-6 py-3">
                       hora de fin
                   </th>
   
                   <th scope="col" class="px-6 py-3">
                      
                   </th>
                   
               </tr>
           </thead>
           <tbody>
   
           <tr v-for="element in props.sesionInf.data" :key="element.IDSESION" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               <td class="px-6 py-4">
                   {{ element.IDSESION}}
               </td>
       
               <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                   <div class="flex items-center">
                       <div class="ps-3">
                           <div class="text-base font-semibold">{{ element.PRESIDENTE }}</div>
                       </div>
                   </div>  
               </td>
       
               <td scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                   <div class="flex items-center">
                       <div class="ps-3">
                           <div class="text-base font-semibold">{{ element.SECRETARIO }}</div>
                           
                       </div>
                   </div>  
               </td>
               <td class="px-6 py-4">{{ element.LUGAR }}</td>
                <td class="px-6 py-4">{{ formatDateService.extractDate(element.FECHA) }}</td>
                <td class="px-6 py-4">{{ formatDateService.extractHour(element.HORARIO_INICIO) }}</td>
                <td class="px-6 py-4">{{ formatDateService.extractHour(element.HORARIO_FINAL) }}</td>


   
               <td class="px-6 py-4">
                   <div class="flex flex-row justify-between items-center gap-1.5">   
                       <!--Ver-->
                       <div>
                           <router-link :to="{name: 'SesionView', params: {idSesion: element.IDSESION} }" class="cursor-pointer w-[18px] h-[18px] icon-button" aria-hidden="true">
                           
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                               <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                           </svg>
                           </router-link>
                       </div>

                       <!--Editar-->
                       <div v-if="element.actas && element.actas.length > 0 && element.actas[0].ESTADO == 'pendiente'">
                           <svg @click="updateSession(element)" class="w-[20px] h-[20px] icon-button cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                               <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                               <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                           </svg>
                       </div>

                       <!--Eliminar sesion-->
                       <div>
                            <svg @click="deleteSesionSelected(element)" class="icon-button cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                            </svg>
                       </div>
                   </div>
   
               </td>
   </tr>
               
           </tbody>
       </table>
   
       
   </div>
   
   </template>
   
   <script setup>
   import formatDateService from '@/service/formatDateService';
   import {onMounted } from 'vue';
   import { initFlowbite } from 'flowbite';
   import { useSessionStore } from '@/stores/session';
   
   
   const sessionStore = useSessionStore();
   
   const props = defineProps({
    sesionInf: {type: Object, required: true, default: new Object()}
   })

   const emit = defineEmits(['updateSession', 'deleteSesionSelected']);

   onMounted(() => {
       initFlowbite();
   });
   
   const openModal = () => {
       sessionStore.setShowModelSession(true);
   };

   const updateSession = (sesionInf) => {
        sessionStore.setOnUpdateMode(true);
        openModal();
        emit('updateSession', sesionInf);
   }

   const deleteSesionSelected = (sesionInf) => {
       emit('deleteSesionSelected', sesionInf);
   }

   
   </script>