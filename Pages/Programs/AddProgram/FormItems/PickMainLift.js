import React from 'react' ; 
import {
    globals
} from '../../../../Styles/globals' ; 
import {
    Item,
    Picker
} from 'native-base' ; 

export default function PickLift({onPickMainLift,liftName}) {
    return(

        <Item  style={[globals.paddingTop]}>
            <Picker
                mode="dropdown"
                onValueChange={(liftName) => onPickMainLift(liftName)}
                selectedValue={liftName || false}
            >
                <Picker.Item label="Lift" value={false}/>
                <Picker.Item label="Squat" value="squat"/>
                <Picker.Item label="Bench" value="bench"/>
                <Picker.Item label="Deadlift" value="deadlift"/>
            </Picker>
        </Item>
    )
}

