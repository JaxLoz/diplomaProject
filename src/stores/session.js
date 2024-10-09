import { defineStore } from "pinia";

export const useSessionStore = defineStore("sesion", {
    state: () => ({
        sessions: [],
        showModalSession: false,
        onUpdateMode: false
         
    }),
    actions: {

        addNewSession(session){
            this.sessions = [{...session}, ...this.sessions]
        },

        setShowModelSession(value){
            this.showModalSession = value
        },

        setOnUpdateMode(value){
            this.onUpdateMode = value
        },

        getShowModelSession(){
            return this.showModalSession
        },

        getOnUpdateMode(){
            return this.onUpdateMode
        },

        getSessionByid(id){
            const sessionWanted = this.sessions.find(session => session.id == id);
            return sessionWanted
        }
    }
})