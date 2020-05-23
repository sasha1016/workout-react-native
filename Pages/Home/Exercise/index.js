import React,{useContext} from 'react' ; 
import { 
    View
} from 'react-native' ; 

import  {globals,colorCodes} from '../../../Styles/globals.js';
import  CustomListItem from '../../../Components/ListItem2';

import {WorkoutContext} from '../Contexts/index' ; 

import ActionBar from '../Components/ActionBar' ; 
import ReasonForSkipping from '../Components/SkippingReasonForm';

import Review from "../Components/Reviews"
import SkipButton from '../Components/SkipButton'  ; 


export default function Exercise({navigation,route}) {

    const state = useContext(WorkoutContext) ;
    const [intentToSkip,setIntentToSkip] = React.useState(false);   

    let exerciseCompleted = state.completed.exercises.includes(route.params.exercise._id) ; 

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title:route.params.exercise.name,
            headerRight:() => (
                                !exerciseCompleted && state.information.workout.mutable ?
                                    <SkipButton onPress={() => setIntentToSkip(!intentToSkip)} />
                                : 
                                    null
                            )
        }) ; 
    }) ; 

    const goToSet = (set,weight,setNo,totalSets) => {
        navigation.navigate('Set',{set,weight,setNo,totalSets,exercise:route.params.exercise,program:route.params.program}) ; 
    }

    const onSkipped = (reasons) => {
        state.reducers.routineTracker.skip(`exercise`,route.params.exercise._id,reasons) ; 
    }

    


    let review = exerciseCompleted ? state.routineForTheDay.exercises.filter((exercise) => {return exercise._id === route.params.exercise._id})[0].review : [] ;
    let oneRepMaxes = route.params.program.userProgram.oneRepMaxes ; 
    let exercise1RM = oneRepMaxes.filter((exercise) => {return exercise.name === route.params.exercise.name})[0].oneRM ; 
    
    function calculateSetWeight(set) {
        if(set.weightIncrement !== undefined) {
            return (`${parseFloat(exercise1RM + set.weightIncrement)} kg`) ; 
        } else {
            return ( exercise1RM ? `${Math.floor(exercise1RM * (parseInt(set.percentage)/100))} kg`: `${set.percentage}% Intensity`) ; 
        }
    }

    return (
        <React.Fragment>
            <ReasonForSkipping visible={intentToSkip} toggler={setIntentToSkip} onSkipped={onSkipped} aspect="exercise"/>
            <View style={[globals.flex,globals.listContainer]}>
                    {
                            route.params.exercise.sets.map((set,index) => {
                                let weight = calculateSetWeight(set) ; 
                                let completed = state.completed.sets.includes(set._id) ; 
                                let skipped = state.skipped.sets.includes(set._id) ; 
                                return (
                                    <CustomListItem
                                        title={`Set ${index + 1}`} 
                                        desc={[`${set.reps} Reps @ ${weight}`]}
                                        mode="NAV"
                                        icon={completed ? "check" : (skipped ? "x" : "chevron-right")}
                                        iconStyle={completed ? {color:colorCodes.success} : skipped ? {color:colorCodes.danger} : null}
                                        key={set._id}
                                        onPress={() => goToSet(set,weight,index + 1, route.params.exercise.sets.length) }
                                    />
                                )
                            })
                    }
                    {
                        exerciseCompleted ? 
                            (
                                <Review>
                                    <Review.Exercise review={review}/>
                                </Review>
                            )
                        : 
                            null
                    }

            </View>
            <ActionBar/>
        </React.Fragment>
    ) ; 

}



