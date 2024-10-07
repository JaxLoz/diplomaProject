import { defineStore } from "pinia";

export const useSessionStore = defineStore("sesion", {
    state: () => ({
        showModalSession: false,
    }),
    actions: {
        setShowModelSession(value){
            this.showModalSession = value
        },

        getShowModelSession(){
            return this.showModalSession
        }
    }
})