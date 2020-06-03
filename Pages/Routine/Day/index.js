import React,{ useEffect, useState, useContext } from 'react' ; 
import { View,Alert,Text } from 'react-native' ; 
import {globals, colors,text} from '../../../Styles/globals' ; 
import CustomListItem from '../../../Components/ListItem2' ; 
import {capitalize} from '../../../Utilities' ; 
import ActionsBar from './Components/ActionsBar.js' ; 
import {RoutineContext} from '../Contexts/index.js' ; 
import { Routine } from '../../../Classes' ; 
import { UserContext } from '../../../Layout/Contexts/user' ; 


export default function Day({navigation,route}) {

    const routines = useContext(RoutineContext) ; 
    const user = React.useContext(UserContext) ; 

    var routine = new Routine(user.data.uid) ; 
    routine.chooseDay(route.params.day) ; 

    const [deleteIntent,setDeleteIntent] = useState(false) ; 
    const [dayRoutine,setDayRoutine] = useState([]) ; 

    const onDeleteIntent = () => {
        setDeleteIntent(!deleteIntent) ; 
    }

    const onAddIntent = async () => {
        navigation.navigate('ViewUserPrograms',{dayRoutine,day:route.params.day}) ; 
    }

    const deleteElementFromRoutine = (routineElementID,day,programName,userProgramID) => {

        function _deleteElementFromRoutine() {
            routine.delete(routineElementID,userProgramID)
            .then(() => {
                var newDayRoutine = routines.data[day].filter((program) => {return (program._id === id ? false : true)}  ) ; 
                setDayRoutine(newDayRoutine) ; 
                var newRoutines = routines.data ; 
                newRoutines[day] = newDayRoutine ; 
                routines.set(newRoutines) ;
                setDeleteIntent(false) ;  
            })
            .catch((error) => {
                console.warn(error)
            })
        }

        Alert.alert(
            'Warning',
            `Are you sure you want to delete ${capitalize(programName)} from your routine?`, 
            [
                {text:"Cancel",style:"cancel"},
                {text:"Delete",onPress:() => {_deleteElementFromRoutine()} }
            ]
        ) ; 
    }

    const addElementToRoutine = (routineElementToAdd,daySelectedOfTheProgram) => {
        routine.add(routineElementToAdd,daySelectedOfTheProgram)
        .then((routine) => {
            routines.set(routine) ;
            setDayRoutine(routine[route.params.day]) ; 
        })
        .catch((error) => {
            console.warn(error) ; 
        })
    }

    useEffect(() => {
         
        if(route.params.intentToAdd !== undefined) {
            addElementToRoutine(route.params.routineElementToAdd,route.params.daySelectedOfTheProgram) ; 
        } 

        setDayRoutine(routines.data[route.params.day])

    },[route])


    useEffect(() => {
        navigation.setOptions({
            title:capitalize(route.params.day) 
        }) ; 

        
    },[])

    return (
        <View style={[globals.flex]}>
            <View style={{padding:20,paddingTop:5}}>
                {
                    dayRoutine.length === 0 ? 
                        <Text style={[globals.h5,text.center,colors.colorNeutral,{paddingTop:15}]}>It's currently empty. Add one by clicking the + icon.</Text>
                    :
                        dayRoutine.map((element,index) => { 
                            let daySelectedOfTheProgram = element.userProgram.daysSelectedOfTheProgram.filter((day) => {
                                return (day.userDaySelected === route.params.day)
                            })[0].programDaySelected ; 
                            return (
                                <CustomListItem
                                    mode="NAV"
                                    title={element.program.name}
                                    desc={[daySelectedOfTheProgram]}
                                    icon={deleteIntent ? "trash-2" : null}
                                    key={`key-${index}`} 
                                    onIconPress={() => {deleteIntent ? deleteElementFromRoutine(element._id,route.params.day,element.program.name,element.userProgram._id) : false}}
                                />
                            ) ;
                        }) 
                }
            </View>
            <ActionsBar onDeleteIntent={onDeleteIntent} deleteIntent={deleteIntent} onAddIntent={onAddIntent}/>
        </View>
    ) ; 
 

}