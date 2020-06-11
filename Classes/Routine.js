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

class Routine {

    day = null ; 

    constructor(uid) {
        this.uid = uid ; 
    }

    get() {
        var params = {
            populate:"program,userProgram"
        }
        if (this.day) params.day = this.day ; 

        return new Promise((resolve,reject) => {
            axios({
                method:'get',
                params:{...params},
                url:API.V1 + V1.USER.ROUTINES.GET,
                headers:{
                    'Authorization':authToken
                }
            }) 
            .then((response) => { 
                resolve(response.data) ;
            })
            .catch((error) => {
                reject(error.response) ; 
            })
        })
    }

    add(routineEementToAdd,daySelectedOfTheProgram) {
        if(!this.day) return Promise.reject('You need to set a day first')

        return new Promise((resolve,reject) => {

            axios({
                method:'post',
                data:{
                    day:this.day,
                    toAdd:routineEementToAdd, 
                    daySelectedOfTheProgram,
                    populate:"program,userProgram"
                },
                url:API.V1 + V1.USER.ROUTINES.ADD,
                headers:{
                    'Authorization':authToken
                }
            }) 
            .then((response) => {
                resolve(response.data) ;  
            }).catch((error) => {
                reject(error.response.data.message) ; 
            })
        })
    }

    delete(routineElementID,userProgramID) {

        return new Promise((resolve,reject) => {
            axios({
                method:'post',
                data:{
                    day:this.day,
                    routineElementID,
                    userProgramID
                },
                url:API.V1 + V1.USER.ROUTINES.DELETE,
                headers:{
                    'Authorization':authToken
                }
            }) 
            .then(() => {
                resolve() ; 
            }).catch((error) => {
                reject(error.response.data.message) ; 
            }) 
        })
    }
    
    chooseDay(day) {
        this.day = day ; 
        return this ; 
    }

}

export default Routine ; 