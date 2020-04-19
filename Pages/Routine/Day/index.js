import React,{useEffect, useState} from 'react' ; 
import { View,Alert } from 'react-native' ; 

import {globals} from '../../../Styles/globals' ; 

import CustomListItem from '../../../Components/ListItem2' ; 

import {capitalize} from '../../../Utilities' ; 

import ActionsBar from './Components/ActionsBar.js' ; 

import {V1,API, TEST} from '../../../config/api'

const axios = require('axios') ; 

export default function Day({navigation,route}) {


    const [deleteIntent,setDeleteIntent] = useState(false) ; 
    const [routines,setRoutines] = useState([]) ; 

    const goToProgram = (program) => {
        navigation.push('Program',{program})
    }

    const onDeleteIntent = () => {
        setDeleteIntent(!deleteIntent) ; 
    }

    const deleteProgram = (routineId,day,programName) => {

        const apiCall = () => {
            axios.post(API.V1 + V1.USER.ROUTINES.DELETE, {
                userId:TEST.USER, 
                day:day,
                routineId:routineId
            }).then((response) => {
                var newRoutines = routines.filter((program) => {return (program._id === routineId ? false : true)}  ) ; 
                setRoutines(newRoutines) ; 
                route.params.onRoutineChange(response.data,day) ; 
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

    useEffect(() => {
        navigation.setOptions({
            title:capitalize(route.params.day)
        }) ; 

        setRoutines(route.params.routine) ; 
    },[])

    return (
        <View style={[globals.flex]}>
            <View style={{padding:20,paddingTop:5}}>
                {
                    routines.map((program,index) => {
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
                                    desc={desc()}
                                    icon={deleteIntent ? "trash-2" : "chevron-right"}
                                    onPress={() => {deleteIntent ? false : goToProgram(program)}}
                                    key={`key-${index}`} 
                                    onIconPress={() => {deleteIntent ? deleteProgram(program._id,route.params.day,program.programName) : false}}
                                />
                        )
                    }) 
                }
            </View>
            <ActionsBar onDeleteIntent={onDeleteIntent} deleteIntent={deleteIntent}/>
        </View>
    ) ; 
 

}