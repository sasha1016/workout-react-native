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
                if(userContext.data.uid === user.uid) return null ;  
                AsyncStorage.getItem('@USER_UID')
                .then((uid) => { 
                    if(uid !== '' && uid !== null) {
                        return User.initiailize(uid);  
                    }
                    else {
                        setLoggedIn(false) ; 
                        return Promise.reject() ; 
                    }
                })
                .then((credentials) => {
                    userContext.set({...credentials})
                    setLoggedIn(true) ; 
                })                
            } else {
                !loggedIn ? setLoggedIn(true) : null ; 
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