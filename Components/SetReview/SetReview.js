import React,{useState} from 'react'  ;
import { 
    RadioButtons, 
    RadioButton
} from '../../Pages/Programs/AddProgram/FormComponents/RadioButtons'
import {globals,colors} from '../../Styles/globals' ; 
import SliderInput from './Components/SliderInput' ; 
import SetNotCompletedAsPlanned from './Components/SetNotCompletedAsPlanned/' ; 
import {
    View,
    Text
} from 'react-native' ; 

import BlockButton from '../BlockButton' ;


const SliderInputFormElement = ({value,title,onUpdate}) => {
    return(
        <View>
            <SliderInput sliderValue={value} title={title} onUpdate={ (val) => onUpdate(val)} />
        </View>
    )
}


export default function SetReview({repsInSet = 0,onSetReviewSubmitted = () => {}}) {

        var [totalSetBreakdown,updateTotalSetBreakdown] = useState(repsInSet) ;

        var [setReview,updateSetReview] = useState({
            completedAsPlanned:true,
            setBreakdown:[], 
            setBreakdownCompleted:false,   
            technique:0,
            rating:0,
        }) ; 

        var buttonDisabled = !(setReview.technique !== 0 && setReview.rating !== 0 && (!setReview.completedAsPlanned ? setReview.setBreakdown.length !== 0 : true)) ; 
        var reducers = {updateSetReview,updateTotalSetBreakdown} ; 
        var state = {setReview,totalSetBreakdown,repsInSet}; 

        return (
            <View style={[globals.rootContainer,{marginBottom:0}]}>

                <View>
                    <Text style={[globals.h5,colors.colorPrimary]}>
                        Did you finish the set as per the plan? 
                    </Text>
                    <RadioButtons>
                        <RadioButton 
                            onSelected={() => updateSetReview({...setReview,completedAsPlanned:!setReview.completedAsPlanned})}
                            selected={setReview.completedAsPlanned}
                        >
                            <RadioButton.Label>Yes</RadioButton.Label>
                        </RadioButton>
                        <RadioButton 
                            onSelected={() => updateSetReview({...setReview,completedAsPlanned:!setReview.completedAsPlanned})}
                            selected={!setReview.completedAsPlanned}
                        >
                            <RadioButton.Label>No</RadioButton.Label>
                        </RadioButton>
                    </RadioButtons>

                    {
                        !setReview.completedAsPlanned ? 
                            <SetNotCompletedAsPlanned state={state} reducers={reducers}/>
                        : 
                            null 
                    }

                </View>

                <SliderInputFormElement 
                    value={setReview.rating} 
                    title="How was the set?"
                    onUpdate={(value) => updateSetReview({...setReview,rating:value})}
                />
                <SliderInputFormElement 
                    value={setReview.technique} 
                    title="How was your technique?"
                    onUpdate={(value) => updateSetReview({...setReview,technique:value})}
                />

                <BlockButton 
                    disabled={buttonDisabled}
                    title="Submit" 
                    onPress={() => onSetReviewSubmitted(setReview)}
                    bottom={0}
                />
                
            </View>
        ) ; 

}