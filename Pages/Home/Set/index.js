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

import {
    getCurrentEpoch
} from '../../../Utilities/index' ; 

import Divider from 'react-native-divider' ; 

import SetReview from '../../../Components/SetReview/SetReview' ; 

import {
    API,
    V1,
    TEST
} from '../../../config/api' ; 

const axios = require('axios') ; 


const INITIAL_SET_DETAILS = {
    completed:false,
    timeTaken:0,
    started:false,  
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

        (!state.exercise.started ? state.reducers.exercise.start(route.params.exercise._id) : null ) ; 
    }

    const setComplete = () => {
        let timeTaken = Math.ceil( ( parseInt((new Date).getTime()) - parseInt(setDetails.timeTaken) ) / 1000) ; 
 
        updateSetDetails({...setDetails,timeTaken,completed:true}) ; 

        
        //state.reducers.exercise.updateSetStatus(route.params.set._id); 
        //state.reducers.workout.set({...state.workout,setStarted:false,rest:{status:true,duration:120,timeStarted:getCurrentEpoch()}}) ;
    }

    
    const postSetReview = (review,setId,callback) => {
        axios.post(API.V1,V1.USER.ROUTINES.SET.ADD, {
            user:TEST.USER,
            day:state.workout.day,
            review,
            id:setId
        }).then(() => {
            callback(); 
        })
    }

    const updateSetStatusInState = (id) => {
        let sets = state.exercise.sets ; 
        console.warn(sets) ; 
        sets.map((set,index) => {
            set._id === id ? sets[index].completed = true : false
        }) ; 
        state.reducers.exercise.set({...state.exercise,sets:sets}) ; 
    }

    const onSetReviewSubmitted = (review) => {

        let setReview = {...review,timeTaken:setDetails.timeTaken} ; 

        state.reducers.set.end(id = route.params.set._id, review = setReview) ; 

        navigation.navigate('Exercise') ; 


        // updateSetStatusInState(route.params.set._id) ; 
        // postSetReview(
        //     id = route.params.set._id,
        //     review = setReview, 
        //     () => {navigation.navigate('Exercise')}
        // )

    }

    const SetNotCompleted = () => {
        return (
            <React.Fragment>
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
                        desc={[(route.params.weight)]}
                        mode="INFO"
                    />
                </View>

                {
                    !setDetails.completed ? 
                        <React.Fragment>
                            <Divider borderColor={colorCodes.grey} orientation="center">
                                <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>
                                    Set Timer
                                </Text>   
                            </Divider>
                            <View style={{paddingTop:10,paddingBottom:10}}>
                                <Stopwatch 
                                    disabled={!state.workout.started || state.workout.rest.status}
                                    warningText={state.workout.started ? `You cannot start another set while you're resting` : `You cannot start the set as you have not started the workout` }
                                    title="set" 
                                    start={() => setStart()} 
                                    end={() => setComplete()}
                                /> 
                            </View>
                        </React.Fragment>
                    : null 
                }

                <Divider style={{marginTop:20,marginBottom:20}} borderColor={colorCodes.grey} orientation="center">
                    <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>Set Review</Text>   
                </Divider>

                <View 
                    pointerEvents={setDetails.completed ? "auto": "none"}
                    style={[{opacity:(setDetails.completed ? 1 : 0.3),paddingBottom:20}]}
                >
                    <SetReview repsInSet={route.params.set.reps} onSetReviewSubmitted={onSetReviewSubmitted}/>

                </View>
            </React.Fragment>
        )
    }


    return (
        <React.Fragment>
            <ScrollView style={[globals.flex]}>
                {
                    state.completed.sets.includes(route.params.set._id) ?
                        <Text>You completed the set big man</Text>
                    : 
                        <React.Fragment>
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
                                    desc={[(route.params.weight)]}
                                    mode="INFO"
                                />
                            </View>

                            {
                                !setDetails.completed ? 
                                    <React.Fragment>
                                        <Divider borderColor={colorCodes.grey} orientation="center">
                                            <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>
                                                Set Timer
                                            </Text>   
                                        </Divider>
                                        <View style={{paddingTop:10,paddingBottom:10}}>
                                            <Stopwatch 
                                                disabled={!state.workout.started || state.workout.rest.status}
                                                warningText={state.workout.started ? `You cannot start another set while you're resting` : `You cannot start the set as you have not started the workout` }
                                                title="set" 
                                                start={() => setStart()} 
                                                end={() => setComplete()}
                                            /> 
                                        </View>
                                    </React.Fragment>
                                : null 
                            }

                            <Divider style={{marginTop:20,marginBottom:20}} borderColor={colorCodes.grey} orientation="center">
                                <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>Set Review</Text>   
                            </Divider>

                            <View 
                                pointerEvents={setDetails.completed ? "auto": "none"}
                                style={[{opacity:(setDetails.completed ? 1 : 0.3),paddingBottom:20}]}
                            >
                                <SetReview repsInSet={route.params.set.reps} onSetReviewSubmitted={onSetReviewSubmitted}/>

                            </View>
                        </React.Fragment>
                }
            </ScrollView>
        </React.Fragment>
    ) ; 
 

}
