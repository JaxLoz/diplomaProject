import { defineStore } from "pinia";
import axios from "@/axios";

export const useSessionStore = defineStore("sesion", {
    state: () => ({
        sessions: [],
        showModalSession: false,
        showResumenModalSession: false,
        onUpdateMode: false,
        showErrorAlert: false,
        showSuccessAlert: false,
        dataError: {},
        dataSuccesfull: {}
    }),
    actions: {
        
        getDataSuccesfull(){
            return this.dataSuccesfull
        },

        getDateError(){
            return this.dataError;
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

        async fetchSessions(params = '') {
            try {
                const response = await axios.requestAxios('/sesion/all?'+params,'GET');
                this.sessions = response.data.sesion;
                console.log(this.sessions)
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        },

        async getSessionById(id) {
            if (!id) {
                throw new Error('ID de sesión no proporcionado');
            }
            try {
                const response = await axios.requestAxios(`/sesion/${id}`, 'GET');
                return response.data;
            } catch (error) {
                console.error("Error fetching session by ID:", error);
                throw error;
            }
        }
        
        ,
        async createSession(sessionData) {
           
            const response = await axios.requestAxios('/sesion/save','POST', {
                LUGAR: sessionData.place,
                FECHA: sessionData.date,
                HORARIO_INICIO: sessionData.startHour,
                HORARIO_FINAL: sessionData.endHour,
                PRESIDENTE: sessionData.president,
                SECRETARIO: sessionData.secretary
            });

            

            if(response.error){
                this.setDataError(response.data);
                this.showErrorAlertModal()
            }else{
                this.setDataSuccesfull(response.data);
                this.showSuccessAlertModal();
            }

            return response;
    
        },
        

        async updateSession(sessionData) {
                const id = sessionData.IDSESION;  // Asegúrate de que el ID esté aquí
            
                const response = await axios.requestAxios(`/sesion/update/${id}`, 'PUT', {
                    LUGAR: sessionData.place,
                    FECHA: sessionData.date,
                    HORARIO_INICIO: sessionData.startHour,
                    HORARIO_FINAL: sessionData.endHour,
                    PRESIDENTE: sessionData.president,
                    SECRETARIO: sessionData.secretary
                });
        
                

                if (response.error) {
                    console.error("Error en la respuesta de la API:", response.data);
                    this.showErrorAlertModal();
                    this.setDataError(response.data); // Mostrar la alerta de error
                }else{
                    this.showSuccessAlertModal();
                    this.setDataSuccesfull(response.data);
                }
        
                //console.log("Sesión actualizada:", response);
                return response;
        
        },

        async deleteSession(id) {
            try {
                await axios.delete(`/sesion/delete/${id}`);
                this.sessions = this.sessions.filter(session => session.IDSESION !== id);
            } catch (error) {
                console.error("Error deleting session:", error);
            }
        },

        addNewSession(session) {
            this.sessions = [{...session}, ...this.sessions];
        },

        setShowModelSession(value) {
            this.showModalSession = value;
        },

        setShowResumenModalSession(value) {
            this.showResumenModalSession = value;
        },

        setOnUpdateMode(value) {
            this.onUpdateMode = value;
        },

        getShowModelSession() {
            return this.showModalSession;
        },

        getShowResumenModalSession() {
            return this.showResumenModalSession;
        },

        getOnUpdateMode() {
            return this.onUpdateMode;
        }
    }
});
