import { defineStore } from "pinia";

export const useSessionStore = defineStore("sesion", {
    state: () => ({
        sessions: [],
        showModalSession: false,
    }),
    actions: {

        addNewSession(session){
            this.sessions = [{...session}, ...this.sessions]
        },

        setShowModelSession(value){
            this.showModalSession = value
        },

        getShowModelSession(){
            return this.showModalSession
        }
    }
})