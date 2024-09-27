import { defineStore } from "pinia";
import registrosService from "@/service/registrosService";

export const useRegitrosStore = defineStore("registros", {
    state: () => ({
        registros: [],
        facultades: [],
        programas: [],
        periodos: [],
        estratos: {},
        registrosFiltrados: []
    }),

    actions: {
        async getRegisters() {
            if(this.registros.length === 0){
                this.registros = await registrosService.getRegistros()
            }
        },

        getFaculties() {
            if(this.facultades.length === 0){
            const onlyFaculties = this.registros.map(registro => registro.facultad)
            this.facultades = [...new Set(onlyFaculties)]
            }
        },

        getProgramsByFaculty(faculty){
            const onlyPrograms = this.registros.filter(registro => registro.facultad === faculty)
            .map(registro => registro.programa)
            this.programas = [...new Set(onlyPrograms)]
        },

        getPeriods(){
            if(this.periodos.length === 0){
            const onlyPeiords = this.registros.map(registro => registro.periodo)
            this.periodos = [...new Set(onlyPeiords)]
            }
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
        },

        getStratumByDataFilter(){

            const totalStratum = {
                estrato_1: 0,
                estrato_2: 0,
                estrato_3: 0,
                estrato_4: 0,
                estrato_5: 0,
                estrato_6: 0,
            }

            this.registrosFiltrados.forEach(registro => {
                totalStratum.estrato_1 += Number(registro.estrato_1)
                totalStratum.estrato_2 += Number(registro.estrato_2)
                totalStratum.estrato_3 += Number(registro.estrato_3)
                totalStratum.estrato_4 += Number(registro.estrato_4)
                totalStratum.estrato_5 += Number(registro.estrato_5)
                totalStratum.estrato_6 += Number(registro.estrato_6)
            })

            this.estratos = totalStratum;
        },

        cleanFilteredRegisters(){
            this.registrosFiltrados = []
        }
    }
})