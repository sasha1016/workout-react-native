import React,{useEffect,useState} from 'react' ; 
import { 
    ScrollView,
    Text,
    Alert ,
    View
} from 'react-native' ; 
import { 
    List,
    Item,
    Label,
    Input
} from 'native-base' ;

import {
    globals,
    text,
    colorCodes, 
    colors
} from '../../../Styles/globals' ; 

import CustomListItem from '../../../Components/ListItem2.js';

import Day from './Components/Day' ; 
import {capitalize} from '../../../Utilities' ; 

import Divider from 'react-native-divider';

const axios = require('axios') ;
const moment = require('moment') ; 

import {API,V1,TEST} from '../../../config/api'

import NavButton from '../../../Components/NavButton.js';

export default function ProgramInformation({navigation,route}) {

    const [oneRM,setOneRm] = useState(0) ; 

    const program = {
        user:TEST.USER,
        program:route.params.program._id, 
        commenced:moment().format('L LT'), 
        oneRM
    } ; 

    const addProgramToUserPrograms = () => {

        axios.post(API.V1 + V1.USER.PROGRAMS.ADD,{...program})

        .then(() => {
            navigation.push('Programs',{programStarted:true})
        }).catch((error) => {
            console.warn(error.response.data.message)
        })
    }

    const switchProgram = () => { 
        axios.post(API.V1 + V1.USER.PROGRAMS.SWITCH, {
            userProgramToSwitch:route.params.userProgramToSwitch, // id of document in user programs 
            newProgram:program,
            user:TEST.USER
        })
        .then(() => {
            navigation.push('Programs',{programStarted:true,program:newProgram})
        }).catch((error) => {
            console.warn(error) ;
        })
    }

    useEffect(() => {
        navigation.setOptions({
            title:route.params.program.name
        }) ; 

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
                    (
                        toDisplay.map((item,index) => 
                            route.params.program[item.key] !== undefined ? 
                                <CustomListItem 
                                    title={item.title} 
                                    desc={[item.display(route.params.program[item.key])]} 
                                    key={`key-${index}`}
                                />
                            : null
                        )
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
            <Divider style={{marginTop:20,marginBottom:20}} borderColor={colorCodes.grey} orientation="center">
                <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>Your 1 Rep Max  </Text>   
            </Divider>
            <View>
                <Item inlineLabel >
                    <Label style={[globals.h5,colors.colorPrimaryLighter,{padding:5}]}>1 Rep Max</Label>
                    <Input 
                        keyboardType="numeric"
                        style={[globals.h5,colors.colorPrimary]} 
                        onChangeText={(oneRM) => setOneRm(oneRM)}
                    />
                </Item>
            </View>
            <NavButton 
                transparent 
                icon={false} 
                disabled={oneRM === 0}
                title={route.params.programSwitch ? "Switch" : "Start"}
                buttonTextStyle={route.params.programSwitch ? colors.colorWarning : colors.colorSuccess}
                containerStyle={{paddingTop:20,paddingBottom:20, opacity:(oneRM === 0?0.3:1)}}
                onPress={() => {
                    route.params.programSwitch ?
                        Alert.alert("Confirm Program Switch",`Are you sure you want to switch your ${capitalize(route.params.program.liftName || route.params.program.muscleGroup)} program to ${route.params.program.name}? All progress from your current program will be lost.`,[{text:"Cancel",style:"cancel"},{text:"Switch",onPress:() => {switchProgram()} }])
                    :
                        addProgramToUserPrograms() 
                }}
            />
        </ScrollView>
    )

}


