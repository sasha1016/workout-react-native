import React from 'react';
import {Timer} from 'react-native-stopwatch-timer' ; 
import {StyleSheet,View} from 'react-native' ; 

import { Button } from 'native-base' ; 


import { colorCodes,globals,text,colors } from '../Styles/globals.js' ; 


export default function timer({duration=10,onFinish = () => {}}) {

    return (
        <View style={[globals.flexRow]}>
            <Button 
                style={[styles.button]} 
                transparent
            ></Button>
            <View style={{flex:.6}}>
                <Timer options={timerStyle} start={true} totalDuration={(duration * 1000)} handleFinish={() => onFinish()} />
            </View>    
            <Button 
                style={[styles.button]} 
                transparent
            >
            </Button>
        </View>
    )
}


const timerStyle = StyleSheet.create({
    container:{
        backgroundColor:'transparent',
        borderRadius:5,
        flex:1,
        justifyContent:'center',
        borderColor:colorCodes.grey,
        borderWidth:1
    },
    text:{
        textAlign:'center',
        fontWeight:'700',
        color:colorCodes.primary,
        fontSize:15,
        letterSpacing:1
    }
})



const styles = StyleSheet.create({
    setControlButtonsContainer:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    }, 
    setControlButtons:{
        flex:.5
    }, 
    button:{
        flex:.2,
        justifyContent:'center'
    }
}) ; 