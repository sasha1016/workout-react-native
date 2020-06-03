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

    constructor(uid,program,oneRepMaxes) {
        this.uid = uid ; 
    
        if(program !== undefined) this.programID = program ; 

        if(oneRepMaxes !== undefined) {
            this.oneRepMaxes = oneRepMaxes;
            this.commenced = moment().format('L LT') ; 
        }
    }

    start() {

        return new Promise((resolve,reject) => {

            const program = {
                program:this.programID, 
                commenced:this.commenced,
                oneRepMaxes:this.oneRepMaxes
            } ; 

            axios({
                method:'post',
                body:{...program},
                url:API.V1 + V1.USER.PROGRAMS.ADD,
                headers:{
                    'Authorization':authToken
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
                body:{
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

    end() {

    }

}

export default UserProgram ; 