import React from 'react' ; 
import {
    globals
} from '../../../../Styles/globals' ; 
import {
    Item,
    Picker
} from 'native-base' ; 

export default function PickLift({onPickAccessoryLift,muscleGroup}) {
    return(

        <Item  style={[globals.paddingTop]}>
            <Picker
                mode="dropdown"
                onValueChange={(muscleGroup) => onPickAccessoryLift(muscleGroup)}
                selectedValue={muscleGroup || false}
            >
                <Picker.Item label="Muscle Group" value={false}/>
                <Picker.Item label="Back" value="back"/>
                <Picker.Item label="Biceps" value="biceps"/>
                <Picker.Item label="Chest" value="chest"/>
                <Picker.Item label="Core" value="core"/>
                <Picker.Item label="Legs" value="legs"/>
                <Picker.Item label="Shoulders" value="shoulders"/>
                <Picker.Item label="Triceps" value="triceps"/>
            </Picker>
        </Item>         
    )
}

