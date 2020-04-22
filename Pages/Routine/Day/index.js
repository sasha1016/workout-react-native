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
    
    const goToProgram = (program) => {
        navigation.push('Program',{program})
    }

    const onDeleteIntent = () => {
        setDeleteIntent(!deleteIntent) ; 
    }

    const onAddIntent = async () => {
        navigation.navigate('ViewUserPrograms',{dayRoutine,day:route.params.day}) ; 
    }

    const deleteProgram = (routineId,day,programName) => {

        const apiCall = () => {
            axios.post(API.V1 + V1.USER.ROUTINES.DELETE, {
                userId:TEST.USER, 
                day:day,
                routineId:routineId
            }).then(() => {
                var newDayRoutine = route.params.dayRoutine.filter((program) => {return (program._id === routineId ? false : true)}  ) ; 
                setDayRoutine(newDayRoutine) ; 
                var newRoutines = routines.data ; 
                newRoutines[day] = newDayRoutine ; 
                routines.set(newRoutines) ; 
            }).catch((error) => {
                console.warn(error.response.data.message)
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

    const addProgram = (toAdd) => {
        axios.post(API.V1 + V1.USER.ROUTINES.ADD, {
            userId:TEST.USER,
            day:route.params.day,
            toAdd
        }).then((response) => {
            routines.set(response.data) ; 
            setDayRoutine(response.data[route.params.day])
        }).catch((error) => {
            console.warn(error.response.data.message,"Filure") ; 
        })
    }

    useEffect(() => {
        
        route.params.intentToAdd !== undefined ? addProgram(route.params.toAdd) : false; 

    },[route])


    useEffect(() => {
        navigation.setOptions({
            title:capitalize(route.params.day) 
        }) ; 

        setDayRoutine(routines.data[route.params.day]) ; 

    },[])

    return (
        <View style={[globals.flex]}>
            <View style={{padding:20,paddingTop:5}}>
                {
                    dayRoutine.length === 0 ? 
                        <Text style={[globals.h5,text.center,colors.colorNeutral,{paddingTop:15}]}>It's currently empty. Add one by clicking the + icon.</Text>
                    :
                        dayRoutine.map((program,index) => {
                            var desc = () => {
                                var str = "" ; 
                                program.toComplete.slice(0,3).map((set, index) => {
                                    if(index == 2) {
                                        (program.toComplete.length == 2 ? str += ` and ` : str += `, `) ; 
                                    } 
                                    str += `${set.name}` 
                                }) ;
                                return [str] ; 
                            } ;  
                            return (
                                <CustomListItem
                                    mode="NAV"
                                    title={program.programName}
                                    // desc={desc()}
                                    icon={deleteIntent ? "trash-2" : "chevron-right"}
                                    onPress={() => {deleteIntent ? false : goToProgram(program)}}
                                    key={`key-${index}`} 
                                    onIconPress={() => {deleteIntent ? deleteProgram(program._id,route.params.day,program.programName) : false}}
                                />
                            ) ;
                        }) 
                }
            </View>
            <ActionsBar onDeleteIntent={onDeleteIntent} deleteIntent={deleteIntent} onAddIntent={onAddIntent}/>
        </View>
    ) ; 
 

}