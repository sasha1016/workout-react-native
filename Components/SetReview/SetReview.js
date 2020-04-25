import React,{useState} from 'react'  ;

import {ToggleButton,Button} from 'react-native-paper' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 
import SliderInput from './Components/SliderInput' ; 
import SetNotCompletedAsPlanned from './Components/SetNotCompletedAsPlanned/' ; 

import {View,Text,StyleSheet} from 'react-native' ; 





export default function({repsInSet = 0,onSetReviewSubmitted = () => {}}) {

        var [totalSetBreakdown,updateTotalSetBreakdown] = useState(repsInSet) ;

        var [setReview,updateSetReview] = useState({
            completedAsPlanned:true,
            setBreakdown:[],
            technique:0,
            rating:0,
        }) ; 

        var reducers = {updateSetReview,updateTotalSetBreakdown} ; 

        var state = {setReview,totalSetBreakdown,repsInSet}; 

        return (
            <View style={globals.paddingTop}>

                <View>
                    <Text style={[text.h5,text.bold,colors.colorPrimary]}>
                        Did you finish the set as per the plan? 
                    </Text>
                    <ToggleButton.Row 
                        style={[styles.toggleButtonContainer,globals.paddingTop,{borderRadius:5}]}
                        onValueChange={(val) => {updateSetReview({...setReview,completedAsPlanned:val})}}
                    >
                        <ToggleButton
                            style={[styles.toggleButton]}
                            icon="check"
                            color={colorCodes.success}
                            status={(setReview.completedAsPlanned ? 'checked' : 'unchecked')}
                            value={true}
                        />
                        <ToggleButton
                            style={styles.toggleButton}
                            color={colorCodes.danger}
                            icon="close"
                            status={(!setReview.completedAsPlanned ? 'checked' : 'unchecked')}
                            value={false}
                        />
                    </ToggleButton.Row>

                    {
                        !setReview.completedAsPlanned ? 
                            <SetNotCompletedAsPlanned state={state} reducers={reducers}/>
                        : 
                            null 
                    }

                </View>
                <View >

                    <SliderInput sliderValue={setReview.rating} title="How was the set?" onUpdate={ (val) => updateSetReview({...setReview,rating:val})} />

                </View>
                <View style={globals.paddingTop}>

                    <SliderInput sliderValue={setReview.technique} title="How was your technique?" onUpdate={ (val) => updateSetReview({...setReview,technique:val})} />
  
                </View>          
                <Button 
                    disabled={(setReview.rating == 0 || setReview.technique == 0 || (setReview.completedAsPlanned ? false : (totalSetBreakdown != 0 )))}
                    mode="outlined"
                    icon="check"
                    style={{marginTop:40}}
                    color={colorCodes.primary}
                    onPress={() => onSetReviewSubmitted(setReview)}
                >
                            Submit
                </Button>
            </View>
        ) ; 

}



const styles = StyleSheet.create({
    toggleButton:{
        flex:1
    },
    sliderValue:{
        flex:.2
    }
})