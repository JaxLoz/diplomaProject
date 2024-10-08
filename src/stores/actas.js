import { defineStore } from "pinia";

export const useSessionStore = defineStore("sesion", {
    state: () => ({
        showModalactas: false,
    }),
    actions: {
        setShowModelSession(value){
            this.showModalactas = value
        },

        getShowModelSession(){
            return this.showModalactas
        }
    }
})