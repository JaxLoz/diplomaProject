import { defineStore } from 'pinia'

export const useMiembrosStore = defineStore('miembros', {
    state: () => ({
        allUsers: [
            {
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
            }
        ]
    }),
    actions: {

        searchMember(searchInfo){
            if(searchInfo !== undefined && searchInfo !== '') {
               const UserSearch = this.allUsers.filter(user => {
                return user.firstname.toLowerCase().includes(searchInfo.toLowerCase()) || user.lastname.toLowerCase().includes(searchInfo.toLowerCase()) || user.email.toLowerCase().includes(searchInfo.toLowerCase())
               })
               return UserSearch
            }
        }
        
    }
})