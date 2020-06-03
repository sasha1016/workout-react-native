import React,{useEffect,useState} from 'react' ; 
import { ScrollView,Text,Alert } from 'react-native' ; 
import {List} from 'native-base' ;

import CustomListItem from '../../../Components/ListItem2.js';


import {capitalize} from '../../../Utilities' ; 

const moment = require('moment') ; 


export default function UserProgramInformation({navigation,route}) {

    useEffect(() => {
        navigation.setOptions({
            title:route.params.userProgram.program.name
        }) ; 

    },[]) ; 

    const switchProgramIntent = () => {
        navigation.push(
            'ViewPrograms',
            {   
                filterBy:(route.params.userProgram.program.liftName ? "liftName" : "muscleGroup"),
                filterByValue:(route.params.userProgram.program.liftName || route.params.userProgram.program.muscleGroup), 
                title:`${capitalize(route.params.userProgram.program.liftName || route.params.userProgram.program.muscleGroup)} Programs`,
                programCurrentlySubscribedTo:route.params.userProgram.program._id, 
                programSwitch:true,
                userProgramToSwitch:route.params.userProgram._id, 
            }
        ) ; 
    }
    
    const toDisplay = [

        {title:"Program",key:"name",value:(value) => {return `${value}`}},
        {title:"Type",key:"lift",value:(value) => {return `${(value === "main" ? "Main Lift" : "Accessory Lift")}`}},
        {title:"Muscle Group",key:"muscleGroup",value:(value) => {return `${value}`}},
        {title:"Lift",key:"liftName",value:(value) => {return `${value}`}},
        {title:"Duration",key:"duration",value:(value) => {return `${value} weeks`}},
        {title:"Frequency",key:"frequency",value:(value) => {return `${value} x week`}},
        {title:"Current Week of Program",key:"currentWeek",value:(value) => {return `Week ${value + 1}`}},
    ] ; 

    return(
        <ScrollView style={{padding:20,paddingTop:0}}>
            <List>
                {
                    toDisplay.map((item,index) => (
                            route.params.userProgram.program[item.key] !== undefined ?
                                <CustomListItem 
                                    title={item.title} 
                                    desc={[item.value(route.params.userProgram.program[item.key])]} 
                                    icon={item.key === "name"? "edit-2" : null}
                                    onIconPress={switchProgramIntent}
                                    mode={item.key === "name"? "NAV" : "INFORMATION"}
                                    key={`key-${index}`}
                                />
                            : 
                                null
                        )
                    )
                }
                <CustomListItem 
                    title="Commenced"
                    desc={[`${moment(route.params.userProgram.commenced,"L TS").fromNow()}`]} 
                    key={`key-commenced`}
                />   
                <CustomListItem 
                    title="Current Week"
                    desc={[`Week ${route.params.userProgram.currentWeek + 1}`]} 
                    key={`key-current-week`}
                />        
            </List>
        </ScrollView>
    )

}


