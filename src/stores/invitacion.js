import { defineStore } from "pinia";
import axios from "@/axios";

export const useInvitacionStore = defineStore('invitacion', {
    state: () => ({
        usersWithOutStudents: [],
        guests: [], // se almacenan los posibles invitados
        attendanceRegisterMembers: {}, // almacena a los miembros que se les envio la invitacion
        attendanceRegisterGuests: {}, // almacena a los invitados que se les envio la invitacion
        showErrorAlert: false,
        showSuccessAlert: false,
        dataError: {},
        dataSuccesfull: {},
        isLoading: false
    }),

    actions: {

        getIsloading(){
            return this.isLoading;
        },

        getListGuest(){
            return this.guests;
        },

        getDataSuccesfull(){
            return this.dataSuccesfull
        },

        getDateError(){
            return this.dataError;
        },

        setIsLoading(loading){
            this.isLoading = loading
        },

        setDataError(data){
            this.dataError = {...data};
        },

        setDataSuccesfull(data){
            this.dataSuccesfull = {...data}
        },

        showErrorAlertModal(){
            this.showErrorAlert = true;
        },

        showSuccessAlertModal(){
            this.showSuccessAlert = true;
        },

        hidenSusccessAlertModal(){
            this.showSuccessAlert = false;
            this.dataSuccesfull = {};
        },

        hidenErrorAlertModal(){
            this.showErrorAlert = false;
            this.dataError = {};
        },

        getShowErrorAlert(){
            return this.showErrorAlert;
        },

        getShowSuccessAlert(){
            return this.showSuccessAlert;
        },

        getAttendanceRegisterMembersState(){
            return this.attendanceRegisterMembers;
        },

        getAttendanceRegisterGuestsState(){
            return this.attendanceRegisterGuests;
        },

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
        async registerAsistenciaMiembros(idSesion){
            const response = await axios.requestAxios('asistenciaMiembros/save', 'POST', {
                idSesion: idSesion,
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

            this.usersWithOutStudents = [...InvitadosWithOutStudents]
        },

        //envia la lista de miembros que seran invitados a su respectivo endpoint para registrarlos en la base de datos
        async sendInvitationMembers(idSesion){
            const guestToInvite = this.getGuestInvitation(); // datos que van para AsistenciaInvitados
            const membersToInvite = this.getMemberInvitation(); // datos que van para AsistenciaMiembros

            if(guestToInvite.length > 0){
                const responseGuestInvited = await this.registerAsistenciaInvitados(idSesion, guestToInvite);
                

                if(responseGuestInvited.error){
                    this.setDataError(responseGuestInvited.data);
                    this.showErrorAlertModal(); 
                }else{
                    this.setDataSuccesfull(responseGuestInvited.data)
                    this.showSuccessAlertModal();
                }

                console.log(responseGuestInvited)
            }

            const responseMembersInvited = await this.registerAsistenciaMiembros(idSesion, membersToInvite);

            if(responseMembersInvited.error){
                this.setDataError(responseMembersInvited.data);
                this.showErrorAlertModal();
            }else{
                this.setDataSuccesfull(responseMembersInvited.data)
                this.showSuccessAlertModal();;
            }
  
        },

        async sentInvitationOnlyGuests(idSesion){
            const guestToInvite = this.getGuestInvitation(); // datos que van para AsistenciaInvitados
            
            if(guestToInvite.length > 0){
                this.setIsLoading(true);
                const responseGuestInvited = await this.registerAsistenciaInvitados(idSesion, guestToInvite);
                

                if(responseGuestInvited.error){
                    this.setDataError(responseGuestInvited.data);
                    this.showErrorAlertModal();
                    this.setIsLoading(false); 
                }else{
                    this.setDataSuccesfull(responseGuestInvited.data)
                    this.showSuccessAlertModal();
                    this.setIsLoading(false);
                }

            }else{
                    this.setDataError({message: "No hay invitaciones para enviar"});
                    this.showErrorAlertModal();
            }
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

        // obtener los miembros que se les envio la invitacion
        async getAttendanceRegisterMembers(idSesion, params = ''){
            const response = await axios.requestAxios(`memberInvitedToSesion/${idSesion}?${params}` , 'GET');

            if(!response.error){
                this.attendanceRegisterMembers = response.data.data
            }
        },

        // obtener los invitados que se les envio la invitacion
        async getAttendanceRegisterGuests(idSesion, params = ''){
            const response = await axios.requestAxios(`guestInvitedToSesion/${idSesion}?${params}`, 'GET');

            if(!response.error){
                this.attendanceRegisterGuests = response.data.data
            }
        },

        // Para actualizar el estdo de la asistencia de los miembros que se invitaron
        async updateAttendanceMembers(idSesion, idMiembro, status){
            const response = await axios.requestAxios(`asistenciaMiembros/update/${idSesion}/${idMiembro}`, 'PUT',
                {estadoAsistencia: status}
            );

            this.setDataSuccesfull(response.data)
            this.showSuccessAlertModal()

            if(response.error){
                this.setDataError(response.data)
                this.showErrorAlertModal()
            }
        },

        async updateAttendanceGuests(idSesion, idInvitado, status){
            const response = await axios.requestAxios(`asistenciaInvitados/update/${idSesion}/${idInvitado}`, 'PUT',
                {estadoAsistencia: status}
            );

            this.setDataSuccesfull(response.data)
            this.showSuccessAlertModal()

            if(response.error){
                this.setDataError(response.data)
                this.showErrorAlertModal()
            }
        },

        // para eliminar la invitacion a los miembros que se invitaron

        async deleteAttendanceMembers(idSesion, idMiembro){
           const response = await axios.requestAxios(`asistenciaMiembros/delete/${idSesion}/${idMiembro}`, 'DELETE');
           this.setDataSuccesfull(response.data)
           this.showSuccessAlertModal()

           if(response.error){
               this.setDataError(response.data)
               this.showErrorAlertModal()
           }
        },

        async deleteAttendanceGuests(idSesion, idInvitado){
            const response = await axios.requestAxios(`asistenciaInvitados/delete/${idSesion}/${idInvitado}`, 'DELETE');
            this.setDataSuccesfull(response.data)
            this.showSuccessAlertModal()

            if(response.error){
                this.setDataError(response.data)
                this.showErrorAlertModal()
            }
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