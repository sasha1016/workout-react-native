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
    colors,
    colorCodes
} from '../../../Styles/globals' ; 
import CustomListItem from '../../../Components/ListItem2.js';
import RenderUserProgramSchedule from '../Components/RenderUserProgramSchedule' ; 
import {capitalize} from '../../../Utilities' ; 
import Divider from '../../../Components/Divider';
import BlockButton from '../../../Components/BlockButton'
import UserProgram from '../../../Classes/UserProgram';
import { UserContext } from '../../../Layout/Contexts' ;

const axios = require('axios') ;
const moment = require('moment') ; 



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

    const user = React.useContext(UserContext) ; 
    
    const program = route.params.program ; 
    const intentToSwitch = route.params.programSwitch ; 


    function _onButtonPress() {
        intentToSwitch ?
            Alert.alert(
                `Confirm Program Switch`,
                `Are you sure you want to switch your ${capitalize(route.params.program.liftName || route.params.program.muscleGroup)} program to ${route.params.program.name}? All progress from your current program will be lost.`,
                [
                    {text:"Cancel",style:"cancel"},
                    {text:"Switch",onPress:() => {switchProgram()} }
                ]
            )
        :
            addProgramToUserPrograms() 
    }

    const addProgramToUserPrograms = () => {
        let userProgram = new UserProgram(user.data.uid,program._id,oneRepMaxes) ;
        userProgram.start() 
        .then(() => {
            navigation.push('Programs',{programStarted:true})
        })
        .catch((error) => {
            console.warn(error.response.data.message) ; 
        })
    }

    const switchProgram = () => { 
        let userProgram = new UserProgram(user.data.uid,program._id,oneRepMaxes) ; 
        let fromProgram = route.params.userProgramToSwitch ;

        userProgram.switch(fromProgram)
        .then((response) => {
            navigation.push('Programs',{programStarted:true,program:response.data.newProgram})
        })
        .catch((error) => {
            console.warn(error.message) ;
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
        oneRepMaxesCopy.forEach((l,index) => {
            l.name === liftName ? 
                oneRepMaxesCopy[index] = {name:liftName,oneRM}
            : 
                null
        }) ; 
        setOneRepMaxes(oneRepMaxesCopy) ; 
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title:route.params.program.name
        }) ; 
        _setOneRepMaxesToInitialState(); 
    },[navigation]) ; 
    
    const toDisplay = [
        {key:"name",title:"Name",display:(value) => `${value}`},
        {key:"lift",title:"Lift Type",display:(value) => `${value}`},
        {key:"type",title:"Program Type",display:(value) => `${value}`},
        {key:"weightFactor",title:"Weight Factor",display:(value) => `${value}`}, 
        {key:"frequency",title:"Frequency",display:(value) => `${value} x week`},
        {key:"liftName",title:"Lift",display:(value) => `${(value)}`},
    ] ; 

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
            <List>
                <RenderUserProgramSchedule 
                    duration={program.duration} 
                    days={program.days} 
                    preferredDays={program.preferredDays}
                />
            </List>
            <Divider title="One Rep Maxes" />
            <View>
                {
                    program.uniqueLifts.map((liftName) => 
                        <OneRepMaxInput name={liftName} onChange1RM={(oneRM => setOneRepMax(liftName,oneRM))}/> 
                    )
                }
            </View>

            <BlockButton
                title={intentToSwitch ? "Switch" : "Start"}
                onPress={() => _onButtonPress()}
                top={30}
                bottom={30}
                color={intentToSwitch ? colorCodes.primary : colorCodes.grey}
                background={intentToSwitch ? colorCodes.warning : colorCodes.success}
            />
        </ScrollView>
    )

}


