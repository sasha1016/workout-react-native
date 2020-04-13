import React, {useLayoutEffect,useState} from 'react' ; 
import {View,Text, StyleSheet,ScrollView} from 'react-native' ; 

import { globals, text, colors,colorCodes} from '../Styles/globals.js' ; 

import Stopwatch from '../Components/Stopwatch.js' ; 
import Timer from '../Components/Timer.js' ; 
import SetReview from '../Components/SetReview/SetReview' ; 

import moment from 'moment' ;


export default function Set({navigation,route}) {

    var [setStatus,updateSetStatus] = useState({started:false,ended:false,startedTime:'',endedTime:''}) ; 

    const onSetEnd = () => {
        let ended = new Date() ; 
        updateSetStatus({
            ...setStatus,
            ended:true,
            endedTime:ended,
        }) ; 
    }

    const onSetStart = () => {
        navigation.setOptions({
            headerLeft:null,
        }) ; 
        let started = new Date() ; 
        updateSetStatus({
            ...setStatus,
            started:true,
            startedTime:started,
        }) ; 
    }

    const onSetReviewSubmitted = (setReview) => {
        var setInformation = {...setStatus} ; 
        delete setInformation['started'] ; delete setInformation['ended'] ;

        setInformation = {...setInformation, ...setReview,id:route.params.set.id} ; 

        route.params.onSetCompleted(setInformation) ;
        navigation.goBack() ;                 
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            title:`Set ${route.params.current + 1} of ${route.params.total }`
        })
    })

    return (
        <ScrollView>
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
                                <Timer duration={45} />
                            </View>
                            <SetReview repsInSet={route.params.set.reps} onSetReviewSubmitted={onSetReviewSubmitted}/>
                        </View>
                }
            </View>
        </ScrollView>
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
