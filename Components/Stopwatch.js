import React ,{useState} from 'react' ; 
import {StyleSheet,View, Alert,Text} from 'react-native' ; 

import { Button,Icon } from 'native-base' ; 

import { globals, colorCodes,text,colors} from '../Styles/globals.js' ; 

export default function SetController({disabled = false,
                                   warningText = "",
                                   start = () => {},
                                   end = () => {},
                                   pause = () => {},
                                   play = () => {},
                                   values = {} 
                                 }) {

    var [started,updateStart] = useState(false) ;
    var [paused,updatePause] = useState(false) ;

    function stopwatchNotStarted() {
        updateStart(!started) ; 
        start() ; 
    }

    function stopwatchStartedButNotPaused() {
        updatePause(!paused) ; 
        pause(); 
    }

    function stopwatchStartedButPaused() {
        updatePause(!paused) ; 
        play() ; 
    }

    function resetStopwatch() {
        updateStart(false) ;
        updatePause(false) ; 
        end() ; 
    } 

    const iconStyle = [globals.h3,text.bold,colors.colorPrimary]  ;
    return (
            <View style={[globals.flexRow]}>
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
                <View style={[{flex:.6},globals.flexColumn]}>
                    <Text
                        style={[
                            globals.h8,
                            colors.colorPrimaryLighter,
                            styles.info_header,
                            text.center
                        ]}
                    >
                        {started ? `Started At` : paused ? `Paused At` : ``}
                    </Text>
                    <Text
                        style={[
                            globals.h5,
                            text.bold,
                            colors.colorPrimary,
                            styles.info_content,
                            text.center
                        ]}
                    >
                        { started ? values.started : paused ? values.paused : `Not started yet` }
                    </Text>
                </View>    
                <Button 
                    style={[styles.button]} 
                    transparent
                    onPress={() => { !disabled ? !started ? stopwatchNotStarted() : (!paused ? stopwatchStartedButNotPaused() : stopwatchStartedButPaused()) : Alert.alert('Warning',warningText) }}
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
    },
    info:{
        flex:.5,
        justifyContent:'center',
        height:45,
    },
    info_header:{
        flexDirection:'column',
        flex:.25
    },
    info_content:{
        flex:.75,
    },
}) ; 