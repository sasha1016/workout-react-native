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

const DAY = moment().format("dddd").toLowerCase() ; 


function getWorkoutForTheDay(callback) {
    axios.get(`${API.V1}${V1.USER.ROUTINES.GET}`, {
        params:{
            user:TEST.USER, 
            day:DAY,
            populate:"program,userProgram"
        }
    }).then((response) => {
        callback(response.data); 
    }).catch((error) => {
        console.warn(error) ; 
    })
}


const EMPTY_ROUTINE = [] ; 


export default function Home({navigation,route}) {


    const state = useContext(WorkoutContext) ; 

    const [dayRoutine,setDayRoutine] = useState(EMPTY_ROUTINE) ;

    function goToProgram(program) {
        navigation.navigate('Program',{program})
    }

    function _setDayRoutine(dayRoutine) {
        var dayRoutineMuted = dayRoutine.map((element) => {
            let programDaySelected = element.userProgram.daysSelectedOfTheProgram.filter((day) => {
                return (day.userDaySelected === DAY)
            })[0].programDaySelected ; 

            let toCompleteForTheDay = element.program.days.filter((day) => {
                return (programDaySelected === day.name && element.userProgram.currentWeek === day.week)
            })[0].toComplete ;

            element.toComplete = toCompleteForTheDay ; 
            return element ; 
        })
        setDayRoutine(dayRoutineMuted) ; 

    }

    React.useLayoutEffect(() => {

        getWorkoutForTheDay((response) => {
            response = response[0] ; 
            state.reducers.routineTracker.set(response[DAY]) ; 
            Object.keys((response[DAY])).length !== 0 ? _setDayRoutine(response[DAY]) : false  ; 
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
                                dayRoutine.map((element) => {
                                    let program = element.program ; 
                                    let completed = state.completed.programs.includes(program._id) ; 
                                    let skipped = state.skipped.programs.includes(program._id) ; 
                                    element._id = program._id ; 
                                    return (
                                        <CustomListItem
                                            title={program.name} 
                                            desc={[`${element.toComplete.length} Exercises`]}
                                            icon={completed ? "check" : (skipped ? "x" : "chevron-right")}
                                            iconStyle={completed ? {color:colorCodes.success} : skipped ? {color:colorCodes.danger} : null}
                                            mode="NAV"
                                            key={program._id}
                                            onPress={() => ( goToProgram(element) )}
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