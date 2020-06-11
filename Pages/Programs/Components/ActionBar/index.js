import React from 'react' ; 
import { StyleSheet } from 'react-native' ; 
import {
    Button,
    FooterTab,
    Text, 
} from 'native-base' ; 
import { globals,text,colors,colorCodes } from '../../../../Styles/globals'


export default function ActionBar({onDelete = () => {},onStart = () => {}}) {
    return (
        <FooterTab style={footer.container}>
            {/* <Button 
                transparent
                onPress={() => onStart()}
            >
                <Text
                    style={[globals.h6,text.uppercase,colors.colorPrimary,text.bold]}
                >
                    Start
                </Text>
            </Button> */}
            <Button 
                transparent
                onPress={() => onDelete()}
            >
                <Text
                    style={[globals.h6,text.uppercase,colors.colorPrimary,text.bold]}
                >
                    End A Program
                </Text>
            </Button>
        </FooterTab>
    )
}

const footer = StyleSheet.create({
    container:{
        position:"absolute",
        bottom:0,
        flex:1,
        left:0,
        right:0,
        width:"100%", 
        backgroundColor:colorCodes.grey,
    }
}) ;