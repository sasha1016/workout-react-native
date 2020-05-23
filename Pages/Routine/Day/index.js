import React,{useEffect, useState, useContext, useRef} from 'react' ; 
import { View,Alert,Text } from 'react-native' ; 

import {globals, colors,text} from '../../../Styles/globals' ; 
import CustomListItem from '../../../Components/ListItem2' ; 
import {capitalize} from '../../../Utilities' ; 

import ActionsBar from './Components/ActionsBar.js' ; 

import {V1,API, TEST} from '../../../config/api' ; 

import {RoutineContext} from '../Contexts/index.js' ; 


const axios = require('axios') ; 

export default function Day({navigation,route}) {

    const routines = useContext(RoutineContext) ; 

    const [deleteIntent,setDeleteIntent] = useState(false) ; 
    const [dayRoutine,setDayRoutine] = useState([]) ; 
    
    const goToProgram = (routine) => {
        navigation.push('Program',{routine})
    }

    const onDeleteIntent = () => {
        setDeleteIntent(!deleteIntent) ; 
    }

    const onAddIntent = async () => {
        navigation.navigate('ViewUserPrograms',{dayRoutine,day:route.params.day}) ; 
    }

    const deleteProgram = (id,day,programName,userProgramID) => {

        const apiCall = () => {
            axios.post(API.V1 + V1.USER.ROUTINES.DELETE, {
                user:TEST.USER, 
                day:day,
                routineId:id,
                userProgramID
            }).then(() => {
                var newDayRoutine = routines.data[day].filter((program) => {return (program._id === id ? false : true)}  ) ; 
                setDayRoutine(newDayRoutine) ; 
                var newRoutines = routines.data ; 
                newRoutines[day] = newDayRoutine ; 
                routines.set(newRoutines) ; 
            }).catch((error) => {
                console.warn(error)
            }) 
        } 

        Alert.alert(
            'Warning',
            `Are you sure you want to delete ${capitalize(programName)} from your routine?`, 
            [
                {text:"Cancel",style:"cancel"},{text:"Delete",onPress:() => {apiCall()} }
            ]
        ) ; 
    }

    const addProgram = (toAdd,daySelectedOfTheProgram) => {
        axios.post(API.V1 + V1.USER.ROUTINES.ADD, {
            user:TEST.USER,
            day:route.params.day,
            toAdd, 
            daySelectedOfTheProgram,
            populate:"program,userProgram"
        }).then((response) => {
            routines.set(response.data) ;  
            setDayRoutine(response.data[route.params.day]) ; 
        }).catch((error) => {
            console.warn(error.response.data.message,"Filure") ; 
        })
    }

    useEffect(() => {
        
        route.params.intentToAdd !== undefined ? addProgram(route.params.toAdd,route.params.daySelectedOfTheProgram) : false; 

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
                        dayRoutine.map((routine,index) => { 
                            return (
                                <CustomListItem
                                    mode="NAV"
                                    title={routine.program.name}
                                    icon={deleteIntent ? "trash-2" : "chevron-right"}
                                    onPress={() => {deleteIntent ? false : goToProgram(routine)}}
                                    key={`key-${index}`} 
                                    onIconPress={() => {deleteIntent ? deleteProgram(routine._id,route.params.day,routine.program.name,routine.userProgram._id) : false}}
                                />
                            ) ;
                        }) 
                }
            </View>
            <ActionsBar onDeleteIntent={onDeleteIntent} deleteIntent={deleteIntent} onAddIntent={onAddIntent}/>
        </View>
    ) ; 
 

}