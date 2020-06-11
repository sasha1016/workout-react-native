import { 
    API,
    V1
} from "../config/api";
import * as SecureStore from 'expo-secure-store';
const moment = require('moment') ; 
const axios = require('axios') ; 

var authToken ; 

SecureStore.getItemAsync('authToken')
.then((token) => {
    authToken = token ; 
})
.catch(() => {
    authToken = null ; 
})


class UserProgram {

    constructor(uid,program = null,oneRepMaxes = null) {
        this.uid = uid ; 
    
        if(program !== null) this.programID = program ; 

        if(oneRepMaxes !== null) {
            this.oneRepMaxes = oneRepMaxes;
            this.commenced = moment().format('L LT') ; 
        } 
    }

    start() {

        return new Promise((resolve,reject) => {

            var program = {
                program:this.programID, 
                commenced:this.commenced,
                oneRepMaxes:this.oneRepMaxes
            } ; 

            console.warn(program) ; 

            axios({
                method:'post',
                data:program,
                url:API.V1 + V1.USER.PROGRAMS.ADD,
                headers:{
                    'Authorization':authToken,
                    'Content-Type':'application/json'
                }
            })
            .then(() => {
                resolve() ; 
            }).catch((error) => {
                reject(error)
            })
        })
    }

    switch(from) {

        return new Promise((resolve,reject) => {

            const program = {
                user:this.uid,
                program:this.programID, 
                commenced:this.commenced,
                oneRepMaxes:this.oneRepMaxes
            } ; 

            axios({
                method:'post',
                data:{
                    programFrom:from, 
                    programTo:program,
                },
                url:API.V1 + V1.USER.PROGRAMS.SWITCH,
                headers:{
                    'Authorization':authToken
                }
            })
            .then((response) => {
                resolve(response) ; 
            }).catch((error) => {
                reject(error.response.data) ;
            })          
        })

    }

    getAll() {

        return new Promise((resolve,reject) => {
            axios({
                method:'get',
                params:{populate:"program"},
                url:API.V1 + V1.USER.PROGRAMS.GET,
                headers:{
                    'Authorization':authToken
                }
            }) 
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })  ; 
        })
    }

    end(id) {
        if(id === undefined) {
            throw new Error(`ID of the program needs to be set before it can be ended`)
        }
        return new Promise((resolve,reject) => {
            axios({
                method:'post',
                data:{id:id},
                url:API.V1 + V1.USER.PROGRAMS.END,
                headers:{
                    'Authorization':authToken
                }
            })
            .then(() => {
                resolve() ; 
            })
            .catch((error) => {
                reject(error.response.data.message) ; 
            })
        })
    }

}

export default UserProgram ; 