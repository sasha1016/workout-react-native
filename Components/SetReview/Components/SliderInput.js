import React from 'react'

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 

import {View,Text,Slider} from 'react-native' ; 


export default function SliderInput({sliderValue = 0,onUpdate = () => {},title = ""}) {
    return (
        <View style={globals.paddingTop}>

            <Text style={[text.h5,colors.colorPrimary]}>
                <Text>
                    {`${title}  `} 
                </Text>
                <Text style={[
                                (sliderValue > 7 ? colors.colorSuccess : (sliderValue < 4 ? colors.colorDanger : colors.colorNeutral))
                ]}>
                    {sliderValue === 0 ? null : sliderValue}
                </Text>
            </Text>
            <View style={[globals.paddingTop]}>
                <Slider minimumValue={0} 
                        maximumValue={10}
                        onValueChange={value => onUpdate(value)} 
                        minimumTrackTintColor={colorCodes.primaryLighter}
                        thumbTintColor={colorCodes.primary}
                        step={1}
                />
            </View>
        </View>
    )
}