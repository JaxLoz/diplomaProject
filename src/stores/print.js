import { defineStore } from "pinia";
import axios from "@/axios";

export const usePrintStore = defineStore("print", {
    state: () => ({
        listMemberInvited: [],
        listGuestInvited: [],
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

        getPrint() {
            return this.onPrintMode;
        },

        getListMemberInvited() {
            return this.listMemberInvited;
        },

        getListGuestInvited() {
            return this.listGuestInvited;
        },


        async fetchListMemberInvited(idSesion){
            const response = await axios.requestAxios(`memberInvitedToSesionNoPaginate/${idSesion}`);
            this.setListMemberInvited(response.data.data)
        },

        async fetchListGuestInvited(idSesion){
            const response = await axios.requestAxios(`guestInvitedToSesionNoPaginate/${idSesion}`);
            this.setListGuestInvited(response.data.data)
        }

    }

})