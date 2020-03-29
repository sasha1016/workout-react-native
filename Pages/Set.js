import React, {useEffect,useState} from 'react' ; 
import {View,Text, StyleSheet} from 'react-native' ; 

import { globals, text, colors,colorCodes} from '../Styles/globals.js' ; 

import Stopwatch from '../Components/Stopwatch.js' ; 
import Timer from '../Components/Timer.js' ; 

import moment from 'moment' ;

import {ToggleButton, Button} from 'react-native-paper' ; 
import {Slider} from 'react-native';

export default function Set({navigation,route}) {

    var [setStatus,updateSetStatus] = useState({started:false,ended:false,startedTime:'',endedTime:''}) ; 
    var [setRating,updateSetRating] = useState(0) ; 
    var [setRating2,updateSetRating2] = useState(0) ; 

    const onSetEnd = () => {
        let ended = new Date() ; 
        updateSetStatus({
            ...setStatus,
            ended:true,
            endedTime:ended,
        }) ; 
    }

    const onSetStart = () => {
        let started = new Date() ; 
        updateSetStatus({
            ...setStatus,
            started:true,
            startedTime:started,
        }) ; 
    }


    useEffect(() => {
        navigation.setOptions({
            title:`Set ${route.params.current + 1} of ${route.params.total }`
        })
    })

    return (
        <View style={globals.rootContainer}>
            {
                !setStatus.ended ?
                    <View>
                        <View>
                            <Text style={[globals.h3,text.center,text.lowercase,text.bold]}>{`${route.params.set.weight} kg x ${route.params.set.reps} reps`}</Text>
                        </View>
                        <View style={globals.paddingTop}>
                            <Stopwatch title="set" start={onSetStart} end={onSetEnd}/>
                        </View>
                    </View>
                : 
                    <View>
                        <Text style={[text.bold,colors.colorPrimary]}>You killed the set in {moment(setStatus.startTime).fromNow(true)}</Text>
                        <View style={globals.paddingTop}>
                            <Timer duration={20} />
                        </View>
                        <View style={globals.paddingTop}>
                            <View>
                                <Text style={[text.h5,text.bold,colors.colorPrimary]}>
                                    Did you finish the set as per the plan? 
                                </Text>
                                <ToggleButton.Row style={[styles.toggleButtonContainer,globals.paddingTop,{borderRadius:5}]}>
                                    <ToggleButton
                                        style={[styles.toggleButton]}
                                        icon="check"
                                        color={colorCodes.success}
                                        value="Yes"
                                    />
                                    <ToggleButton
                                        style={styles.toggleButton}
                                        color={colorCodes.danger}
                                        icon="close"
                                        value="No"
                                    />
                                </ToggleButton.Row>
                            </View>
                            <View style={globals.paddingTop}>
                                <Text style={[text.h5,text.bold,colors.colorPrimary]}>
                                    How was the set?
                                </Text>
                                <View style={[globals.paddingTop]}>
                                    <Slider minimumValue={0} 
                                            maximumValue={10}
                                            onValueChange={value => updateSetRating2(value)} 
                                            minimumTrackTintColor={colorCodes.primaryLighter}
                                            thumbTintColor={colorCodes.primary}
                                            step={1} 
                                            style={styles.slider}/>
                                </View>
                                <Text 
                                    style={[
                                        globals.h3,
                                        text.bold,
                                        globals.paddingTop,
                                        (setRating2 > 7 ? colors.colorSuccess : (setRating2 < 4 ? colors.colorDanger : colors.colorPrimary)),
                                        text.center]}>
                                    {setRating2}
                                </Text>
                            </View>
                            <View style={globals.paddingTop}>
                                <Text style={[text.h5,text.bold,colors.colorPrimary]}>
                                    How was your technique? 
                                </Text>
                                <View style={[globals.paddingTop]}>
                                    <Slider minimumValue={0} 
                                            maximumValue={10}
                                            minimumTrackTintColor={colorCodes.primaryLighter}
                                            thumbTintColor={colorCodes.primary}
                                            onValueChange={value => updateSetRating(value)} 
                                            step={1} 
                                            style={styles.slider}/>
                                </View>
                                <Text 
                                    style={[
                                        globals.h3,
                                        text.bold,
                                        globals.paddingTop,
                                        (setRating > 7 ? colors.colorSuccess : (setRating < 4 ? colors.colorDanger : colors.colorPrimary)),
                                        text.center]}>
                                    {setRating}
                                </Text>
                            </View>
                        </View>
                        <Button 
                            mode="outlined"
                            icon="check"
                            style={[globals.paddingTop]}
                            color={colorCodes.primary}
                            onPress={() => {}}
                        >
                            Submit
                        </Button>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    toggleButton:{
        flex:1
    },
    sliderValue:{
        flex:.2
    }
})
