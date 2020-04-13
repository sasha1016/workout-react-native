import React from 'react';
import {Timer} from 'react-native-stopwatch-timer' ; 
import {StyleSheet,View} from 'react-native' ; 


import { colorCodes} from '../Styles/globals.js' ; 

export default function timer({duration=10,onFinish = () => {}}) {

    return (
        <View>
            <Timer options={timerStyle} start={true} totalDuration={(duration * 1000)} handleFinish={onFinish} />
        </View>
    )
}


const timerStyle = StyleSheet.create({
    container:{
        backgroundColor:'transparent',
        borderRadius:5,
        padding:10,
        borderColor:colorCodes.primary,
        borderWidth:1,
    },
    text:{
        textAlign:'center',
        fontWeight:'700',
        color:colorCodes.primary,
        fontSize:19,
        letterSpacing:1
    }
}) ; 