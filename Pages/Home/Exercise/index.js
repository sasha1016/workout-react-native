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

    let exerciseCompleted = state.completed.exercises.includes(route.params.exercise._id) ; 

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title:route.params.exercise.name,
            headerRight:() => (
                                !exerciseCompleted ?
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

    const goToSet = (set,weight,setNo,totalSets) => {
        navigation.navigate('Set',{set,weight,setNo,totalSets,exercise:route.params.exercise,program:route.params.program}) ; 
    }

    const onSkipped = (reasons) => {
        state.reducers.routineTracker.skip(`exercise`,route.params.exercise._id,reasons) ; 
    }


    let review = exerciseCompleted ? state.routineForTheDay.exercises.filter((exercise) => {return exercise._id === route.params.exercise._id})[0].review : [] ;


    return (
        <React.Fragment>
            <ReasonForSkipping visible={intentToSkip} toggler={setIntentToSkip} onSkipped={onSkipped} aspect="exercise"/>
            <View style={[globals.flex,globals.listContainer]}>
                    {
                            route.params.exercise.sets.map((set,index) => {
                                let weight = ( route.params.exercise.oneRM ? `${Math.floor(route.params.exercise.oneRM * (parseInt(set.percentage)/100))} kg`: `${set.percentage}% Intensity`) ; 
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



