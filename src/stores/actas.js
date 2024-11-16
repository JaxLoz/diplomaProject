import { defineStore } from 'pinia'
import axios from '@/axios.js'

export const useActaStore = defineStore('acta', {
  state: () => ({
    actas: [],
    showModalactas: false,
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

    setShowModelSession(value) {
      this.showModalactas = value
    },

    getShowModelSession() {
      return this.showModalactas
    },
    async fetchActaOfSesionById(idSesion) {
      try {
        const response = await axios.requestAxios(`/actaOfSesion/${idSesion}`, 'GET')
        console.log('Response from axios.requestAxios:', response) // Log the entire response

        // Check if data exists and it's an array with items
        if (response.data && response.data.data && response.data.data.length > 0) {
          const actas = response.data.data // Get the array of actas
          console.log('Actas data:', actas) // Log all the actas
          return actas // Return the array of actas
        } else {
          console.log('No actas found')
          return []
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        this.setDataError(error.message)
      }
    },
    async fetchacta(params = '') {
      try {
        const response = await axios.requestAxios(`/acta/all?${params}`, 'GET')
        console.log('Datos obtenidos del backend:', response.data.acta)
        this.actas = response.data.acta || [] // Asegúrate de asignar un arreglo
      } catch (error) {
        console.error('Error fetching actas:', error)
      }
    },

    async createActa(idSesion) {
      const response = await axios.requestAxios('/acta/save', 'POST', {
        ESTADO: 'pendiente',
        SESION_IDSESION: idSesion
      })

      if (response.error) {
        this.setDataError(response.data)
        this.showErrorAlertModal()
        console.error(response.data)
      } else {
        this.setDataSuccesfull(response.data)
        this.showSuccessAlertModal()
      }
    },

    async estado(actadata) {
      const id = actadata.ID_ACTA
      console.log('Datos enviados al backend:', { estado: actadata.ESTADO })
      const response = await axios.requestAxios(`/acta/estado/${id}`, 'PUT', {
        estado: actadata.ESTADO // Cambié 'ESTADO' a 'estado' (minúsculas)
      })

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
