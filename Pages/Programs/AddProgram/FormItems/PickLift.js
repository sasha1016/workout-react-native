import React from 'react' ; 
import {
    globals
} from '../../../../Styles/globals' ; 
import {
    Item,
    Picker
} from 'native-base' ; 

export default function PickLift({onPickLift,lift}) {
    return(
        <Item  style={[globals.paddingTop]}>
            <Picker
                mode="dropdown"
                onValueChange={(lift) => onPickLift(lift)}
                selectedValue={lift || false}
            >
                <Picker.Item label="Lift" value={false}/>
                <Picker.Item label="Main Lift" value="main"/>
                <Picker.Item label="Accessory" value="accessory"/>
            </Picker>
        </Item>
    )
}

