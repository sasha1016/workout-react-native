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

import Review from "./Components/Reviews";

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


const EMPTY_ROUTINE = [] ; 


export default function Home({navigation,route}) {


    const state = useContext(WorkoutContext) ; 

    const [dayRoutine,setDayRoutine] = useState(EMPTY_ROUTINE) ;

    function goToProgram(program) {
        navigation.navigate('Program',{program})
    }

    React.useLayoutEffect(() => {

        getWorkoutForTheDay((response) => {
            response = response[0] ; 
            state.reducers.routineTracker.set(response[day]) ; 
            Object.keys((response[day])).length !== 0 ? setDayRoutine(response[day]) : false  ; 
        })

    },[route]) ; 

    

    return (
        <React.Fragment>
            <ScrollView>
                <View style={[{position:'relative'},globals.flex,globals.listContainer]}>
                    <View>
                        
                        {   
                            dayRoutine.length === 0 ? 
                                ( <Text style={[globals.h5,text.center,colors.colorNeutral,{paddingTop:15}]}>Your routine for today is empty.</Text>)
                            :
                                dayRoutine.map((program) => {
                                    let completed = state.completed.programs.includes(program._id) ; 
                                    let skipped = state.skipped.programs.includes(program._id)
                                    return (
                                        <CustomListItem
                                            title={program.program.name} 
                                            desc={[`${program.toComplete.length} Exercises`]}
                                            icon={completed ? "check" : (skipped ? "skip-forward" : "chevron-right")}
                                            iconStyle={completed ? {color:colorCodes.success} : null}
                                            mode="NAV"
                                            key={program.program._id}
                                            onPress={() => ( goToProgram(program) )}
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