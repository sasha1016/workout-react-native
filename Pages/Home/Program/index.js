import React,{useContext} from 'react' ; 
import { 
    View,
    Text 
} from 'react-native' ; 

import  {globals,colorCodes,text,colors} from '../../../Styles/globals.js';
import  CustomListItem from '../../../Components/ListItem2';

import {WorkoutContext} from '../Contexts/index' ; 

import ActionBar from '../Components/ActionBar' ; 
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import {Title} from 'react-native-paper' ; 

import ReasonForSkipping from '../Components/SkippingReasonForm';

import Review from "../Components/Reviews"

export default function Exercise({navigation,route}) {

    const state = useContext(WorkoutContext) ;

    const [intentToSkip,setIntentToSkip] = React.useState(false);   

    let programCompleted = state.completed.programs.includes(route.params.program._id) ;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title:route.params.program.program.name,
            headerRight:() => (
                                !programCompleted ? 
                                    <TouchableWithoutFeedback onPress={() => setIntentToSkip(!intentToSkip)}>
                                        <Title style={[text.bold,text.h4,colors.colorSecondary,{paddingRight:20}]}>
                                            Skip
                                        </Title>
                                    </TouchableWithoutFeedback>
                                : 
                                    null
                            )
        }) ; 
    }) ; 

    const goToExercise = (exercise,program) => {
        navigation.navigate('Exercise',{exercise,program}) ; 
    }

    const onSkipped = (reasons) => {
        state.reducers.routineTracker.skip(`program`,route.params.exercise._id,reasons) ; 
    } 
    let review = programCompleted ? state.routineForTheDay.programs.filter((program) => {return program._id === route.params.program._id})[0].review : [];

    return (
        <React.Fragment>
            <ReasonForSkipping visible={intentToSkip} toggler={setIntentToSkip} onSkipped={onSkipped} aspect="program"/>
            <View style={[globals.flex,globals.listContainer]}>
                    {
                        route.params.program.toComplete.map((exercise) => {
                            let completed = state.completed.exercises.includes(exercise._id) ; 
                            let skipped = state.skipped.exercises.includes(exercise._id) ; 
                            return (
                                <CustomListItem
                                    title={exercise.name} 
                                    desc={[`${exercise.sets.length} sets`]}
                                    icon={completed ? "check" : (skipped ? "x" : "chevron-right")}
                                    iconStyle={completed ? {color:colorCodes.success} : null}
                                    mode="NAV"
                                    key={exercise._id}
                                    onPress={() => ( goToExercise(exercise,route.params.program) )}
                                />
                            )
                        })
                    }
                    {
                        programCompleted ? 
                            (
                                <Review>
                                    <Review.Program review={review}/>
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



