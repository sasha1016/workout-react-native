import React, {useContext,useState} from 'react' ; 
import { 
    View,
    ScrollView,
    Text
} from 'react-native' ;
import  {colors,globals,text,colorCodes} from '../../Styles/globals.js';
import  CustomListItem from '../../Components/ListItem2';
import {WorkoutContext} from './Contexts/index' ; 
import ActionBar from './Components/ActionBar' ; 
import {API,V1,TEST} from '../../config/api' ; 
import {Routine} from '../../Classes' ; 
import moment from 'moment' ;
import { UserContext } from '../../Layout/Contexts/user.js';

const DAY = moment().format("dddd").toLowerCase() ; 
const EMPTY_ROUTINE = [] ; 


export default function Home({navigation,route}) {
    const state = useContext(WorkoutContext) ; 
    const [dayRoutine,setDayRoutine] = useState(EMPTY_ROUTINE) ;
    const user = React.useContext(UserContext) ; 
    var routine = new Routine(user.data.uid) ; 
    routine = routine.chooseDay(DAY) ; 

    function goToProgram(program) {
        navigation.navigate('Program',{program})
    }

    function _setDayRoutine(dayRoutine) {
        var dayRoutineMuted = dayRoutine.map((element) => {
            let programDaySelected = element.userProgram.daysSelectedOfTheProgram.filter((day) => {
                return (day.userDaySelected === DAY)
            }) ; 

            programDaySelected = programDaySelected.length !== 0 ? programDaySelected[0].programDaySelected : `` ; 

            let day = element.program.days.filter((day) => {
                return (programDaySelected === day.name && element.userProgram.currentWeek === day.week)
            }) ;

            let toCompleteForTheDay = day.length !== 0 ? day[0].toComplete : {toComplete:[]}  ; 

            element.toComplete = toCompleteForTheDay ; 
            return element ; 
        })
        setDayRoutine(dayRoutineMuted) ; 
        

    }

    React.useLayoutEffect(() => {

        routine.get() 
        .then((routine) => {
            state.reducers.routineTracker.set(routine[DAY]) ; 
            Object.keys((routine[DAY])).length !== 0 ? _setDayRoutine(routine[DAY]) : false  ; 
        })
        .catch((error) => {
            console.warn(error) ; 
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