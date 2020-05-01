import React, {Fragment,useContext,useState} from 'react' ; 
import { View,Text } from 'react-native' ; 
import {Button} from 'native-base' ; 

import  {colors,globals,text} from '../../Styles/globals.js';
import  CustomListItem from '../../Components/ListItem2';
import  {getDateTime} from '../../Utilities/index' ; 

import {WorkoutContext} from './Contexts/index' ; 

import {API,V1,TEST} from '../../config/api' ; 

const axios = require('axios') ; 
import moment from 'moment' ;

const day = moment().format("dddd").toLowerCase() ; 

function getWorkoutForTheDay(callback) {
    axios.get(`${API.V1}${V1.USER.ROUTINES.GET}`, {
        params:{
            userId:TEST.USER, 
            day:day
        }
    }).then((response) => {
        callback(response.data); 
    }).catch((error) => {
        console.warn(error,"fail") ; 
    })
}


const EMPTY_ROUTINE = {toComplete:[]} ; 


export default function Home({navigation,route}) {


    const state = useContext(WorkoutContext) ; 

    const [routine,setRoutine] = useState(EMPTY_ROUTINE) ;

    function goToExercise(exercise) {
        navigation.navigate('Exercise',{sets:exercise.sets,exerciseName:exercise.name,totalSets:exercise.sets.length})
    }

    React.useEffect(() => {

        getWorkoutForTheDay((response) => {
            Object.keys(response[day]).length !== 0 ? setRoutine((response[day])[0]) : setRoutine(EMPTY_ROUTINE)  ; 
        })

    },[route])


    return (
        <React.Fragment>
            <View style={[{position:'relative'},globals.flex,globals.listContainer]}>
                <View>

                    {
                            routine.toComplete.map((exercise) => {
                                return (
                                    <CustomListItem
                                        title={exercise.name} 
                                        desc={[`${exercise.sets.length} sets`]}
                                        mode={state.workout.started ? "NAV" : "INFO"}
                                        key={exercise._id}
                                        onPress={() => ( goToExercise(exercise) )}
                                    />
                                )
                            })
                    }

                </View>
            </View>
            <View style={[globals.flex,globals.flexRow,colors.bgGrey,{height:45,position:'absolute',width:"100%",bottom:0,left:0}]}>
                <Button style={[globals.flex,{alignContent:'center'}]} transparent >
                    <Text style={[globals.flex,globals.h5,text.center,text.uppercase,text.bold,colors.colorDanger]}>Skip</Text>
                </Button>
                <Button 
                    style={[globals.flex,{alignContent:'center'}]} 
                    transparent
                    onPress={() => state.reducers.workout.set({...state.workout,started:true})}
                >
                    <Text style={[globals.flex,globals.h5,text.center,text.uppercase,text.bold,colors.colorPrimary]}>
                        {state.workout.started ? "Started" : "Start"}
                    </Text>
                </Button>
            </View>
        </React.Fragment>
    ) ; 
 

}
