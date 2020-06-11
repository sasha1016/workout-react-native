import React from 'react' ;
import { View,Text,TouchableWithoutFeedback } from 'react-native'; 
import { globals,text,colors,COMPOUNDS } from '../../../Styles/globals' 

export default function SignedUpSuccessfully({toggler}) {
    return(
        <View>
            <Text style={[
                globals.h1,
                text.bold,
                colors.colorPrimary,
                text.center,
            ]}>
                You Signed Up Successfully!
            </Text>
            <Text style={[
                ...COMPOUNDS.tidbit
            ]}>
                Click here to
                <TouchableWithoutFeedback onPress={() => toggler()}>
                    <Text style={colors.colorPrimary}> Log In</Text>
                </TouchableWithoutFeedback>
            </Text>
        </View>
    )
}
