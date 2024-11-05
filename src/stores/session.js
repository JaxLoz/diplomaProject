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

        addNewSession(session){
            
            this.sessions = [{...session}, ...this.sessions]
        },

        setShowModelSession(value){
            this.showModalSession = value
        },

        setShowResumenModalSession(value){
            this.showResumenModalSession = value
        },

        setOnUpdateMode(value){
            this.onUpdateMode = value
        },

        getShowModelSession(){
            return this.showModalSession
        },

        getShowResumenModalSession(){
            return this.showResumenModalSession
        },

        getOnUpdateMode(){
            return this.onUpdateMode
        },
        
        getSessionByid(id){
            const sessionWanted = this.sessions.find(session => session.id == id);
            return sessionWanted
        },

        async createSession(sessionData) {
                const response = await axios.post('/sesion','POST', sessionData)
        
                if(response.error){
                    this.setDataError(response.data)
                    this.showErrorAlertModal()
                } else{
                    sessionStorage.setItem('tk', JSON.stringify(response.data.token))
                    await this.getInfProfile()
                } 
            } 
        }
    
    })