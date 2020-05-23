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
    Input,
    Button
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

import Divider from '../../../Components/Divider';

const axios = require('axios') ;
const moment = require('moment') ; 

import {API,V1,TEST} from '../../../config/api'

import NavButton from '../../../Components/NavButton.js';

const OneRepMaxInput = ({onChange1RM,name}) => {
    return(
        <Item inlineLabel >
            <Label style={[globals.h5,colors.colorPrimary,text.bold,{padding:5}]}>{`${name}    `}</Label>
            <Input 
                keyboardType="numeric"
                style={[globals.h5,colors.colorPrimary]} 
                onChangeText={(oneRM) => onChange1RM(oneRM)}
                placeholder={`Enter 1RM`}
            />
        </Item>
    )
}

export default function ProgramInformation({navigation,route}) {

    const [oneRepMaxes,setOneRepMaxes] = useState([]) ; 
    const [formDisabled,setFormDisabled] = useState(true) ; 


    const addProgramToUserPrograms = () => {

        
        const program = {
            user:TEST.USER,
            program:route.params.program._id, 
            commenced:moment().format('L LT'), 
            oneRepMaxes:oneRepMaxes
        } ; 

        axios.post(API.V1 + V1.USER.PROGRAMS.ADD,{
            ...program
        }).then(() => {
            navigation.push('Programs',{programStarted:true})
        }).catch((error) => {
            console.warn(error.response.data.message)
        })

    }

    const switchProgram = () => { 
        
        const program = {
            user:TEST.USER,
            program:route.params.program._id, 
            commenced:moment().format('L LT'), 
            oneRepMaxes:oneRepMaxes
        } ; 

        
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

    function _setOneRepMaxesToInitialState() {
        let oneRepMaxes = [] ;
        program.uniqueLifts.map((lift) => {
            oneRepMaxes.push({name:lift,oneRM:null}) ; 
        }) ;
        setOneRepMaxes(oneRepMaxes) ; 
    }

    function setOneRepMax(liftName,oneRM) {
        let oneRepMaxesCopy = oneRepMaxes ; 
        let oneRepMaxesNotSetYet = false ; 
        oneRepMaxesCopy.map((l,index) => {
            l.name === liftName ? 
                oneRepMaxesCopy[index] = {...l,oneRM} 
            : 
                (l.oneRM === null ? oneRepMaxesNotSetYet = true : null) 
        }) ; 
        setFormDisabled(oneRepMaxesNotSetYet) ; 
        setOneRepMaxes(oneRepMaxes) ; 
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title:route.params.program.name
        }) ; 
        _setOneRepMaxesToInitialState(); 
    },[]) ; 
    
    const toDisplay = [
        {key:"name",title:"Name",display:(value) => `${value}`},
        {key:"lift",title:"Lift Type",display:(value) => `${value}`},
        {key:"type",title:"Program Type",display:(value) => `${value}`},
        {key:"weightFactor",title:"Weight Factor",display:(value) => `${value}`}, 
        {key:"frequency",title:"Frequency",display:(value) => `${value} x week`},
        {key:"liftName",title:"Lift",display:(value) => `${(value)}`},
    ] ; 

    const program = route.params.program ; 
    const days = program.days ;

    let intentToSwitch = route.params.programSwitch ; 

    return(
        <ScrollView style={{padding:20,paddingTop:0}}>
            <List>
                {
                    (
                        toDisplay.map((item,index) => 
                            program[item.key] !== undefined ? 
                                <CustomListItem 
                                    title={item.title} 
                                    desc={[item.display(program[item.key])]} 
                                    key={`key-${index}`}
                                />
                            : null
                        )
                    )
                }
            </List>
            <Divider title="Schedule"/>
            <List>
                {
                    days.map((day) => {
                        return <Day day={day}/>
                    })
                }
            </List>
            <Divider title="One Rep Maxes" />
            <View>
                {
                    program.uniqueLifts.map((liftName) => 
                        <OneRepMaxInput name={liftName} onChange1RM={(oneRM => setOneRepMax(liftName,oneRM))}/> 
                    )
                }
            </View>

            <Button
                full
                style={[
                    (intentToSwitch ? colors.bgWarning : colors.bgSuccess ),
                    {
                        width:"100%",
                        marginTop:30,
                        marginBottom:30
                    }
                ]}
                disabled={formDisabled} 
                onPress={() => {
                    intentToSwitch ?
                        Alert.alert("Confirm Program Switch",`Are you sure you want to switch your ${capitalize(route.params.program.liftName || route.params.program.muscleGroup)} program to ${route.params.program.name}? All progress from your current program will be lost.`,[{text:"Cancel",style:"cancel"},{text:"Switch",onPress:() => {switchProgram()} }])
                    :
                        addProgramToUserPrograms() 
                }}                
            >
                <Text style={[
                    text.uppercase,
                    (intentToSwitch ? colors.colorPrimary : colors.colorGrey),
                    text.bold
                ]}>
                    {intentToSwitch ? "Switch" : "Start"}
                </Text>
            </Button>
        </ScrollView>
    )

}


