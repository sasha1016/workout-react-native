import { 
    API,
    V1
} from "../config/api";
import * as SecureStore from 'expo-secure-store';
const axios = require('axios') ; 

var authToken ; 

SecureStore.getItemAsync('authToken')
.then((token) => {
    authToken = token ; 
})
.catch(() => {
    authToken = null ; 
})

class Program {

    constructor(values) {
        this.name = values.name ; 
        this.duration = values.duration ; 
        this.type = values.type ; 
        this.lift = values.lift ; 
        this.weightFactor = values.weightFactor ; 
        this.frequency = values.frequency ;
        this.days = values.days ;
        this.preferredDays = values.preferredDays ;
        this.uniqueLifts = values.uniqueLifts ; 
    }

    add() {

        return new Promise((resolve,reject) => {

            let program = {
                name:this.name, 
                duration:this.duration,
                type:this.type, 
                lift:this.lift, 
                weightFactor:this.weightFactor, 
                frequency:this.frequency,
                days:this.days,
                preferredDays:this.preferredDays,
                uniqueLifts:this.uniqueLifts 
            }

            axios({
                method:'post',
                data:{...program},
                url:API.V1 + V1.PROGRAMS.ADD,
                headers:{
                    'Authorization':authToken
                }
            }) 
            .then(() => {
                resolve(); 
            }).catch((error) => {
                reject(error.response.data.message) ; 
            }) ; 
        })
        
    }


    static getAll() {
        return new Promise((resolve,reject) => {

            axios({
                method:'get',
                url:API.V1 + V1.PROGRAMS.GET,
                headers:{
                    'Authorization':authToken
                }
            }) 
            .then((response) => {
                resolve(response.data) ; 
            }).catch((error) => {
                reject(error.response.data.message) ; 
            }) ; 
        }) ; 
    }

    static getFiltered(filterBy,filterByValue,exclude) {
        var params = {filterBy,value:filterByValue} 
        if(exclude !== undefined) params.exclude = exclude ; 

        return new Promise((resolve,reject) => {

            axios({
                method:'get',
                params:{...params},
                url:API.V1 + V1.PROGRAMS.GET,
                headers:{
                    'Authorization':authToken
                }
            }) 
            .then((response) => {
                resolve(response.data) ; 
            }).catch((error) => {
                reject(error.response.data.message) ; 
            }) ; 
        })
    }

    end() {

    }

}

export default Program ; 