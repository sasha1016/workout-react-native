import React from 'react' ; 
import {RadioButtons,RadioButton} from '../FormComponents/RadioButtons' ; 

export default function WeightFactor({onSelectWeightFactor,weightFactor}) {
    return (
        <RadioButtons>
            <RadioButton
                selected={weightFactor === "percentage"}
                onSelected={() => onSelectWeightFactor("percentage")}
            >
                <RadioButton.Label>Percentage</RadioButton.Label>
            </RadioButton>
            <RadioButton   
                selected={weightFactor === "absolute"}
                onSelected={() => onSelectWeightFactor("absolute")}
            >
                <RadioButton.Label>Absolute</RadioButton.Label>
            </RadioButton>
        </RadioButtons>        
    )
}