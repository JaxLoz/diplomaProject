import { defineStore } from "pinia";
import axios from '@/axios.js'
export const useAuthStore = defineStore("auth", {

    state: () => ({
        profile: {},
        nameAcronym: ""
    }),

    actions: {

        getProfile(){
            return this.profile;
        },

        async test(){
            const response = await axios.requestAxios('/testAPI', 'GET')
            console.log(response)
        },

        async register(registerData){

            const response = await axios.requestAxios('/register', 'POST', registerData)
            console.log(response)
        },

        async login(credentials){
            const response = await axios.requestAxios('/login', 'POST', credentials)
            
            console.log(response)

            sessionStorage.setItem('tk', JSON.stringify(response.data.token))
            
            if(response.error){
                console.log('hubo un error y se capturo (pendiente para tratar elegantemente)')
            } 
            
        },

        async getInfProfile(){
            const response = await axios.requestAxios('/profile', 'GET');
            this.profile = {...response.data.data};
            sessionStorage.setItem('profile', JSON.stringify({email: this.profile.email, name: this.profile.name}))
            console.log(response)
        }
        
    }

});