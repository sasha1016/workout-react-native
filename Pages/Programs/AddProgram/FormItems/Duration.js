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

export default function Duration({onChangeDuration}) {
    return (
        <Item inlineLabel style={[globals.paddingTop]}>
            <Label style={[globals.h5,colors.colorPrimaryLighter,{padding:5}]}>Duration</Label>
            <Input 
                keyboardType="numeric" 
                style={[globals.h5,colors.colorPrimary]} 
                onChangeText={(duration) => onChangeDuration(duration)}
            />
        </Item>
    )
}