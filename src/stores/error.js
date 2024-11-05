import { defineStore } from "pinia";
export const useErrorStore = defineStore("error", {
    state: () => ({
        showAlertError: false,
        dataError: {}
    }),

    actions: {
        showAlert(){
            this.showAlertError = true;
        },

        getDataError(){
            return this.dataError;
        },

        setDataError(data){
            this.dataError = data;
        },

    }
});