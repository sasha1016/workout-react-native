import React,{useContext} from 'react' ; 
import { View } from 'react-native' ; 

import  {globals} from '../../../Styles/globals.js';
import  CustomListItem from '../../../Components/ListItem2';

import {WorkoutContext} from '../Contexts/index' ; 

import {
    exerciseContextProvider, 
    ExerciseContext
} 
from '../Contexts/exercise' ; 

import ActionBar from '../Components/ActionBar' ; 


function Exercise({navigation,route}) {

    const state = useContext(WorkoutContext) ; 


    React.useEffect(() => {
        navigation.setOptions({
            title:route.params.exerciseName
        }) ; 
    })

    const startExercise = () => {
        let sets = [] ; 
        route.params.sets.map((set) => {
            sets.push({_id:set._id,skipped:false,completed:null})
        })
        state.reducers.exercise.set({...state.exercise,setStatuses:sets,started:true}) ; 
    } 

    React.useEffect(() => {
        startExercise() ; 
    },[state.exercise.started]); 
    

    const goToSet = (set,weight,setNo,totalSets) => {
        navigation.navigate('Set',{set,weight,setNo,totalSets}) ; 
    }



    return (
        <React.Fragment>
            <View style={[globals.flex,globals.listContainer]}>
                    {
                            route.params.sets.map((set,index) => {
                                let weight = ( route.params.oneRM ? `${route.params.oneRM * Math.floor(parseInt(set.weightFactor || set.percentage)/100)} kg`: `${set.weightFactor || set.percentage}% Intensity`) ; 
                                return (
                                    <CustomListItem
                                        title={`Set ${index + 1}`} 
                                        desc={[`${set.reps} Reps @ ${weight}`]}
                                        mode="NAV"
                                        key={set._id}
                                        onPress={() => goToSet(set,weight,index + 1, route.params.totalSets)}
                                    />
                                )
                            })
                    }

            </View>
            <ActionBar/>
        </React.Fragment>
    ) ; 

}

export default exerciseContextProvider(Exercise) ; 


