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

const Login = ({toggler,onLogin}) => {

    const [credentials,setCredentials] = React.useState({email:null,password:null})

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
                Login
            </Text>
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
            <BlockButton
                title="Login"
                onPress={() => onLogin(credentials)}
                top={30}
                bottom={10}
                background={colorCodes.primary}
                color={colorCodes.grey}
                disabled={!credentials.password || !credentials.email}
            />
            <Text style={[
                ...COMPOUNDS.tidbit
            ]}>
                Not registered? 
                <TouchableWithoutFeedback onPress={() => toggler()}>
                    <Text style={colors.colorPrimary}> Sign Up</Text>
                </TouchableWithoutFeedback>
            </Text>
        </View>
    )
} 

export default Login ;