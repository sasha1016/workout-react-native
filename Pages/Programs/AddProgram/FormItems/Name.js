import React from 'react' ; 
import {
    globals,
    colors
} from '../../../../Styles/globals' ; 
import {
    Item,
    Label,
    Input
} from 'native-base' ; 

export default function Name({onChangeName}) {
    return (
        <Item inlineLabel >
            <Label style={[globals.h5,colors.colorPrimaryLighter,{padding:5}]}>Name</Label>
            <Input 
                style={[globals.h5,colors.colorPrimary]} 
                onChangeText={(name) => onChangeName(name)}
            />
        </Item>
    )
}