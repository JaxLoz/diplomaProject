import { defineStore } from "pinia";
import axios from "@/axios";

export const usePrintStore = defineStore("print", {
    state: () => ({
        listMemberInvited: [],
        listGuestInvited: [],
        listSolicitud: [],
        listProposicion: [],
        listTask: [],
        onPrintMode: false,
    }),
    actions: {

        setPrint(value) {
        this.onPrintMode = value;
        },

        setListMemberInvited(value) {
            this.listMemberInvited = value;
        },

        setListGuestInvited(value) {
            this.listGuestInvited = value;
        },

        setListSolicitud(value){
            this.listSolicitud = value;
        },

        setListProposicion(value){
            this.listProposicion = value;
        },

        setListTask(value){
            this.listTask = value;
        },

        getPrint() {
            return this.onPrintMode;
        },

        getListMemberInvited() {
            return this.listMemberInvited;
        },

        getListGuestInvited() {
            return this.listGuestInvited;
        },

        getListSolicitud(){
            return this.listSolicitud;
        },

        getListProposicion(){
            return this.listProposicion;
        },

        getListTask(){
            return this.listTask;
        },


        async fetchListMemberInvited(idSesion){
            const response = await axios.requestAxios(`memberInvitedToSesionNoPaginate/${idSesion}`);
            this.setListMemberInvited(response.data.data)
        },

        async fetchListGuestInvited(idSesion){
            const response = await axios.requestAxios(`guestInvitedToSesionNoPaginate/${idSesion}`);
            this.setListGuestInvited(response.data.data)
        },

        async fetchSolicitudNoPaginate(idSesion){
            const response = await axios.axiosInstance.get(`solicitudes/All/${idSesion}`);
            this.setListSolicitud(response.data.data);
        },

        async fetchProposicionNoPaginate(idSesion){
            const response = await axios.axiosInstance.get(`proposicionOfSesionNotPaginate/${idSesion}`);
            this.setListProposicion(response.data.data);
        },

        async fetchTaskNoPaginate(idSesion){
            const response = await axios.axiosInstance.get(`encargadoTareaByIdSesion/${idSesion}`);
            this.setListTask(response.data.data);
        },

    }

})