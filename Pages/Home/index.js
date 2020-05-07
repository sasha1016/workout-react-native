import React, {Fragment,useContext,useState} from 'react' ; 
import { 
    View,
    ScrollView,
    StyleSheet ,
    Text
} from 'react-native' ;

import  {colors,globals,text,colorCodes} from '../../Styles/globals.js';
import  CustomListItem from '../../Components/ListItem2';

import {WorkoutContext} from './Contexts/index' ; 

import ActionBar from './Components/ActionBar' ; 

import {API,V1,TEST} from '../../config/api' ; 

const axios = require('axios') ; 

import moment from 'moment' ;

const day = moment().format("dddd").toLowerCase() ; 


function getWorkoutForTheDay(callback) {
    axios.get(`${API.V1}${V1.USER.ROUTINES.GET}`, {
        params:{
            user:TEST.USER, 
            day:day,
            populate:"program,userProgram"
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
        navigation.navigate('Exercise',{sets:exercise.sets,exerciseName:exercise.name,oneRM:exercise.oneRM,totalSets:exercise.sets.length})
    }

    React.useEffect(() => {

        getWorkoutForTheDay((response) => {
            response = response[0] ; 
            Object.keys((response[day])[0]).length !== 0 ? setRoutine((response[day])[0]) : false  ; 
        })

    },[route])


    return (
        <React.Fragment>
            <ScrollView>
                <View style={[{position:'relative'},globals.flex,globals.listContainer]}>
                    <View>
                        
                        {   
                            routine.toComplete.length === 0 ? 
                                ( <Text style={[globals.h5,text.center,colors.colorNeutral,{paddingTop:15}]}>Your routine for today is empty.</Text>)
                            :
                                routine.toComplete.map((exercise) => {
                                    
                                    return (
                                        <CustomListItem
                                            title={exercise.name} 
                                            desc={[`${exercise.sets.length} sets`]}
                                            mode="NAV"
                                            key={exercise._id}
                                            onPress={() => ( goToExercise(exercise) )}
                                        />
                                    )
                                })
                        }

                    </View>
                </View>
            </ScrollView>
            <ActionBar/>
        </React.Fragment>
    ) ; 
 

}