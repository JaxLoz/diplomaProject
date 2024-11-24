import { defineStore } from 'pinia';
import axios from '@/axios';
export const useOrderSesion = defineStore('orderSesion', {
    state: () => ({
        orderSesion: {},
        preOrdenSesion: [],
        isUpdateMode: false,
        showErrorAlert: false,
        showSuccessAlert: false,
        dataError: {},
        dataSuccesfull: {}
    }),

    actions: {

        getPreOrderSesion(){
            return this.preOrdenSesion;
        },

        getOrderSesion(){
            return this.orderSesion;
        },

        getIsUpdateMode(){
            return this.isUpdateMode;
        },

        getDataSuccesfull(){
            return this.dataSuccesfull
        },

        getDateError(){
            return this.dataError;
        },

        setPreOrderSesion(data){
            const lastItem = this.preOrdenSesion[this.preOrdenSesion.length - 1];
            if(lastItem != undefined){
                
                if(lastItem.ID_ORDEN_SESION == undefined){
                    data.idOrdenSesionTemporary = lastItem.idOrdenSesionTemporary + 1;
                }else{
                    data.idOrdenSesionTemporary = lastItem.ID_ORDEN_SESION + 1;
                }
        }else{
            data.idOrdenSesionTemporary = 1;
        }
            this.preOrdenSesion = [...this.preOrdenSesion, data];
        },

        setOrderSesion(data){
            this.orderSesion = {...data};
        },

        setisUpdateMode(value){
            this.isUpdateMode = value;
        },

        setDataError(data){
            console.log("cargando los datos del error ")
            this.dataError = {...data};
        },

        setDataSuccesfull(data){
            this.dataSuccesfull = {...data}
        },

        showErrorAlertModal(){
            console.log("mostrando el modal de alert error")
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

        removeItemPreOrderSesion(item){
            const index = this.preOrdenSesion.findIndex(ordenItem => ordenItem.orden === item.orden)
            this.preOrdenSesion.splice(index, 1);
        },

        selectItemPreOrderSesionToUpdate(item){
            if(this.isUpdateMode == false){
                const itemToUpdate = this.preOrdenSesion.find(ordenItem => ordenItem.idOrdenSesionTemporary === item.idOrdenSesionTemporary);
                return itemToUpdate
            }else{
                const itemToUpdate = this.preOrdenSesion.find(ordenItem => ordenItem.ID_ORDEN_SESION === item.ID_ORDEN_SESION);
                return itemToUpdate;
            }
            
        },

        isDuplicateOrdenSesion(){
            const isDuplicate = this.preOrdenSesion.some((item, index, arr) => {
                return arr.slice(index + 1).some((itemNex) => {
                    return item.orden === itemNex.orden;
                })
            })
            console.log(isDuplicate)
            return isDuplicate;
        },

        updateItemPreOrderSesionForUpdateMode(itemUpdated){
            const index = this. preOrdenSesion.findIndex(ordenItem => ordenItem.ID_ORDEN_SESION == itemUpdated.ID_ORDEN_SESION);
            this.preOrdenSesion.splice(index, 1, itemUpdated);
           
        },

        updateItemPreOrderSesionForCreateMode(itemUpdated){
            const index = this. preOrdenSesion.findIndex(ordenItem => ordenItem.idOrdenSesionTemporary == itemUpdated.idOrdenSesionTemporary);
            this.preOrdenSesion.splice(index, 1, itemUpdated);
        },

        uploadOrdeSesionInPreOrderSesion(ordenSesionList, isUpdateMode = false){
            if(ordenSesionList.length > 0 && isUpdateMode == false){
                const addPropertieDatBaseOrigin = ordenSesionList.map(item => {
                    item.dataBaseOrigin = true;
                    return item;
                })

                this.preOrdenSesion = addPropertieDatBaseOrigin
            }
            
            if(ordenSesionList.length > 0 && isUpdateMode == true){
                const addPropertieDatBaseOrigin = ordenSesionList.map(item => {
                    item.dataBaseOrigin = true;
                    item.wasUpdate = false;
                    return item;
                })

                this.preOrdenSesion = addPropertieDatBaseOrigin
            }
        },

        cleanPreordenSesion(){
            this.preOrdenSesion = [];
        },

        async getSesionOrderBySesion(idSesion, params = ''){
            // trae el resultado paginado
            const responsePaginate = await axios.requestAxios(`orden_sesionBySesion/${idSesion}?${params}`, 'GET')
            this.setOrderSesion(responsePaginate.data);  
            
            if(responsePaginate.error){
                this.setDataError(responsePaginate.data);
                this.showErrorAlertModal();
            }
        },

        async fetcthPreOrdenSesionBySesionToCreate(idSesion, params = ''){
            const responseNotPaginate = await axios.requestAxios(`orden_sesionBySesionNotPaginate/${idSesion}?${params}`, 'GET')
            // se agrega una nueva propieda y se carga a la lista de preOrdenSesion
            this.uploadOrdeSesionInPreOrderSesion(responseNotPaginate.data); 
            //this.preOrdenSesion = responseNotPaginate.data;
            if(responseNotPaginate.error){
                this.setDataError(responseNotPaginate.data);
                this.showErrorAlertModal();
            }
        },

        async fetchPreOrdenSesionBySesionToUpdate(idSesion, params = ''){
            const responseNotPaginate = await axios.requestAxios(`orden_sesionBySesionNotPaginate/${idSesion}?${params}`, 'GET')
            // se agrega una nueva propieda y se carga a la lista de preOrdenSesion con la propiedad wasUpdate (updateMode = true)
            this.uploadOrdeSesionInPreOrderSesion(responseNotPaginate.data, true); 
            //this.preOrdenSesion = responseNotPaginate.data;
            if(responseNotPaginate.error){
                this.setDataError(responseNotPaginate.data);
                this.showErrorAlertModal();
            }
        },

        async createOrdenSesionItem(){
            if(this.preOrdenSesion.length > 0){
                if(this.isDuplicateOrdenSesion()){
                    console.log('entra al if que ejecuta si hay duplicados')
                    this.setDataError({message: 'No se puede agregar items con el mismo numero de orden'});
                    this.showErrorAlertModal();
                }else{
                    const newOrdenSesionItems = this.preOrdenSesion.filter(item => item.dataBaseOrigin == false);
                    
                    if(newOrdenSesionItems.length > 0){
                        
                        const Errors = []
                        
                        for(const item of newOrdenSesionItems){
                            const response = await axios.requestAxios('orden_sesion/save', 'POST', item);
                            if(response.error){
                                Errors.push(response.data);
                            }
                        }

                        if(Errors.length > 0){
                            this.setDataError({message: 'Error al guardar los items de la orden'});
                            this.showErrorAlertModal();
                        }else{
                            this.setDataSuccesfull({message: 'Items guardados correctamente'});
                            this.showSuccessAlertModal();
                        }

                    }else{
                        this.setDataError({message: 'No hay items para guardar'});
                        this.showErrorAlertModal();
                    }
                }
            }
        },

        async updateOrdenSesionItem(){
            if(this.preOrdenSesion.length > 0){
                if(this.isDuplicateOrdenSesion()){
                    this.setDataError({message: 'No se puede agregar items con el mismo numero de orden'});
                    this.showErrorAlertModal();  
                }else{
                    const errors = []
                    
                    for (const item of this.preOrdenSesion){
                        if(item.wasUpdate == true){
                            const responseUpdated = axios.requestAxios(`orden_sesion/update/${item.ID_ORDEN_SESION}`, 'PUT', {
                                orden: item.orden,
                                TEMA: item.TEMA,
                                DESCRIPCION: item.DESCRIPCION,
                                SESION_IDSESION: item.SESION_IDSESION
                            });

                            if(responseUpdated.error){
                                errors.push(responseUpdated.data);
                            }
                        }
                    }

                    if(errors.length > 0){
                        this.setDataError({message: 'Error al actualizar los items de la orden'});
                        this.showErrorAlertModal();
                    }else{
                        this.setDataSuccesfull({message: 'Items actualizados correctamente'});
                        this.showSuccessAlertModal();
                    }
                }
            }
        },

        async deleteOrdenSesionItem(idOrdenSesion){
            const response = await axios.requestAxios(`orden_sesion/delete/${idOrdenSesion}`, 'DELETE');
            if(response.error){
                this.setDataError(response.data);
                this.showErrorAlertModal();
            }else{
                this.setDataSuccesfull({message: 'Item eliminado correctamente'});
                this.showSuccessAlertModal();
            }
        },
    }

});