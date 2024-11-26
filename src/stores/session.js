import { defineStore } from "pinia";
import axios from "@/axios";
import formatDateService from "@/service/formatDateService";

export const useSessionStore = defineStore("sesion", {
    state: () => ({
        sessions: [],
        infViewSesion: {},
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

        setInfoViewSesion(data){
            this.infViewSesion = data
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

        getInfoViewSesion(){
            return this.infViewSesion;
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
        
        async fetchSessionById(id) {
            
            const response = await axios.requestAxios('/sesion/'+id, 'GET');
            if(response.error){
                this.setDataError(response.data);
                //this.showErrorAlertModal()
            }else{
                this.setInfoViewSesion(response.data.sesion);
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
           console.log("datos recibidos de modal de creacion",{sessionData})
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

        async updateHourEndSession(sessionData, horaFinal) {
            const id = sessionData.IDSESION;  // Asegúrate de que el ID esté aquí
        
            const response = await axios.requestAxios(`/sesion/update/${id}`, 'PUT', {
                LUGAR: sessionData.LUGAR,
                FECHA: sessionData.FECHA,
                HORARIO_INICIO: formatDateService.extractHour(sessionData.HORARIO_INICIO),
                HORARIO_FINAL: horaFinal,
                PRESIDENTE: sessionData.PRESIDENTE,
                SECRETARIO: sessionData.SECRETARIO
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

        async deleteSession(infSesion) {
            console.log(infSesion.solicituds.descripcion)
            if(infSesion.actas.length > 0){
                console.log('inicia eliminacion de acta')
                infSesion.actas.forEach(acta => {
                    const response = axios.requestAxios(`acta/delete/${acta.ID_ACTA}`, 'DELETE');
                    console.log(response)
                });
            }

            if(infSesion.asistencia_invitados.length > 0){
                console.log('inicia eliminacion de asistencia invitados')
                infSesion.asistencia_invitados.forEach(asistenciaInvitado => {
                    const response = axios.requestAxios(`asistenciaInvitados/delete/${asistenciaInvitado.SESION_IDSESION}/${asistenciaInvitado.INIVITADO_IDINVITADO}`, 'DELETE');
                    console.log(response)
                })
            }

            if(infSesion.asistencia_miembros.length > 0){
                 console.log('inicia eliminacion de asistencia miembros')
                 infSesion.asistencia_miembros.forEach(asistenciaMiembro => {
                    const response = axios.requestAxios(`asistenciaMiembros/delete/${asistenciaMiembro.SESSION_IDSESION}/${asistenciaMiembro.MIEMBRO_IDMIEMBRO}`, 'DELETE');
                    console.log(response)
                })
            }

            if(infSesion.orden_sesions.length > 0){
                console.log('inicia eliminacion de orden del dia')
                infSesion.orden_sesions.forEach(ordenDia => {
                    const response = axios.requestAxios(`orden_sesion/delete/${ordenDia.ID_ORDEN_SESION}`, 'DELETE');
                    console.log(response)
                })
            }

            if(infSesion.proposiciones.length > 0){
                console.log('inicia eliminacion de proposiciones')
                infSesion.proposiciones.forEach(proposicion => {
                    const response = axios.requestAxios(`proposicion/delete/${proposicion.ID_PROPOSICIONES}`, 'DELETE');
                    console.log(response)
                })
            }

            
            if(infSesion.solicituds.length > 0){
                
                    console.log('inicia eliminacion de solicitudes')
                    
                    infSesion.solicituds.forEach(solicitud => {
                        
                        if(Object.keys(solicitud.descripcion).length > 0){
                            axios.requestAxios(`solicitudes/${solicitud.ID_SOLICITUD}`, 'DELETE');
                            axios.requestAxios(`descripciones/${solicitud.descripcion.ID_SOLICITUD}`, 'DELETE');
                        }
                    });
            }

            if(infSesion.tareas.length > 0){
                console.log('inicia eliminacion de encargado de tareas')
                infSesion.tareas.forEach(tarea => {
                    if(tarea.encargados_tareas.length > 0){
                        tarea.encargados_tareas.forEach(encargado => {
                            axios.requestAxios(`encargados_tarea/delete/${encargado.MIEMBROS_IDMIEMBROS}/${encargado.TAREAS_IDTAREAS}`, 'DELETE');
                        })

                    }
                    axios.requestAxios(`tarea/delete/${tarea.IDTAREAS}`, 'DELETE');
                })
            }

            const response = axios.requestAxios(`/sesion/delete/${infSesion.IDSESION}`, 'DELETE');
            console.log(response)

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
