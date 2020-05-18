import React from 'react' ; 
import Divider from 'react-native-divider' ; 
import {Text} from 'react-native' ; 
import  {
    globals,
    text,
    colors,
    colorCodes
} from '../Styles/globals';

export default function CustomDivider({title,top = 0 ,bottom = 0}) {
    return(
        <Divider borderColor={colorCodes.grey} orientation="center" style={{marginBottom:0,paddingBottom:0,height:0}}>
            <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>
                {`${title}  `}
            </Text>   
        </Divider>
    )
}