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

import Stopwatch from '../../../Components/Stopwatch.js' ; 


import Divider from 'react-native-divider' ; 

import SetReview from '../../../Components/SetReview/SetReview' ; 

import {
    API,
    V1,
    TEST
} from '../../../config/api' ; 

import ReasonForSkipping from '../Components/SkippingReasonForm';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import {Title} from 'react-native-paper' ; 

import Review from "../Components/Reviews"

const axios = require('axios') ; 

import Skipped from "./Components/Skipped.js";


const INITIAL_SET_DETAILS = {
    completed:false,
    timeTaken:0,
    started:false,  
}



export default function Set({navigation,route}) {


    const state = useContext(WorkoutContext) ; 
    const [intentToSkip,setIntentToSkip] = React.useState(false);   

    const [setDetails,updateSetDetails] = useState(INITIAL_SET_DETAILS) ; 

    let setCompleted = state.completed.sets.includes(route.params.set._id) ; 

    let skipped = state.skipped.sets.includes(route.params.set._id) ; 

    
    const timerDisabled = () => {
        let response = {value:false,message:""} ; 

        if(!state.workout.started) {
            response.value = true; response.message = "You cannot start the set as you have not started the workout" ; 
        } else if (state.workout.rest.status) {
            response.value = true; response.message = "You cannot start another set while you're resting" ; 
        } else if (state.current.set.started) {
            response.value = true; response.message = "You cannot start another set while doing another set" ; 
        }
        else if (state.current.exercise._id !== null && state.current.exercise._id !== route.params.exercise._id) {
            response.value = true; response.message = "You cannot only finish one exercise at a time" ; 
        }

        return response ; 
    }

    var disabled = timerDisabled() ; 

    const onSkipped = (reasons) => {
        state.reducers.routineTracker.skip(`set`,route.params.set._id,reasons) ; 
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title:`Set ${route.params.setNo} of ${route.params.totalSets}`,
            headerRight:() =>   (
                                    !setCompleted && !skipped ? 
                                        <TouchableWithoutFeedback onPress={() => setIntentToSkip(!intentToSkip)}>
                                            <Title style={[text.bold,text.h4,colors.colorSecondary,{paddingRight:20}]}>
                                                Skip
                                            </Title>
                                        </TouchableWithoutFeedback>
                                    : 
                                        null
                                )
        })
    }) ; 

    const setStart = () => {
        let startTime = (new Date).getTime() ; 
        updateSetDetails({
            ...setDetails,
            timeTaken:startTime,
            started:true,
        }) ; 

        state.reducers.current.set.start(set_id = route.params.set._id, exercise_id = route.params.exercise._id, program_id = route.params.program._id) ;

    }

    const setComplete = () => {
        let timeTaken = Math.ceil( ( parseInt((new Date).getTime()) - parseInt(setDetails.timeTaken) ) / 1000) ; 
 
        updateSetDetails({...setDetails,timeTaken,completed:true}) ; 
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

    const onSetReviewSubmitted = (review) => {

        let setReview = {...review,timeTaken:setDetails.timeTaken} ; 

        state.reducers.current.set.end(id = route.params.set._id, review = setReview) ; 

        navigation.navigate('Exercise') ; 


        // updateSetStatusInState(route.params.set._id) ; 
        // postSetReview(
        //     id = route.params.set._id,
        //     review = setReview, 
        //     () => {navigation.navigate('Exercise')}
        // )

    }

    const SetNotCompleted = () => {
        return(
            <React.Fragment>

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
                                    disabled={disabled.value}
                                    warningText={disabled.message}
                                    title="set" 
                                    start={setStart} 
                                    end={setComplete}
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

    
    let review = setCompleted ? state.routineForTheDay.sets.filter((set) => {return set._id === route.params.set._id})[0].review :null ;
    

    return (
        <React.Fragment>
            <ReasonForSkipping visible={intentToSkip} toggler={setIntentToSkip} onSkipped={onSkipped} aspect="set"/>
            <ScrollView style={[globals.flex]}>

                {
                    setCompleted ?
                        <View style={{paddingLeft:20,paddingRight:20}}>
                            <Review>
                                <Review.Set review={review}/>
                            </Review>
                        </View>
                    : 
                        (
                            !skipped ? 
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
                                                    disabled={disabled.value}
                                                    warningText={disabled.message}
                                                    title="set" 
                                                    start={setStart} 
                                                    end={setComplete}
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
                            :
                                <Skipped/>                       
                        )
                }
            </ScrollView>
        </React.Fragment>
    ) ; 
 

}
