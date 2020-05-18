import React from 'react' ; 
import {RadioButtons,RadioButton} from '../FormComponents/RadioButtons' ; 

export default function Type({onSelectType,type}) {
    return (        
        <RadioButtons>
            <RadioButton
                selected={type == "strength"}
                onSelected={() => onSelectType("strength")}
            >
                <RadioButton.Label>Strength</RadioButton.Label>
            </RadioButton>
            <RadioButton   
                selected={type == "hypertrophy"}
                onSelected={() => onSelectType("hypertrophy")}
            >
                <RadioButton.Label>Hypertrophy</RadioButton.Label>
            </RadioButton>
        </RadioButtons>
    )
}