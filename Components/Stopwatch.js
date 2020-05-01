import React from 'react' ; 
import {useState} from 'react' ; 
import {Stopwatch} from 'react-native-stopwatch-timer' ; 
import {StyleSheet,View} from 'react-native' ; 

import { Button,Icon } from 'native-base' ; 

import { globals, colorCodes,text,colors} from '../Styles/globals.js' ; 

export default function stopwatch({title = "",
                                   start = () => {},
                                   end = () => {},
                                   pause = () => {},
                                   props = {}
                                 }) {

    var [started,updateStart] = useState(false) ;
    var [paused,updatePause] = useState(false) ;
    var [reset,updateReset] = useState(false) ; 

    var [toggled,updateToggled] = useState(false) ;

    function stopwatchNotStarted() {
        updateStart(!started) ; 
        toggleStopwatch() ; 
        start() ; 
    }

    function stopwatchStartedButNotPaused() {
        updatePause(!paused) ; 
        toggleStopwatch() ; 
        pause(); 
    }

    function stopwatchStartedButPaused() {
        updatePause(!paused) ; 
        toggleStopwatch() ; 
    }

    function toggleStopwatch() {
        updateToggled(!toggled) ; 
        updateReset(false) ; 
    }
    function resetStopwatch() {
        updateStart(false) ;
        updateReset(true); 
        updatePause(false) ;
        updateToggled(false) ;  
        end() ; 
    } 

    const iconStyle = [globals.h3,text.bold,colors.colorPrimary]  ;
    return (
            <View style={[globals.flexRow,props.style]}>
                <Button 
                    style={[styles.button]} 
                    transparent
                    onPress={() => {!started? false : resetStopwatch()} }
                >
                    <Icon 
                        name="stop" 
                        type="FontAwesome"
                        style={[...iconStyle,(!started ? colors.colorGrey : colors.colorPrimary)]} 
                    />
                </Button>
                <View style={{flex:.6}}>
                    <Stopwatch options={stopwatchStyle} start={toggled} reset={reset}/>
                </View>    
                <Button 
                    style={[styles.button]} 
                    transparent
                    onPress={() => { !started ? stopwatchNotStarted() : (!paused ? stopwatchStartedButNotPaused() : stopwatchStartedButPaused()) }}
                >
                    <Icon 
                        name={!started ? "play" : (!paused ? "pause" : "play")} 
                        type="Feather"
                        style={[...iconStyle]} 
                    />
                </Button>
            </View>
    )
}


const stopwatchStyle = StyleSheet.create({
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