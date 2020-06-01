import React from 'react'; 
import {
    Item,
    Label,
    Input
} from 'native-base' ;
import {
    globals,
    colors
} from '../../Styles/globals'

export default function TextInput({onChangeText,label,type}) {
    return(
        <Item fixedLabel>
            <Label style={[globals.h5,colors.colorPrimaryLighter,{padding:5}]}>{label}</Label>
            <Input 
                style={[globals.h5,colors.colorPrimary]} 
                onChangeText={(name) => onChangeText(name)}
                textContentType={type}
                secureTextEntry={type === 'password' ? true : false}
            />
        </Item>
    )
}