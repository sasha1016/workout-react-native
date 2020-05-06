import React, {Fragment,useContext,useState} from 'react' ; 
import { 
    View,
    ScrollView,
    StyleSheet 
} from 'react-native' ;

import {
    Button,
    FooterTab,
    Icon
} from 'native-base' ; 

import  {colors,globals,text,colorCodes} from '../../Styles/globals.js';
import  CustomListItem from '../../Components/ListItem2';
import  {getSecondsElapsed} from '../../Utilities/index' ; 

import {WorkoutContext} from './Contexts/index' ; 

import {API,V1,TEST} from '../../config/api' ; 

const axios = require('axios') ; 
import moment from 'moment' ;

const day = moment().format("dddd").toLowerCase() ; 

function getCurrentEpoch() {
    return (new Date).getTime() ; 
}

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
        navigation.navigate('Exercise',{sets:exercise.sets,exerciseName:exercise.name,totalSets:exercise.sets.length})
    }

    React.useEffect(() => {

        getWorkoutForTheDay((response) => {
            Object.keys(response[day]).length !== 0 ? setRoutine((response[day])[0]) : setRoutine(EMPTY_ROUTINE)  ; 
        })

    },[route])


    return (
        <React.Fragment>
            <ScrollView>
                <View style={[{position:'relative'},globals.flex,globals.listContainer]}>
                    <View>

                        {
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
            <FooterTab style={footer.container}>
                <Button transparent >
                    <Icon 
                        name="stop" 
                        type="MaterialCommunityIcons"
                        style={[...iconStyle,colors.colorPrimary]} 
                    />
                </Button>
                <Button 
                    transparent
                    onPress={() => 
                            state.workout.started ? 
                                state.reducers.workout.set({...state.workout, paused:!state.workout.paused, timeTaken: getSecondsElapsed(state.workout.startedTime)})
                            :
                                state.reducers.workout.set({...state.workout, started:true, startedTime:getCurrentEpoch()}) 
                        }
                >
                    <Icon 
                        name={state.workout.started ? (state.workout.paused ? "pause" : "play") : "play"} 
                        type="Feather"
                        style={[...iconStyle,colors.colorPrimary]} 
                    />
                </Button>
            </FooterTab>
        </React.Fragment>
    ) ; 
 

}

const footer = StyleSheet.create({
    container:{
        position:"absolute",
        bottom:0,
        flex:1,
        left:0,
        right:0,
        width:"100%", 
        backgroundColor:colorCodes.grey,
    }
})

const iconStyle = [globals.h3,text.bold]