import { 
    API,
    V1
} from "../config/api";
import firebase from '../config/firebase.js'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage'

const axios = require('axios') ; 

class User {

    static _getAuthToken() {
        return new Promise((resolve,reject) => {
            var auth = {} ; 

            SecureStore.getItemAsync('authToken')
            .then((token) => {
                if(token === null) return Promise.reject() ; 
                auth.token = token ; 
                return Promise.resolve() ;  
            })
            .then(() => {
                return SecureStore.getItemAsync('authTokenExpiration') ; 
            })
            .then((expirationTime) => {
                // expirationTime doesn't exist. 
                // Should never happen but if it does 
                // Promise is rejected locally and execution 
                // goes to line 4x
                if(expirationTime === null) return Promise.reject() ; 
                // if expirationTime is past, reject Promise
                // locally.line 4x gets executed
                if(Date.parse(expirationTime).toString() < (new Date).toString()) return Promise.reject() 
                auth.expirationTime = expirationTime ; 
                // Got expTime and token, all good, no need to query 
                // firebase. go to line 4x
                return Promise.resolve() ; 
            })
            .then(() => {
                // All good, resolve promise. 
                resolve(auth)
            })
            .catch(() => { 
                // execution comes here when the token 
                // doesn't exist / token has expired / the token
                // doesnt have an expiry. Makescall to fbauth
                return firebase.auth().currentUser.getIdTokenResult(true) ; 
            })
            .then((result) => {
                auth.token = result.token ; 
                auth.expirationTime = result.expirationTime ;
                console.warn(auth) ;  
                resolve(auth)
            })
            .catch((error) => {
                console.warn(error) ; 
                reject(error.message) ; 
            })
        })

    }



    static signup(credentials) {

        return new Promise((resolve,reject) => {
            axios.post(API.V1 + V1.AUTH.SIGNUP, {
                ...credentials
            })
            .then(() => {
                resolve() ; 
            })
            .catch((error) => {
                reject(error.response.data || error.message) ; 
            })
        })
    }

    static login(credentials) {

        return new Promise((resolve,reject) => {
            firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password)
            .then((user) => {
                resolve(user.user) 
            })
            .catch((error) => {
                reject(error) ; 
            })
        })
    }
    
    static async logout() {
        await SecureStore.deleteItemAsync('authToken') ;
        await SecureStore.deleteItemAsync('authTokenExpiration') ;
        await AsyncStorage.setItem('@USER_UID','') ;
        await AsyncStorage.removeItem('@USER_FNAME') ;
        await AsyncStorage.removeItem('@USER_LNAME') ; 
        await AsyncStorage.removeItem('@USER_EMAIL') ; 
    }

    static initiailize(uid) {

        return new Promise(async (resolve, reject) => {

            var credentials = {} ; 

            var authToken, authTokenExpiration; 

            this._getAuthToken()
            .then((result) => {
                authToken = result.token ; 
                authTokenExpiration = result.expirationTime ; 
                return  axios({
                            method:'get',
                            params:{uid},
                            url:API.V1 + V1.USER.GET.DETAILS,
                            headers:{
                                'Authorization':authToken
                            }
                        })
            })
            .then((response) => {
                let record = response.data; 
                
                let {email,displayName,emailVerified, uid, disabled} = record; 
                credentials.firstName = displayName.split(' ')[0] ; 
                credentials.lastName = displayName.split(' ')[1] ;
                credentials = {...credentials,email,emailVerified,uid,disabled} ; 
            })
            .then(async () => {
                await SecureStore.setItemAsync('authToken', authToken) ;
                await SecureStore.setItemAsync('authTokenExpiration', authTokenExpiration) ;
                await AsyncStorage.setItem('@USER_UID',credentials.uid) ;
                await AsyncStorage.setItem('@USER_FNAME',credentials.firstName) ;
                await AsyncStorage.setItem('@USER_LNAME',credentials.lastName) ; 
                await AsyncStorage.setItem('@USER_EMAIL',credentials.email) ; 
                resolve(credentials) ; 
            })
            .catch((error) => {
                reject(error.response.data.message) ; 
            })
        })
        
    }


}

export default User ; 