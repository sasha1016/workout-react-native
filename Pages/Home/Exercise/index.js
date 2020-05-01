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
    

    const goToSet = (set,setNo,totalSets) => {
        navigation.navigate('Set',{set,setNo,totalSets}) ; 
    }



    return (
        <View style={[globals.flex,globals.listContainer]}>
                {
                        route.params.sets.map((set,index) => {
                            return (
                                <CustomListItem
                                    title={`Set ${index + 1}`} 
                                    desc={[`${set.reps} Reps @ ${set.percentage || set.weightFactor}%`]}
                                    mode="NAV"
                                    key={set._id}
                                    onPress={() => goToSet(set,index + 1, route.params.totalSets)}
                                />
                            )
                        })
                }

        </View>
    ) ; 

}

export default exerciseContextProvider(Exercise) ; 


