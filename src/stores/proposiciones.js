import { defineStore } from 'pinia'
import axios from '@/axios.js'

export const useProposicionStore = defineStore('proposicion', {
  state: () => ({
    proposiciones: [],
    showModalProposiciones: false,
    showErrorAlert: false,
    showSuccessAlert: false,
    dataError: {},
    dataSuccesfull: {}
  }),
  actions: {
    getDataSuccesfull() {
      return this.dataSuccesfull
    },

    getDateError() {
      return this.dataError
    },

    setDataError(data) {
      this.dataError = { ...data }
    },

    setDataSuccesfull(data) {
      this.dataSuccesfull = { ...data }
    },

    showErrorAlertModal() {
      this.showErrorAlert = true
    },

    showSuccessAlertModal() {
      this.showSuccessAlert = true
    },

    hidenSusccessAlertModal() {
      this.showSuccessAlert = false
      this.dataSuccesfull = {}
    },

    hidenErrorAlertModal() {
      this.showErrorAlert = false
      this.dataError = {}
    },

    getShowErrorAlert() {
      return this.showErrorAlert
    },

    getShowSuccessAlert() {
      return this.showSuccessAlert
    },

    setShowModelProposicion(value) {
      this.showModalProposiciones = value
    },

    getShowModelProposicion() {
      return this.showModalProposiciones
    },
    async fetchProposicionesOfSesion(idSesion) {
  try {
    const response = await axios.requestAxios(`/proposicionOfSesion/${idSesion}`, 'GET');
    console.log('Response from axios.requestAxios:', response); // Log the entire response

    // Check if data exists and it's an array with items
    if (response.data && response.data.data && response.data.data.length > 0) {
      const proposiciones = response.data.data; // Get the array of proposiciones
      console.log('Proposiciones data:', proposiciones); // Log all the proposiciones
      return proposiciones; // Return the array of proposiciones
    } else {
      console.log('No proposiciones found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    this.setDataError(error.message);
  }
},

    async fetchProposiciones(params = '') {
      try {
        const response = await axios.requestAxios(`/proposicion/all?${params}`, 'GET')
        console.log('Datos obtenidos del backend:', response.data.proposiciones)
        this.proposiciones = response.data.proposiciones || [] // Asegúrate de asignar un arreglo
      } catch (error) {
        console.error('Error fetching proposiciones:', error)
      }
    },

    // Método para actualizar la DECISION de una proposición
    async updateDecision(proposicionData) {
      const id = proposicionData.ID_PROPOSICIONES

      // Verifica qué datos estás enviando al backend
      console.log('Datos enviados al backend para actualizar la DECISION:', proposicionData)

      const response = await axios.requestAxios(`/proposicion/decision/${id}`, 'PUT', proposicionData)

      if (response.error) {
        console.error('Error en la respuesta de la API:', response.data)
        this.showErrorAlertModal()
        this.setDataError(response.data) // Mostrar la alerta de error
      } else {
        this.showSuccessAlertModal()
        this.setDataSuccesfull(response.data)
      }

      return response
    }
  }
})
