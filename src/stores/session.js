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
            try {
                const response = await axios.get(`/sesion/${id}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching session by ID:", error);
                return null;
            }
        },
        async createSession(sessionData) {
            // if (!sessionData || !sessionData.nombre || !sessionData.fechaInicio) {
            //     console.error("Error: sessionData is incomplete");
            //     return null;
            // }
        const response = await axios.requestAxios('/sesion/save','POST', {
        LUGAR: sessionData.place,
        FECHA: sessionData.date,
        HORARIO_INICIO: sessionData.startHour,
        HORARIO_FINAL: sessionData.endHour,
        PRESIDENTE: sessionData.president,
        SECRETARIO: sessionData.secretary
        });
        console.log(sessionData);
                // this.sessions = [response.data, ...this.sessions];
                console.log(response);
                return response;
    
        },
        

        async updateSession(id, sessionData) {
            try {
                const response = await axios.requestAxios(`/sesion/update/${id}`, 'PUT', {
                    LUGAR: sessionData.place,
                    FECHA: sessionData.date,
                    HORARIO_INICIO: sessionData.startHour,
                    HORARIO_FINAL: sessionData.endHour,
                    PRESIDENTE: sessionData.president,
                    SECRETARIO: sessionData.secretary
                    });
                this.sessions = this.sessions.map(session =>
                    session.IDSESION === id ? response.data : session
                );
                console.log(response);
                return response;
            } catch (error) {
                console.error("Error updating session:", error);
                return null;
            }
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
