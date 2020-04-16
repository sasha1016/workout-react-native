import React,{useEffect,useState} from 'react' ; 
import { ScrollView,Text,Alert } from 'react-native' ; 
import {List} from 'native-base' ;

import {globals,text, colorCodes, colors} from '../../../Styles/globals' ; 
import CustomListItem from '../../../Components/ListItem2.js';

import Day from './Components/Day' ; 
import {capitalize} from '../../../Utilities' ; 

import Divider from 'react-native-divider';

const axios = require('axios') ;
const moment = require('moment') ; 

import {API,V1,TEST} from '../../../config/api'

import NavButton from '../../../Components/NavButton.js';

export default function ProgramInformation({navigation,route}) {

    const [program,setProgram] = useState({}) ; 

    const addProgramToUserPrograms = () => {

        const conditional = (program.liftName !== undefined ? {liftName:program.liftName} : {muscleGroup:program.muscleGroup})  ; 

        const body = {
            userId:TEST.USER,
            commenced:moment().format('L LT'),
            programName:program.name,
            programId:program._id,
            frequency:program.frequency,
            weightFactor:program.weightFactor, 
            lift:program.lift,
            duration:program.duration,
            type:program.type,
            ...conditional 
        } ; 

        axios.post(API.V1 + V1.USER.PROGRAMS.ADD,{...body})
        .then((response) => {
            navigation.push('Programs',{programSelected:true,program:body})
        }).catch((error) => {
            console.warn(error.response.data.message)
        })
    }

    useEffect(() => {
        navigation.setOptions({
            title:route.params.program.name
        }) ; 

        setProgram(route.params.program); 

    },[]) ; 
    
    const toDisplay = [
        {key:"name",title:"Name",display:(value) => `${value}`},
        {key:"lift",title:"Lift Type",display:(value) => `${value}`},
        {key:"type",title:"Program Type",display:(value) => `${value}`},
        {key:"weightFactor",title:"Weight Factor",display:(value) => `${value}`}, 
        {key:"frequency",title:"Frequency",display:(value) => `${value} x week`},
        {key:"liftName",title:"Lift",display:(value) => `${(value)}`},
    ] ; 

    const days = route.params.program.days ;

    return(
        <ScrollView style={{padding:20,paddingTop:0}}>
            <List>
                {
                    toDisplay.map((item,index) => 
                        <CustomListItem 
                            title={item.title} 
                            desc={[item.display(program[item.key])]} 
                            key={`key-${index}`}
                        />
                    )
                }
            </List>
            <Divider style={{marginTop:20,marginBottom:20}} borderColor={colorCodes.grey} orientation="center">
                <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>Schedule  </Text>   
            </Divider>
            <List>
                {
                    days.map((day) => {
                        return <Day day={day}/>
                    })
                }
            </List>
            <NavButton 
                transparent 
                icon={false} 
                title={route.params.programSwitch ? "Switch" : "Start"}
                buttonTextStyle={route.params.programSwitch ? colors.colorWarning : colors.colorSuccess}
                containerStyle={{paddingTop:20,paddingBottom:20}}
                onPress={() => {
                    route.params.programSwitch ?
                        Alert.alert("Confirm Program Switch",`Are you sure you want to switch your ${capitalize(route.params.program.liftName || route.params.program.muscleGroup)} program to ${route.params.program.name}? All progress from your current program will be lost.`,[{text:"Cancel",style:"cancel"},{text:"Switch",onPress:() => toggler(!visible)}])
                    :
                        addProgramToUserPrograms() 
                }}
            />
        </ScrollView>
    )

}


