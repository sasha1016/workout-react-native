import React from 'react' ; 
import {useState} from 'react' ; 
import {Stopwatch} from 'react-native-stopwatch-timer' ; 
import {StyleSheet,View} from 'react-native' ; 

import { Button } from 'react-native-paper' ; 

import { globals, colorCodes, colors} from '../Styles/globals.js' ; 

export default function stopwatch({title = "",
                                   start = () => {},
                                   end = () => {},
                                   pause = () => {}
                                 }) {

    var [started,updateStart] = useState(false) ;
    var [paused,updatePause] = useState(false) ;
    var [reset,updateReset] = useState(false) ; 

    var [toggled,updateToggled] = useState(false) ;

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
    return (
        <View>
            <View>
            <View style={[styles.setControlButtonsContainer]}>
                {
                    !started ?
                        <Button 
                            disabled={started}
                            mode="contained"
                            style={[colors.colorSecondary,colors.bgPrimary,styles.setControlButtons,{marginRight:5}]} 
                            icon="check" 
                            contentStyle={colors.colorSecondary}
                            onPress={() => {
                                updateStart(!started) ; 
                                toggleStopwatch() ; 
                                start() ; 
                            }}
                        >
                            Start {title}
                        </Button>
                    : 
                        (
                            !paused ? 
                                <Button 
                                    mode="contained"
                                    style={[styles.setControlButtons,colors.bgPrimary,{marginRight:5}]} 
                                    icon="pause" 
                                    contentStyle={colors.colorSecondary}
                                    onPress={() => {
                                        updatePause(!paused) ; 
                                        toggleStopwatch() ; 
                                        pause(); 
                                    }}
                                >
                                    Pause {title}
                                </Button> 
                            :
                                <Button 
                                    mode="contained"
                                    style={[styles.setControlButtons,colors.bgPrimary,{marginRight:5}]} 
                                    icon="play" 
                                    contentStyle={colors.colorSecondary}
                                    onPress={() => {
                                        updatePause(!paused) ; 
                                        toggleStopwatch() ; 
                                    }}
                                >
                                    Resume {title}
                                </Button>           
                        )       
                }
                <Button disabled={!started} 
                        mode="outlined" 
                        style={[styles.setControlButtons,{borderColor:colorCodes.danger,marginLeft:5}]} 
                        icon="close" 
                        color={colorCodes.danger}
                        onPress={() => {
                            resetStopwatch() ; 
                        }}
                >
                    End {title}
                </Button>
            </View>
            </View>
            <View style={globals.paddingTop}>
                <Stopwatch options={stopwatchStyle} start={toggled} reset={reset}/>
            </View>
        </View>
    )
}


const stopwatchStyle = StyleSheet.create({
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
})



const styles = StyleSheet.create({
    setControlButtonsContainer:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    }, 
    setControlButtons:{
        flex:.5
    }
}) ; 