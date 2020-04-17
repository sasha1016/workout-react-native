import React,{useEffect,useState} from 'react' ; 
import { ScrollView,Text,Alert } from 'react-native' ; 
import {List} from 'native-base' ;

import CustomListItem from '../../../Components/ListItem2.js';


import {capitalize} from '../../../Utilities' ; 

const moment = require('moment') ; 


export default function UserProgramInformation({navigation,route}) {

    const [program,setProgram] = useState({}) ; 

    useEffect(() => {
        navigation.setOptions({
            title:route.params.program.programName
        }) ; 

        setProgram(route.params.program); 

    },[]) ; 

    const switchProgramIntent = () => {
        navigation.push(
            'ViewPrograms',
            {
                filterBy:(route.params.program.liftName ? "liftName" : "muscleGroup"),
                filterByValue:(route.params.program.liftName || route.params.program.muscleGroup), 
                title:`${capitalize(route.params.program.liftName || route.params.program.muscleGroup)} Programs`,
                programSwitch:true,
                userProgramToSwitch:route.params.program._id //The ID of the document stored in UserPrograms Collection 
            }
        ) ; 
    }
    
    const toDisplay = [

        {title:"Program",key:"programName",value:(value) => {return `${value}`}},
        {title:"Type",key:"lift",value:(value) => {return `${value}`}},
        {title:"Muscle Group",key:"muscleGroup",value:(value) => {return `${value}`}},
        {title:"Lift",key:"liftName",value:(value) => {return `${value}`}},
        {title:"Commenced",key:"commenced",value:(value) => {return `${moment(value,"L TS").fromNow()}`}},
        {title:"Duration",key:"duration",value:(value) => {return `${value} weeks`}},
        {title:"Frequency",key:"frequency",value:(value) => {return `${value} x week`}},
        //{title:"Workouts Completed",key:"workoutsCompleted",value:(value,total) => {return `${value} of ${total}`}}
    ] ; 

    return(
        <ScrollView style={{padding:20,paddingTop:0}}>
            <List>
                {
                    toDisplay.map((item,index) => (
                            program[item.key] !== undefined ?
                                <CustomListItem 
                                    title={item.title} 
                                    desc={[item.value(program[item.key])]} 
                                    icon={item.key === "programName"? "edit-2" : null}
                                    onIconPress={switchProgramIntent}
                                    mode={item.key === "programName"? "NAV" : "INFORMATION"}
                                    key={`key-${index}`}
                                />
                            : 
                                null
                        )
                    )
                }
            </List>
        </ScrollView>
    )

}


