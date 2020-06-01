import { 
    API,
    V1
} from "../config/api";
import firebase from '../config/firebase.js'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage'

const axios = require('axios') ; 

class User {

    static _getAuthToken(uid) {
        return new Promise((resolve,reject) => {
            axios.post(API.V1 + V1.AUTH.GET_TOKEN,{
                uid
            })
            .then((response) => {
                resolve(response.data.token) ; 
            })
            .catch((error) => {
                reject(error) ;
            })
        })
    }

    static logout() {

    }


    static signup(credentials) {

        return new Promise((resolve,reject) => {
            axios.post(API.V1 + V1.AUTH.SIGNUP, {
                ...credentials
            })
            .then((response) => {
                return this.initiailize(response.data.uid) ; 
            })
            .then((credentials) => {
                resolve(credentials) ; 
            })
            .catch((error) => {
                reject(error.response) ; 
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
        await SecureStore.deleteItemAsync('uid') ;
        await AsyncStorage.setItem('@USER_UID','') ;
        await AsyncStorage.removeItem('@USER_FNAME') ;
        await AsyncStorage.removeItem('@USER_LNAME') ; 
        await AsyncStorage.removeItem('@USER_EMAIL') ; 
    }

    static initiailize(uid) {

        return new Promise((resolve, reject) => {

            var credentials = {} ; 

            axios.get(API.V1+ V1.USER.GET.DETAILS,{
                params:{uid}
            })
            .then((response) => {
                let record = response.data; 
                
                let {email,displayName,emailVerified, uid, disabled} = record; 
                credentials.firstName = displayName.split(' ')[0] ; 
                credentials.lastName = displayName.split(' ')[1] ;
                credentials = {...credentials,email,emailVerified,uid,disabled} ; 
            })
            .then(async () => {
                let token = await this._getAuthToken(credentials.uid) ; 
                await SecureStore.setItemAsync('authToken', token) ;
                await SecureStore.setItemAsync('uid', uid) ;
                await AsyncStorage.setItem('@USER_UID',credentials.uid) ;
                await AsyncStorage.setItem('@USER_FNAME',credentials.firstName) ;
                await AsyncStorage.setItem('@USER_LNAME',credentials.lastName) ; 
                await AsyncStorage.setItem('@USER_EMAIL',credentials.email) ; 
                resolve(credentials) ; 
            })
            .catch((error) => {
                reject(error) ; 
            })
        })
        
    }


}

export default User ; 