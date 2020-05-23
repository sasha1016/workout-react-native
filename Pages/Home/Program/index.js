import React,{useContext} from 'react' ; 
import { 
    View
} from 'react-native' ; 
import  {globals,colorCodes} from '../../../Styles/globals.js';
import  CustomListItem from '../../../Components/ListItem2';
import {WorkoutContext} from '../Contexts/index' ; 
import ActionBar from '../Components/ActionBar' ; 
import ReasonForSkipping from '../Components/SkippingReasonForm';
import Review from "../Components/Reviews" ; 
import SkipButton from '../Components/SkipButton'  ; 

export default function Exercise({navigation,route}) {

    const state = useContext(WorkoutContext) ;

    const [intentToSkip,setIntentToSkip] = React.useState(false);   

    let programCompleted = state.completed.programs.includes(route.params.program._id) ;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title:route.params.program.program.name,
            headerRight:() => (
                                !programCompleted && state.information.workout.mutable ?
                                    <SkipButton onPress={() => setIntentToSkip(!intentToSkip)} />
                                : 
                                    null
                            )
        }) ; 
    }) ; 

    const goToExercise = (exercise,program) => {
        navigation.navigate('Exercise',{exercise,program}) ; 
    }

    const onSkipped = (reasons) => {
        state.reducers.routineTracker.skip(`program`,route.params.program._id,reasons) ; 
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
                                    iconStyle={completed ? {color:colorCodes.success} : skipped ? {color:colorCodes.danger} : null}
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



