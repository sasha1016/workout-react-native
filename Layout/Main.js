import React from 'react' ; 
import Home from '../Navigators/Drawer/index.js'
import OnboardingScreen from '../Pages/Onboard';
import { UserContext } from './Contexts' ; 

export default function Main() {

    var [loggedIn,setLoggedIn] = React.useState(null); 
    const user = React.useContext(UserContext) ; 

    React.useEffect(() => {
        if(user.data.uid) {
            setLoggedIn(true) ; 
        } else {
            setLoggedIn(false) ; 
        }
    },[user.data])

    return(
        !loggedIn ?
            <OnboardingScreen/>
        :
            <Home/>
    )
}