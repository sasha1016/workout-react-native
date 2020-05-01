import React,{useState} from 'react'  ;

import { Button, Item, Radio, Label } from 'native-base' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 
import SliderInput from './Components/SliderInput' ; 
import SetNotCompletedAsPlanned from './Components/SetNotCompletedAsPlanned/' ; 

import {View,Text,StyleSheet,Alert} from 'react-native' ; 


export default function({repsInSet = 0,onSetReviewSubmitted = () => {}}) {

        var [totalSetBreakdown,updateTotalSetBreakdown] = useState(repsInSet) ;

        var [setReview,updateSetReview] = useState({
            completedAsPlanned:true,
            setBreakdown:[],    
            technique:0,
            rating:0,
        }) ; 

        var buttonDisabled = !(setReview.technique !== 0 && setReview.rating !== 0 && (!setReview.completedAsPlanned ? setReview.setBreakdown.length !== 0 : true)) ; 

        var reducers = {updateSetReview,updateTotalSetBreakdown} ; 

        var state = {setReview,totalSetBreakdown,repsInSet}; 

        return (
            <View style={[globals.rootContainer]}>

                <View>
                    <Text style={[globals.h5,colors.colorPrimary]}>
                        Did you finish the set as per the plan? 
                    </Text>
                    <View style={[globals.flex,globals.flexRow,globals.paddingTop]}>
                        <Item inlineLabel style={[globals.flex,{borderBottomWidth:0,justifyContent:'space-between',marginRight:8}]}>
                            <Label style={[globals.h6,colors.colorPrimary,input.label]}>Yes</Label>
                            <Radio 
                                color={colorCodes.primaryLighter} 
                                selectedColor={colorCodes.primary} 
                                selected={setReview.completedAsPlanned}
                                onPress={() => updateSetReview({...setReview,completedAsPlanned:!setReview.completedAsPlanned})}
                            />
                        </Item>
                        <Item inlineLabel  style={[globals.flex,{borderBottomWidth:0,justifyContent:'space-between',marginLeft:8}]}>
                            <Label style={[globals.h6,colors.colorPrimary,input.label]}>No</Label>
                            <Radio 
                                color={colorCodes.primaryLighter} 
                                selectedColor={colorCodes.primary} 
                                selected={!setReview.completedAsPlanned}
                                onPress={() => updateSetReview({...setReview,completedAsPlanned:!setReview.completedAsPlanned})}
                            />
                        </Item>
                    </View>

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
                <View style={[{paddingTop:30},globals.flex]}>
                    <Button
                        disabled={buttonDisabled}
                        small
                        transparent
                        width={100}
                        style={[
                            globals.flex,

                            {opacity:(!buttonDisabled ? 1 : 0.4
                             ),justifyContent:'center',alignSelf:'flex-end',padding:15,borderWidth:1,borderColor:colorCodes.primaryLighter,position:'relative',borderRadius:5}
                        ]}
                        onPress={() => onSetReviewSubmitted(setReview)}
                    >
                        <Text style={[text.h5, text.center,text.bold,text.uppercase,colors.colorPrimary]}>Submit </Text>
                    </Button>    
                </View>   
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

const input = StyleSheet.create({
    label:{
        padding:5,
    }
}) ; 