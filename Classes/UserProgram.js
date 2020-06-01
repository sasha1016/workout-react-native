import { 
    API,
    V1
} from "../config/api";
import firebase from '../config/firebase.js'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage'

const axios = require('axios') ; 

class UserProgram {

    uid = null; 
    program = null ; 
    workoutsCompleted = null ;
    currentWeek = null ;
    oneRepMaxes = null ; 
    daysSelectedOfTheProgram = null;  

    constructor(uid) {
        this.uid = uid ; 
    }

    static start(programID) {

    }

    switch() {

    }

    end() {

    }

    information

}

export default UserProgram ; 