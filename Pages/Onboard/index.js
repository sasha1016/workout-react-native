import React from 'react' ;
import {
    View
} from 'react-native'; 
import { globals } from '../../Styles/globals' 
import { UserContext } from '../../Layout/Contexts';
import User from '../../Classes/User' ;
import {Login,Signup} from './Components'



function Onboard() {
    
    const [displayLogin,setDisplayLogin] = React.useState(false) ; 
    const user = React.useContext(UserContext); 

    function toggler() {
        setDisplayLogin(!displayLogin)
    }

    
function _loginUser(credentials) {
    User.login(credentials)
    .then(user => {
        return User.initiailize(user.uid) ; 
    })
    .then((credentials) => {
        user.set({...credentials}) ;
    })
    .catch(error => {
        console.warn(error) ; 
    })
}

function _signupUser(credentials) {
    User.signup(credentials)
    .then((credentials) => {
        user.set({...credentials}) ;
    })
    .catch((error) => {
        console.warn(error) ; 
    })
}


    return (
        <View style={[
            globals.flex,
            globals.flexColumn,
            globals.rootContainer,
            {
                justifyContent:'center'
            }
        ]}>
            {
                !displayLogin ?
                    <Signup toggler={toggler} user={user} onSignup={_signupUser}/>
                :
                    <Login toggler={toggler} user={user} onLogin={_loginUser}/>
            }
        </View>
    )
}

export default Onboard ; 