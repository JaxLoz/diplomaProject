<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4 space-y-8">
        <!-- Tabla de Miembros del Comité -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <!-- Header Section -->
            <div class="p-4 border-b dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Asistentes de miembros del comité
                </h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Asistentes de la sesión
                </p>
            </div>

            <!-- Tabla Miembros -->
            <div class="overflow-x-auto flex flex-col items-center">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4"></th>
                            <th scope="col" class="p-4">ID</th>
                            <th scope="col" class="px-4 py-3">Asistente</th>
                            <th scope="col" class="px-4 py-3">Cargo</th>
                            <th scope="col" class="px-4 py-3">Asistencia</th>
                            <th v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
                                scope="col" class="px-4 py-3">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in props.invitedMemberInf.data" 
                            :key="member.miembro_id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="w-4 p-4"></td>
                            <td class="w-4 p-4">{{member.miembro_id}}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-3">
                                    <div class="flex-shrink-0 w-10 h-10 inline-flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-600">
                                        <span class="font-medium text-gray-600 dark:text-gray-300">
                                            {{ stringFormat.getAcronymName(member.nombre) }}
                                        </span>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-900 dark:text-white">
                                            {{ member.nombre }}
                                        </div>
                                        <div class="text-sm text-gray-500">{{ member.email }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3">{{ member.cargo }}</td>
                            <td class="px-4 py-3">
                                <!-- Estado de asistencia cuando el acta no está pendiente -->
                                <div v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO != 'pendiente'"
                                     class="flex items-center gap-2">
                                    <div :class="[
                                        'h-2.5 w-2.5 rounded-full',
                                        member.asistencia == 'Asistio' ? 'bg-green-500' : 'bg-red-500'
                                    ]"></div>
                                    <span>{{member.asistencia != 'Pendiente' ? member.asistencia : 'No asistio'}}</span>
                                </div>
                                <!-- Selector de asistencia cuando el acta está pendiente -->
                                <select v-else-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
                                        v-model="member.asistencia"
                                        @change="updateStatusMember(props.sesionInf.IDSESION, member.miembro_id, member.asistencia)"
                                        class="w-full max-w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Asistio">Asistió</option>
                                    <option value="No asistio">No asistió</option>
                                </select>
                            </td>
                            <td v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
                                class="px-4 py-3">
                                <button @click="deleteMemberInvited(props.sesionInf.IDSESION, member.miembro_id)"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700">
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                 <!-- Paginación -->
                <div class="p-4">
                    <paginationBar
                        :pages="props.invitedMemberInf"
                        :size="'small'"
                        @change-page="changePageTableMember"
                    />
                </div>
            </div>
        </div>

        <!-- Tabla de Invitados -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <!-- Header Section -->
            <div class="p-4 border-b dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Asistentes de invitados a la sesión
                </h2>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Invitados a la sesión
                </p>
            </div>

            <div 
            v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
            class="p-4 border-b dark:border-gray-700 flex flex-row gap-4">
                <button
                    @click="openModal"
                    type="button"
                    class="inline-flex items-center justify-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Invitar
                </button>
            </div>

            <!-- Tabla Invitados -->
            <div class="overflow-x-auto flex flex-col items-center">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4"></th>
                            <th scope="col" class="px-4 py-3">ID</th>
                            <th scope="col" class="px-4 py-3">Asistente</th>
                            <th scope="col" class="px-4 py-3">Cargo</th>
                            <th scope="col" class="px-4 py-3">Asistencia</th>
                            <th v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
                                scope="col" class="px-4 py-3">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="guest in props.invitedGuestInf.data" 
                            :key="guest.invitado_id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                            <td class="w-4 p-4"></td>
                            <td class="w-4 p-4">{{ guest.invitado_id }}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-3">
                                    <div class="flex-shrink-0 w-10 h-10 inline-flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-600">
                                        <span class="font-medium text-gray-600 dark:text-gray-300">
                                            {{ stringFormat.getAcronymName(guest.nombre) }}
                                        </span>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-900 dark:text-white">
                                            {{ guest.nombre }}
                                        </div>
                                        <div class="text-sm text-gray-500">{{ guest.email }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3">{{ guest.cargo }}</td>
                            <td class="px-4 py-3">
                                <div v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO != 'pendiente'"
                                     class="flex items-center gap-2">
                                    <div :class="[
                                        'h-2.5 w-2.5 rounded-full',
                                        guest.asistencia == 'Asistio' ? 'bg-green-500' : 'bg-red-500'
                                    ]"></div>
                                    <span>{{guest.asistencia != 'Pendiente' ? guest.asistencia : 'No asistio'}}</span>
                                </div>
                                <select v-else-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
                                        v-model="guest.asistencia"
                                        @change="updateStatusGuest(props.sesionInf.IDSESION, guest.invitado_id, guest.asistencia)"
                                        class="w-full max-w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Asistio">Asistió</option>
                                    <option value="No asistio">No asistió</option>
                                </select>
                            </td>
                            <td v-if="props.sesionInf.actas?.length > 0 && props.sesionInf.actas[0].ESTADO == 'pendiente'"
                                class="px-4 py-3">
                                <button @click="deleteGuestInvited(props.sesionInf.IDSESION, guest.invitado_id)"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700">
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- Paginación -->
                <div class="p-4">
                    <paginationBar
                        :pages="props.invitedGuestInf"
                        :size="'small'"
                        @change-page="changePageTableGuest"
                    />
                </div>
            </div>
        </div>
    </div>
    <ModalAsistenciaInviados
        ref="asistenciaModalMain"
         @closeModal="closeModal"
    />
</template>
<script setup>
import stringFormat from '@/service/stringFormat';
import paginationBar from '@/components/util/paginationBar.vue';
import urlService from '@/service/urlService';
import ModalAsistenciaInviados from './ModalAsistenciaInviados.vue';
import { useInvitacionStore } from '@/stores/invitacion';
import { Modal } from 'flowbite';
import { ref, watch, onMounted, useTemplateRef } from 'vue';

const targetModal = useTemplateRef('asistenciaModalMain');
const modalIntance = ref(null);

const optionsModal = {
      placement: 'center',
      backdrop: 'static',
      backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40 backdrop-blur-sm',
      closable: false
  }

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

const openModal = () => {
    invitacionStore.getUserWithOutStudents();
    modalIntance.value.show();
}

const closeModal = () => { 
    modalIntance.value.hide();
    invitacionStore.cleanGuestsList();
    invitacionStore.hidenErrorAlertModal();
    invitacionStore.hidenSusccessAlertModal();
}

onMounted (() => {
    modalIntance.value = new Modal(targetModal.value.targetModal, optionsModal);
    console.log(targetModal.value.targetModal)
})

</script>