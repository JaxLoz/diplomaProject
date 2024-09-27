import { defineStore } from "pinia";
//import axiosInstance from "@/axios";
import registrosService from "@/service/registrosService";

export const useResitrosStore = defineStore("registros", {
    state: () => ({
        registros: [],
        facultades: [],
        programas: [],
        periodos: [],
        registrosFiltrados: []
    }),

    actions: {
        async getRegisters() {
            this.registros = await registrosService.getRegistros()
        },

        getFaculties() {
            const onlyFaculties = this.registros.map(registro => registro.facultad)
            this.facultades = [...new Set(onlyFaculties)]
        },

        getProgramsByFaculty(faculty){
            const onlyPrograms = this.registros.filter(registro => registro.facultad === faculty)
            .map(registro => registro.programa)
            this.programas = [...new Set(onlyPrograms)]
        },

        getPeriods(){
            const onlyPeiords = this.registros.map(registro => registro.periodo)
            this.periodos = [...new Set(onlyPeiords)]
        },

        filteredRegisters(filtroFacultad, filtroPrograma, filtroPeriodo){
            const filterRegister = this.registros.filter((registro) => {
                const coincideFacultad = filtroFacultad == '' || registro.facultad === filtroFacultad
                const coincidePrograma = filtroPrograma == '' || registro.programa === filtroPrograma
                const coincidePeriodo = filtroPeriodo == '' || registro.periodo === filtroPeriodo
                return coincideFacultad && coincidePrograma && coincidePeriodo
            })
            this.registrosFiltrados = filterRegister
            return filterRegister
        }
    }
})