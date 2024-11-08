import { defineStore } from "pinia";
import axios from "@/axios";

export const useInvitacionStore = defineStore('invitacion', {
    state: () => ({
        usersWithOutStudents: [],
        guests: [] // se almacenan los posibles invitados
    }),

    actions: {

        //busca los invitados que no son estudiantes en la base de datos
        async getInvitadosWithAoutStudents(){
            const invitadosResponse = await axios.requestAxios('/invitado/InvitadosWithOutStudents', 'GET')
            console.log(invitadosResponse.data)
            return invitadosResponse.data
        },

        //busca los miembros en la base de datos
        async getMiembros(){
            const miembrosResponse = await axios.requestAxios('miembro/allInf', 'GET')
            console.log(miembrosResponse.data)

            return miembrosResponse.data
        },

        //registra las invitaciones para AsistenciaMiembros
        async registerAsistenciaMiembros(idSesion, listMembers){
            const response = await axios.requestAxios('asistenciaMiembros/save', 'POST', {
                idSesion: idSesion,
                listMiembros: [...listMembers]
            })

            return response
        },

        //registra las invitaciones para AsistenciaInvitados
        async registerAsistenciaInvitados(idSesion, listGuests){
            const response = await axios.requestAxios('asistenciaInvitados/save', 'POST', {
                idSesion: idSesion, 
                listInvitados: [...listGuests]
            })

            return response
        },

        // se crea un arreglo con la combinacion de los miembros e invitados que se recupareron de la base de datos
        async getUserWithOutStudents(){
            const InvitadosWithOutStudents = await this.getInvitadosWithAoutStudents();
            const miembros = await this.getMiembros();

            this.usersWithOutStudents = [...miembros, ...InvitadosWithOutStudents]
        },

        //envia la lista de miembros que seran invitados a su respectivo endpoint para registrarlos en la base de datos
        async sendInvitationMembers(idSesion){
            const guestToInvite = this.getGuestInvitation(); // datos que van para AsistenciaInvitados
            const membersToInvite = this.getMemberInvitation(); // datos que van para AsistenciaMiembros

            if(guestToInvite.length > 0 && membersToInvite.length > 0){
                const responseGuestInvited = await this.registerAsistenciaInvitados(idSesion, guestToInvite);
                const responseMembersInvited = await this.registerAsistenciaMiembros(idSesion, membersToInvite);

                console.log(responseGuestInvited)
                console.log(responseMembersInvited)
            }else if(guestToInvite.length > 0){
                const responseGuestInvited = await this.registerAsistenciaInvitados(idSesion, guestToInvite);
                console.log(responseGuestInvited)
            }else if(membersToInvite.length > 0){
                const responseMembersInvited = await this.registerAsistenciaMiembros(idSesion, membersToInvite);
                console.log(responseMembersInvited)
            }

            console.log(guestToInvite)
            console.log(membersToInvite)
        },
         
        // esto extrae los miembros que se han seleccionado para la invitacion que estan en la variable guests
        getMemberInvitation(){
            const members = this.guests.filter(guest => Object.keys(guest).includes('id_miembro'))
            return members;
        },

        // esto extrae los invitados que se han seleccionado para la invitacion que estan en la variable guests
        getGuestInvitation(){
            const invGuests = this.guests.filter(guest => Object.keys(guest).includes('id_invitado'))
            return invGuests;
        },

        
        searchGuest(searchInfo) {
            if(searchInfo !== undefined && searchInfo !== '') {
                const userGuest = this.usersWithOutStudents.filter(user => {
                    return user.NOMBRE.toLowerCase().includes(searchInfo.toLowerCase()) || user.email.includes(searchInfo)
                 })
                 return userGuest
            }
        },

        addGuest(guest){
               const guestExisted = this.guests.find(guestExist => guestExist.id == guest.id)
               console.log(guestExisted)
               if(guestExisted === undefined){
                this.guests = [...this.guests, guest]
               }
               
        },

        removeGuest(guestDelete){
            const indexForDelete = this.guests.findIndex(guest => guest.id == guestDelete.id)
            console.log(indexForDelete)
            this.guests.splice(indexForDelete, 1)
        },

        cleanGuestsList(){
            this.guests = []
        }
    }
})