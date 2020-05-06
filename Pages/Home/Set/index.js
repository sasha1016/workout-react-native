import React, {useContext,useState} from 'react' ; 
import { View, Text, ScrollView} from 'react-native' ; 

import  {
    globals,
    text,
    colors,
    colorCodes
} from '../../../Styles/globals.js';

import CustomListItem from '../../../Components/ListItem2' ; 

import { WorkoutContext } from '../Contexts/index' ;
import { ExerciseContext } from '../Contexts/exercise' ; 

import Stopwatch from '../../../Components/Stopwatch.js' ; 
import Timer from '../../../Components/Timer.js';

import Divider from 'react-native-divider' ; 

import SetReview from '../../../Components/SetReview/SetReview' ; 

import {
    API,
    V1
} from '../../../config/api' ; 

const axios = require('axios') ; 


const INITIAL_SET_DETAILS = {
    completed:false,
    timeTaken:0,
    started:false,  
}

const postSetReview = (review,setId,callback) => {
    axios.post(API.V1,V1.USER.ROUTINES.SET.ADD, {
        review,
        set
    })
}


export default function Set({navigation,route}) {


    const state = useContext(WorkoutContext) ; 

    const [setDetails,updateSetDetails] = useState(INITIAL_SET_DETAILS) ; 

    React.useEffect(() => {
        navigation.setOptions({
            title:`Set ${route.params.setNo} of ${route.params.totalSets}`
        })
    }) ; 

    const setStart = () => {
        let startTime = (new Date).getTime() ; 
        updateSetDetails({
            ...setDetails,
            timeTaken:startTime,
            started:true,
        }) ; 
        (!state.exercise.started? state.reducers.exercise.set({...state.exercise,started:true}) : null ) ; 
 
    }

    const setComplete = () => {
        let timeTaken = Math.ceil( ( parseInt((new Date).getTime()) - parseInt(setDetails.timeTaken) ) / 1000) ; 
 
        updateSetDetails({...setDetails,timeTaken,completed:true}) ; 

        state.reducers.exercise.updateSetStatus(route.params.set._id); 
        state.reducers.workout.set({...state.workout,setStarted:false}) ; 
    }

    const onSetReviewSubmitted = (review) => {
        updateSetDetails({
            ...review,
            timeTaken:setDetails.timeTaken,
        }) ; 
        console.warn(setDetails,review) ;
    }



    return (
        <React.Fragment>
            <ScrollView style={[globals.flex]}>
                <View 
                    pointerEvents={!setDetails.completed ? "auto": "none"}
                    style={[globals.listContainer,{opacity:(!setDetails.completed ? 1 : 0.3)}]}
                >
                    <CustomListItem
                        title="Reps"
                        desc={[route.params.set.reps.toString()]}
                        mode="INFO"
                    />
                    <CustomListItem
                        title="Weight"
                        desc={[(route.params.set.percentage || route.params.set.weightFactor).toString()]}
                        mode="INFO"
                    />
                </View>

                <Divider borderColor={colorCodes.grey} orientation="center">
                    <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>
                        {setDetails.completed ? "Rest Timer" : "Set Timer"}
                    </Text>   
                </Divider>

                <View style={{paddingTop:10,paddingBottom:10}}>
                    {
                        !setDetails.completed ? 
                            <Stopwatch 
                                disabled={!state.workout.started}
                                title="set" 
                                start={() => setStart()} 
                                end={() => setComplete()}
                            /> 
                        : 
                            <View style={{flex:1,justifyContent:'center'}}><Timer duration={120}/></View> }
                </View>

                <Divider style={{marginTop:20,marginBottom:20}} borderColor={colorCodes.grey} orientation="center">
                    <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>Set Review</Text>   
                </Divider>

                <View 
                    pointerEvents={setDetails.completed ? "auto": "none"}
                    style={[{opacity:(setDetails.completed ? 1 : 0.3),paddingBottom:20}]}
                >
                    <SetReview repsInSet={route.params.set.reps} onSetReviewSubmitted={onSetReviewSubmitted}/>

                </View>
            </ScrollView>
        </React.Fragment>
    ) ; 
 

}
