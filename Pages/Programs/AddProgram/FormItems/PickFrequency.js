import React from 'react' ; 
import {
    globals
} from '../../../../Styles/globals' ; 
import {
    Item,
    Picker
} from 'native-base' ; 

export default function PickLift({onPickFrequency,frequency}) {
    return(
        <Item picker style={[globals.paddingTop]}>
            <Picker
                mode="dropdown"
                selectedValue={frequency}
                onValueChange={(frequency) => onPickFrequency(frequency)}
            >
                <Picker.Item label="Frequency" value={0} />
                <Picker.Item label="1 x week" value={1} />
                <Picker.Item label="2 x week" value={2} />
                <Picker.Item label="3 x week" value={3} />
                <Picker.Item label="4 x week" value={4} />
                <Picker.Item label="5 x week" value={5} />
                <Picker.Item label="6 x week" value={6} />
                <Picker.Item label="7 x week" value={7} />
            </Picker>
        </Item>     
    )
}