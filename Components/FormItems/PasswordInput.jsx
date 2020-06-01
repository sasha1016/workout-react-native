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

export default function TextInput({onChangeText}) {
    return(
        <Item inlineLabel>
            <Label style={[globals.h5,colors.colorPrimaryLighter,{padding:5}]}>Password</Label>
            <Input 
                style={[globals.h5,colors.colorPrimary]} 
                onChangeText={(name) => onChangeText(name)}
                textContentType="password"
            />
        </Item>
    )
}