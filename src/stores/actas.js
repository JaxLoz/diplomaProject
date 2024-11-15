import { defineStore } from "pinia";
import axios from "@/axios.js";

export const useActaStore = defineStore("acta", {
    state: () => ({
        estadoactas:[],
        showModalactas: false,
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

        setShowModelSession(value){
            this.showModalactas = value
        },

        getShowModelSession(){
            return this.showModalactas
        },

        async createActa(idSesion){
            const response = await axios.requestAxios('/acta/save', 'POST', {
                ESTADO: 'pendiente',
                SESION_IDSESION: idSesion
            })

            if(response.error){
                this.setDataError(response.data);
                this.showErrorAlertModal();
                console.error(response.data);
            }else{
                this.setDataSuccesfull(response.data);
                this.showSuccessAlertModal();
            }
        },
        async estado(actadata){
            const id = actadata.ID_ACTA; 
            const response = await axios.requestAxios(`/acta/estado/${id}`, 'PUT', {
                ESTADO: sessionData.estado
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
            }
    }
})