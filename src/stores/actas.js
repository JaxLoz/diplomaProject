import { defineStore } from "pinia";
import axios from "@/axios.js";

export const useActaStore = defineStore("acta", {
    state: () => ({
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

            this.setDataSuccesfull(response.data);

            if(response.error){
                this.setDataError(response.data);
                this.showErrorAlertModal();
                console.error(response.data);
            }
        },
    }
})