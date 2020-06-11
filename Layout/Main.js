import React from 'react' ; 
import Home from '../Navigators/Drawer/index.js'
import OnboardingScreen from '../Pages/Onboard';
import { UserContext } from './Contexts' ; 
import  AsyncStorage  from '@react-native-community/async-storage';
import User from '../Classes/User.js';
import firebase from '../config/firebase' ; 

export default function Main() {

    var [loggedIn,setLoggedIn] = React.useState(null); 
    const userContext = React.useContext(UserContext) ; 

    React.useLayoutEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                if(userContext.data.uid === user.uid) {
                    !loggedIn ? setLoggedIn(true) : null ; 
                    return null ;
                }
                AsyncStorage.getItem('@USER_UID')
                .then((uid) => { 
                    if(uid !== '' && uid !== null) {
                        console.warn(uid) ; 
                        return User.initiailize(uid);  
                    }
                    else {
                        return Promise.reject() ; 
                    }
                })
                .then((credentials) => {
                    userContext.set({...credentials})
                    setLoggedIn(true) ; 
                }) 
                .catch((error) => {
                    console.warn(error) ; 
                    setLoggedIn(false) ; 
                })               
            } else {
                setLoggedIn(false) ; 
            }
        })


    },[userContext.data])

    return(
        !loggedIn ?
            <OnboardingScreen/>
        :
            <Home/>
    )
}