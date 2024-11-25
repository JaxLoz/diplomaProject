import { defineStore } from "pinia";
import axios from '@/axios.js'
export const useAuthStore = defineStore("auth", {

    state: () => ({
        profile: {},
        nameAcronym: "",
        showErrorAlert: false,
        showSuccessAlert: false,
        dataError: {},
        dataSuccesfull: {},
        isLoading: false
    }),

    actions: {

        getIsloading(){
            return this.isLoading;
        },

        getProfile(){
            return this.profile;
        },

        getDataSuccesfull(){
            return this.dataSuccesfull
        },

        getDateError(){
            return this.dataError;
        },

        setIsLoading(loading){
            this.isLoading = loading
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


        async register(registerData){

            this.setIsLoading(true)
            const response = await axios.requestAxios('/register', 'POST', registerData)   

            if(response.error){
               console.log(response.data)
               this.setDataError(response.data)
               this.showErrorAlertModal() 
               this.setIsLoading(false)
            }else{
                this.showSuccessAlertModal()
                this.setDataSuccesfull(response.data)
                this.setIsLoading(false)
            }
        },

        async login(credentials){
            this.setIsLoading(true)
            const response = await axios.requestAxios('/login', 'POST', credentials)

            if(response.error){
                this.setDataError(response.data)
                this.showErrorAlertModal()
                this.setIsLoading(false)
            } else{
                sessionStorage.setItem('tk', JSON.stringify(response.data.token))
                await this.getInfProfile()
                this.setIsLoading(false)
            } 
        },

        async getInfProfile(){
            const response = await axios.requestAxios('/profile', 'GET');
            this.profile = {...response.data.data[0]};
            console.log(this.profile.nombre);
            sessionStorage.setItem('profile', JSON.stringify({email: this.profile.email, nombre: this.profile.nombre}))
            //console.log(response)
        }
        
    }

});