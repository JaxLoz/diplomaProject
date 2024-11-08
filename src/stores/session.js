import { defineStore } from "pinia";
import axios from "@/axios";

export const useSessionStore = defineStore("sesion", {
    state: () => ({
        sessions: [],
        showModalSession: false,
        showResumenModalSession: false,
        onUpdateMode: false,
    }),
    actions: {
        // async submitTask() {
        //     try {
        //         const response = await axios.post('http://127.0.0.1:8000/api/sesion/save', {
        //             LUGAR: this.dataSession.LUGAR,
        //             FECHA: this.dataSession.FECHA,
        //             HORARIO_INICIO: this.dataSession.HORARIO_INICIO,
        //             HORARIO_FINAL: this.dataSession.HORARIO_FINAL,
        //             PRESIDENTE: this.dataSession.PRESIDENTE,
        //             SECRETARIO: this.dataSession.SECRETARIO,
        //         });
        //         console.log('Sesion creada con éxito', response.data);
        //     } catch (error) {
        //         console.error('Error al crear la sesión:', error.response ? error.response.data : error.message);
        //     }
        // },
        
        async fetchSessions() {
            try {
                const response = await axios.requestAxios('/sesion/all','GET');
                this.sessions = response.data.sesion;
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
            console.log(response);
            return response;
    
        },
        

        async updateSession(id, sessionData) {
            console.log("ID de sesión en updateSession:", id);
            console.log("Datos de sesión en updateSession:", sessionData);
        
            if (!id) {
                console.error("Error: ID de sesión no proporcionado en updateSession");
                return null;
            }
            console.log("sessionData antes de llamar a updateSession", sessionData);
        
            try {
                if (!sessionData || !sessionData.place) {
                    console.error("Datos inválidos para la sesión:", sessionData);
                    return;  // Detener la ejecución si los datos no son válidos
                }
        
                // Realizar la solicitud PUT utilizando requestAxios
                const response = await axios.requestAxios(`/sesion/update/${id}`, 'PUT', {
                    LUGAR: sessionData.place,
                    FECHA: sessionData.date,
                    HORARIO_INICIO: sessionData.startHour,
                    HORARIO_FINAL: sessionData.endHour,
                    PRESIDENTE: sessionData.president,
                    SECRETARIO: sessionData.secretary
                });
        
                // Verificar si hubo un error en la respuesta
                if (response.error) {
                    console.error("Error en la respuesta de la API:", response.data);
                    return null;  // En caso de error, retornamos null
                }
        
                console.log("Sesión actualizada:", response.data);
        
                // Actualizar la sesión en el arreglo local
                const updatedSession = response.data;
        
                this.sessions = this.sessions.map(session =>
                    session.IDSESION === id ? updatedSession : session
                );
        
                return updatedSession;  // Devuelve la sesión actualizada
        
            } catch (error) {
                console.error("Error inesperado:", error.message);
                return null;
            }
        }
        
        
        ,

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
