import { defineStore } from "pinia";

export const useInvitacionStore = defineStore('invitacion', {
    state: () => ({
        members: [{
            id: 1,
            firstname: "Javier Eduardo",
            lastname: "Montes Delgado",
            email: "jav2323@gmail.com"
        },
        {
            id: 2,
            firstname: "Moises Elias",
            lastname: "Silva Perez",
            email: "moi@gmail.com"
        },
        {
            id: 3,
            firstname: "Jose Fracisco",
            lastname: "Ortiz Moreles",
            email: "josef@gmail.com"
        },
        {
            id: 4,
            firstname: "Miguel Alfonos",
            lastname: "Negrete Romero",
            email: "migue@gmail.com"
        }],

        guests: []
    }),

    actions: {
        searchGuest(searchInfo) {
            if(searchInfo !== undefined && searchInfo !== '') {
                const memberGuest = this.members.filter(member => {
                    return member.firstname.toLowerCase().includes(searchInfo.toLowerCase()) || member.lastname.toLowerCase().includes(searchInfo.toLowerCase()) || member.email.toLowerCase().includes(searchInfo.toLowerCase())
                 })
                 return memberGuest
            }
        },

        addGuest(guest){
               const guestExisted = this.guests.find(guestExist => guestExist.id == guest.id)
               console.log(guestExisted)
               if(guestExisted === undefined){
                this.guests = [...this.guests, guest]
               }
               
        },

        removeGuest(guestDelete){
            const indexForDelete = this.guests.findIndex(guest => guest.id == guestDelete.id)
            console.log(indexForDelete)
            this.guests.splice(indexForDelete, 1)
        },

        cleanGuestsList(){
            this.guests = []
        }
    }
})