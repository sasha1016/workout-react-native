import React from 'react' ; 
import { 
    StyleSheet,
    View,
    ScrollView,
    Alert
} from 'react-native' ; 
import {
    Button,
    FooterTab,
    Text, 
    Icon
} from 'native-base' ; 
import  {
    colors,
    globals,
    text,
    colorCodes
} from '../../../Styles/globals.js';
import  { 
    getSecondsElapsed,
    getCurrentEpoch,
    getDateTime,
    displayTime,
    displayUnixTime
} from '../../../Utilities/index' ; 
import { WorkoutContext } from '../Contexts/index' ; 
import RBSheet from 'react-native-raw-bottom-sheet';

import Divider from '../../../Components/Divider' ; 

import Timer from '../../../Components/Timer.js';
import SkippingReasonForm from './SkippingReasonForm'



const iconStyle = [globals.h3,text.bold] ; 

const styles = StyleSheet.create({
    button:{
        flex:0.25, 
        justifyContent:'center',
        flexDirection:'row',
    },
    info:{
        flex:.5,
        justifyContent:'center',
        height:45,
    },
    info_header:{
        flex:.25,
        flexDirection:'column',
    },
    info_content:{
        flex:.75,
        paddingTop:10
    },
    infoText:{
        justifyContent:'space-evenly',
        alignContent:'space-around'
    }
});

const DisplayWorkoutInformation = ({information,title}) => {
    return(
        <React.Fragment>
            <Divider title={`${title}  `} border={colorCodes.neutral}/>  
            <View style={[globals.flexRow]}>
                {
                    information.map((detail,index) => {
                        return(
                            <View key={`key-${index}`} style={[globals.flexColumn,{justify:'center',flex:(detail.big ? .5 : (1/ information.length))}]}>
                                <Text
                                    style={[globals.h8,colors.colorPrimaryLighter,styles.info_header,text.center]}
                                >
                                    {`${detail.title}    `}
                                </Text>
                                <Text
                                    style={[globals.h5,text.bold,colors.colorPrimary,styles.info_content,text.center]}
                                >
                                    {`${detail.value}  `}
                                </Text>
                            </View>
                        )
                    })
                }
            </View> 
        </React.Fragment>
    )
}

const BottomSheetContent = () => {
    const [intentToSkip,setIntentToSkip] = React.useState(false); 

    const state = React.useContext(WorkoutContext) ;

    const restDuration = () => {
        return (state.workout.rest.duration - (Math.ceil((new Date).getTime() - state.workout.rest.timeStarted) / 1000))
    }

    const onRestComplete = () => {
        state.reducers.workout.set({...state.workout,rest:{status:false,timeStarted:0,duration:0}}) ; 
    }

    const endWorkout = (reasons = null) =>{
        state.reducers.workout.end(reasons); 
    }

    const handleEndWorkout = () => {
        if(!state.information.allSetsAttempted) {
            Alert.alert(
                `Warning`,
                `You are trying to finish the workout without completing all the sets. Are yu sure you want to?`,
                [
                    {text:"Cancel",style:"cancel"},
                    {
                        text:"Yes",
                        onPress : () => setIntentToSkip(!intentToSkip) 
                    }
                ]
            )
        } else{
            endWorkout(); 
        }
    }

    let workoutMutable = state.information.workout.mutable ; 

    return (
            <React.Fragment>
                <SkippingReasonForm 
                    visible={intentToSkip} 
                    toggler={setIntentToSkip} 
                    aspect="workout" 
                    onSkipped={endWorkout}
                />
                <ScrollView>
                    <View style={[globals.flexRow,{padding:20,paddingBottom:0}]}>
                        <Button 
                            disabled={!workoutMutable}
                            transparent
                            style={[styles.button,{opacity:(!workoutMutable?0.4:1)}]}
                            onPress={() => handleEndWorkout()}
                        >
                            <Icon 
                                name="stop" 
                                type="MaterialCommunityIcons"
                                style={[...iconStyle,(colors.colorPrimary)]} 
                            />
                        </Button>
                        <View style={styles.info}>
                                <View style={[globals.flexColumn,globals.flex,{justify:'center'}]}>
                                    <Text
                                        style={[globals.h8,colors.colorPrimaryLighter,styles.info_header,text.center]}
                                    >
                                        {
                                            !state.workout.ended ? 
                                                state.workout.paused.status ? `Paused at` : `Started at`
                                            : 
                                                `Ended at`
                                        }
                                    </Text>
                                    <Text
                                        style={[globals.h5,text.bold,colors.colorPrimary,styles.info_content,text.center]}
                                    >
                                        {
                                            !state.workout.ended ? 
                                                state.workout.paused.status ?
                                                    displayUnixTime(state.workout.paused.started)
                                                : 
                                                    displayTime(state.workout.startedTime)
                                            : 
                                                displayUnixTime(state.workout.endedAt)
                                        }
                                    </Text>
                                </View>
                        </View>
                        <Button
                            disabled={!workoutMutable}
                            transparent
                            style={[styles.button,{opacity:(!workoutMutable?0.4:1)}]}
                            onPress={
                                () => { 
                                    let paused =  state.workout.paused.status ; 
                                    state.reducers.workout.set(
                                        {
                                            ...state.workout,
                                            paused:{
                                                status:!paused,
                                                total:( paused ? state.workout.paused.total + getSecondsElapsed(state.workout.paused.started) : state.workout.paused.total),
                                                started:(paused ? 0 : getCurrentEpoch())
                                            }
                                        }
                                    )
                                }
                            }
                        >
                            <Icon 
                                name={(!state.workout.paused.status ? "pause" : "play")} 
                                type="Feather"
                                style={[...iconStyle,colors.colorPrimary]} 
                            />      
                        </Button>      
                    </View>
                    {
                        state.workout.rest.status ?
                            <React.Fragment>
                                <Divider title="Rest Timer" /> 
                                <View style={[globals.flex,{justifyContent:'center'}]}>
                                    <Timer duration={restDuration()} onFinish={onRestComplete}/>
                                </View>
                            </React.Fragment>
                        : 
                            null
                    }
                    {
                        state.workout.ended ? 
                            <React.Fragment>
                                <DisplayWorkoutInformation 
                                    title='Skipped'
                                    information={[
                                        {
                                            title:'Programs',
                                            value:state.skipped.programs.length 
                                        },
                                        {
                                            title:'Exercises',
                                            value:state.skipped.exercises.length 
                                        },
                                        {
                                            title:'Sets',
                                            value:state.skipped.sets.length 
                                        },
                                    ]}
                                />
                                <DisplayWorkoutInformation 
                                    title='Completed'
                                    information={[
                                        {
                                            title:'Programs',
                                            value:state.completed.programs.length 
                                        },
                                        {
                                            title:'Exercises',
                                            value:state.completed.exercises.length
                                        },
                                        {
                                            title:'Sets',
                                            value:state.completed.sets.length
                                        },
                                    ]}
                                />
                            </React.Fragment>
                        : 
                            null
                    }
                
                </ScrollView>  
            </React.Fragment>
    )
}

const WorkoutStarted = ({bottomSheetRef}) => {

    return(
        <Button 
            onPress={() => bottomSheetRef.current.open()}
            iconLeft
            style={[globals.flex,globals.flexRow]}
        >
            <Icon 
                name="chevron-up"
                type="Feather"
                style={[{color:colorCodes.primaryLighter},globals.h4]}
            />
            <Text
                style={[globals.h6,text.uppercase,colors.colorPrimary,text.bold]}
            >
                Open Dashboard
            </Text>
        </Button>
    )

}

const WorkoutEnded = ({bottomSheetRef}) => {

    return(
        <Button 
            onPress={() => bottomSheetRef.current.open()}
            iconLeft
            style={[globals.flex,globals.flexRow]}
        >
            <Icon 
                name="chevron-up"
                type="Feather"
                style={[{color:colorCodes.primaryLighter},globals.h4]}
            />
            <Text
                style={[globals.h6,text.uppercase,colors.colorPrimary,text.bold]}
            >
                View Workout Review
            </Text>
        </Button>
    )

}

const WorkoutNotStarted = () => {
    const state = React.useContext(WorkoutContext) ;

    const [intentToSkip,setIntentToSkip] = React.useState(false); 

    return(
        <React.Fragment>
            <SkippingReasonForm 
                visible={intentToSkip} 
                toggler={setIntentToSkip} 
                aspect="workout" 
                onSkipped={(reasons) => state.reducers.workout.end(reasons)}
            />
            <Button 
                transparent
                onPress={() => setIntentToSkip(!intentToSkip) }
            >
                <Text 
                    style={[globals.h6,text.uppercase,colors.colorDanger,text.bold]}
                >
                    Skip
                </Text>
            </Button>
            <Button 
                transparent
                onPress={() => state.reducers.workout.set({...state.workout, started:true, startedTime:getDateTime()})}
            >
                <Text
                    style={[globals.h6,text.uppercase,colors.colorPrimary,text.bold]}
                >
                    Start
                </Text>
            </Button>
        </React.Fragment>
    )
}


export default function ActionBar() {
    const state = React.useContext(WorkoutContext) ;
    const bottomSheetRef = React.createRef() ; 

    const footer = StyleSheet.create({
        container:{
            position:"absolute",
            bottom:0,
            flex:1,
            left:0,
            right:0,
            width:"100%", 
            backgroundColor:colorCodes.grey,
        }
    }) ; 

    return (
        <React.Fragment>
            <FooterTab style={footer.container}>
                {
                    !state.workout.ended ? 
                        state.workout.started ? 
                            <WorkoutStarted bottomSheetRef={bottomSheetRef}/>
                        : 
                            <WorkoutNotStarted/>
                    : 
                        <WorkoutEnded bottomSheetRef={bottomSheetRef} />
                }
            </FooterTab>
            <RBSheet
                ref={bottomSheetRef}
                height={450}
                customStyles={{
                    container:{
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        backgroundColor:colorCodes.grey,
                    }
                }}
            >
                <BottomSheetContent/>
            </RBSheet>
        </React.Fragment>
    )
}


