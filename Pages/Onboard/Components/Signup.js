import React from 'react' ;
import {
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native'; 
import {TextInput} from '../../../Components/FormItems/index'
import BlockButton from '../../../Components/BlockButton'
import {
    colorCodes,
    globals,
    text,
    colors,
    COMPOUNDS
} from '../../../Styles/globals' 

const SignUp = ({toggler,onSignup}) => {

    const INITIAL_CREDENTIALS = {
        email:null,
        password:null,
        passwordConfirmed:null,
        fname:null,
        lname:null
    }

    const [credentials,setCredentials] = React.useState(INITIAL_CREDENTIALS)

    return(
        <View>
            <Text style={[
                globals.h2,
                text.bold,
                colors.colorPrimary,
                {
                    borderBottomWidth:1,
                    borderBottomColor:colorCodes.grey,
                    paddingBottom:20,
                    marginBottom:10
                }
            ]}>
                Sign Up
            </Text>
            <TextInput 
                label='First Name'
                type='name'
                onChangeText={(fname) => setCredentials({...credentials,fname})}
            />
            <TextInput 
                label='Last Name'
                type='name'
                onChangeText={(lname) => setCredentials({...credentials,lname})}
            />
            <TextInput 
                label='Email'
                type='emailAddress'
                onChangeText={(email) => setCredentials({...credentials,email})}
            />
            <TextInput 
                label='Password'
                type='password'
                onChangeText={(password) => setCredentials({...credentials,password})}
            />
            <TextInput 
                label='Confirm Password'
                type='password'
                onChangeText={(passwordConfirmed) => setCredentials({...credentials,passwordConfirmed})}
            />

            <BlockButton
                title="Sign Up"
                onPress={() => onSignup(credentials)}
                top={30}
                bottom={10}
                background={colorCodes.primary}
                color={colorCodes.grey}
                disabled={credentials.password !== credentials.passwordConfirmed || !credentials.password || !credentials.email}
            />
            <Text style={[
                ...COMPOUNDS.tidbit
            ]}>
                Already a user? 
                <TouchableWithoutFeedback onPress={() => toggler()}>
                    <Text style={colors.colorPrimary}> Log In</Text>
                </TouchableWithoutFeedback>
            </Text>
        </View>
    )
}

export default SignUp; 