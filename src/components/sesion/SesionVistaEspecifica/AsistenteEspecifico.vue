<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-1 my-1 py-3">
<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md">
    <caption class="p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 rounded-t-lg">
        Asistentes de miembros del comite   
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Asistentes de la sesión</p>
    </caption>
</table>

    <div class="createAction">
         <!-- Boton de creación de solicitud  -->
          <!---->
        <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <!--<button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Invitar</button>-->
        <!-- Search para busqueda de solicitudes  -->
        
    </div>
    </div>    
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                </th>
                <th scope="col" class="px-1 py-3">
                    Asistente
                </th>
                <th scope="col" class="px-6 py-3">
                    Cargo
                </th>
                <th scope="col" class="px-6 py-3">
                    Asistencia
                </th>
                <th v-if="props.sesionInf.actas && props.sesionInf.actas.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'" scope="col" class="px-6 py-3">
                    Acción
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="member in props.invitedMemberInf.data" :key="member.miembro_id"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="w-4 p-4">
                     
                </td>
                <th scope="row" class="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span class="font-medium text-gray-600 dark:text-gray-300">{{ stringFormat.getAcronymName(member.nombre) }}</span>
                    </div>
                    <div class="ps-3">
                        <div class="text-base font-semibold">{{ member.nombre }}</div>
                        <div class="font-normal text-gray-500">{{ member.email }}</div>
                    </div>  
                </th>
                <td class="px-6 py-4">
                    {{ member.cargo }}
                </td>
                <td class="px-2 py-4">
                    
                    <div v-if="props.sesionInf.actas && props.sesionInf.actas.length > 0 && props.sesionInf.actas[0].ESTADO != 'pendiente'" class="flex items-center">
                        <div :class="member.asistencia == 'Asistio' ? 'bg-green-500 h-2.5 w-2.5 rounded-full me-2' : 'bg-red-500 h-2.5 w-2.5 rounded-full me-2'"></div> <span>{{member.asistencia != 'Pendiente' ? member.asistencia : 'No asistio'}}</span>
                    </div>

                    <form v-else-if="props.sesionInf.actas && props.sesionInf.actas.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'" class="mx-auto">
                          <select v-model="member.asistencia"
                          @change="updateStatusMember(props.sesionInf.IDSESION, member.miembro_id, member.asistencia)" 
                          id="asistenciaMiembros" 
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="Pendiente">Pendiente</option>
                            <option value="Asistio">Asistió</option>
                            <option value="No asistio">No asistió</option>
                      </select>
                    </form>
                    
                </td>
                <td v-if="props.sesionInf.actas && props.sesionInf.actas.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'" class="px-6 py-4">
                    <!-- Modal toggle -->
                    <div class="centroAction">                    
                        <button @click="deleteMemberInvited(props.sesionInf.IDSESION, member.miembro_id)" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Borrar</button>
                    </div>
                </td>
                
            </tr>
            
        </tbody>
    </table>

    <br>
    <paginationBar
    :pages="props.invitedMemberInf"
    :size="'small'"
    @change-page="changePageTableMember"
    />

    <!--Seccion para la asistencia de los invitados-->
    <br>

    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md">
    <caption class="p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 rounded-t-lg">
        Asistentes de invitados a la sesion   
        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Invitados a la sesion</p>
    </caption>
</table>

    <div class="createAction">
         <!-- Boton de creación de solicitud  -->
          <!---->
        <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <!--<button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Invitar</button>-->
        <!-- Search para busqueda de solicitudes  -->
        
    </div>
    </div>    
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden shadow-md">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                </th>
                <th scope="col" class="px-1 py-3">
                    Asistente
                </th>
                <th scope="col" class="px-6 py-3">
                    Cargo
                </th>
                <th scope="col" class="px-6 py-3">
                    Asistencia
                </th>
                <th v-if="props.sesionInf.actas && props.sesionInf.actas.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'" scope="col" class="px-6 py-3">
                    Acción
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="guest in props.invitedGuestInf.data" :key="guest.invitado_id"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="w-4 p-4">
                     
                </td>
                <th scope="row" class="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span class="font-medium text-gray-600 dark:text-gray-300">{{ stringFormat.getAcronymName(guest.nombre) }}</span>
                    </div>
                    <div class="ps-3">
                        <div class="text-base font-semibold">{{ guest.nombre }}</div>
                        <div class="font-normal text-gray-500">{{ guest.email }}</div>
                    </div>  
                </th>
                <td class="px-6 py-4">
                    {{ guest.cargo }}
                </td>
                <td class="px-2 py-4">

                    <div v-if="props.sesionInf.actas && props.sesionInf.actas.length > 0 && props.sesionInf.actas[0].ESTADO != 'pendiente'" class="flex items-center">
                        <div :class="guest.asistencia == 'Asistio' ? 'bg-green-500 h-2.5 w-2.5 rounded-full me-2' : 'bg-red-500 h-2.5 w-2.5 rounded-full me-2'"></div> <span>{{guest.asistencia != 'Pendiente' ? guest.asistencia : 'No asistio'}}</span>
                    </div>
                    
                    <form v-else-if="props.sesionInf.actas && props.sesionInf.actas.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'" class="mx-auto">
                          <select v-model="guest.asistencia"
                          @change="updateStatusGuest(props.sesionInf.IDSESION, guest.invitado_id, guest.asistencia)" 
                          id="asistenciaMiembros" 
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="Pendiente">Pendiente</option>
                            <option value="Asistio">Asistió</option>
                            <option value="No asistio">No asistió</option>
                      </select>
                    </form>
                    
                </td>
                <td v-if="props.sesionInf.actas && props.sesionInf.actas.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'" class="px-6 py-4">
                    <!-- Modal toggle -->
                    <div class="centroAction">                    
                        <button @click="deleteGuestInvited(props.sesionInf.IDSESION, guest.invitado_id)" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Borrar</button>
                    </div>
                </td>
                
            </tr>
            
        </tbody>
    </table>

    <br>
    <paginationBar
    :pages="props.invitedGuestInf"
    :size="'small'"
    @change-page="changePageTableGuest"
    />
   
</div>
</template>
<script setup>
import stringFormat from '@/service/stringFormat';
import paginationBar from '@/components/util/paginationBar.vue';
import urlService from '@/service/urlService';
import { useInvitacionStore } from '@/stores/invitacion';
import { watch } from 'vue';

const invitacionStore = useInvitacionStore()
const props = defineProps({
    invitedMemberInf: {type: Object, required: true, default: new Object()},
    invitedGuestInf: {type: Object, required: true, default: new Object()},
    sesionInf: {type: Object, required: true, default: new Object()},
    actStatus: {type: String, required: true, default: ''}
})

watch(() => props.actStatus, (newValueStatusAct) => {
    if(newValueStatusAct == 'aprobada' || newValueStatusAct == 'rechazada'){
        props.invitedGuestInf.data.map((guest) => {
            updateStatusGuest(props.sesionInf.IDSESION, guest.invitado_id, guest.asistencia != 'Pendiente' ? guest.asistencia : 'No asistio')
        })

        props.invitedMemberInf.data.map((member) => {
            updateStatusMember(props.sesionInf.IDSESION, member.miembro_id, member.asistencia != 'Pendiente' ? member.asistencia : 'No asistio' )
        })
    }
})

// Metodos para la seccion de asistencia de miembros

const updateStatusMember = async (idSesion, idMiembro, status) => {
    await invitacionStore.updateAttendanceMembers(idSesion, idMiembro, status)
}

const changePageTableMember = (numPage) => {
    const StringParams = urlService.getParamsFromUrl({page: numPage})
    invitacionStore.getAttendanceRegisterMembers(props.sesionInf.IDSESION, StringParams)
}

const deleteMemberInvited = async (idSesion, idMiembro) => {
    await invitacionStore.deleteAttendanceMembers(idSesion, idMiembro)
    invitacionStore.getAttendanceRegisterMembers(idSesion)
}

// Metodos para la seccion de asistencia de invitados

const updateStatusGuest = async (idSesion, idInvitado, status) => {
    await invitacionStore.updateAttendanceGuests(idSesion, idInvitado, status)
}

const changePageTableGuest = (numPage) => {
    const StringParams = urlService.getParamsFromUrl({page: numPage})
    invitacionStore.getAttendanceRegisterGuests(props.sesionInf.IDSESION, StringParams)
}

const deleteGuestInvited = async (idSesion, idInvitado) => {
    await invitacionStore.deleteAttendanceGuests(idSesion, idInvitado)
    invitacionStore.getAttendanceRegisterGuests(idSesion)
}

</script>