import React,{useEffect,useState} from 'react' ; 
import { View, ScrollView,Text,StyleSheet,FlatList} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 
import {capitalize} from '../../../Utilities' ; 

const axios = require('axios') ; 

import {API,V1} from '../../../config/index' ; 
import ListItem from '../../../Components/ListItem2.js';


export default function ProgramInformation({navigation,route}) {

    const [program,setProgram] = useState({})

    useEffect(() => {
        navigation.setOptions({
            title:route.params.program.name
        }) ; 

        setProgram(route.params.program); 
    },[]) ; 
    
    const toDisplay = ["name","weightFactor","frequency","liftName","lift","type"] ; 

    return(
        <View style={{padding:20,paddingTop:0}}>
            {
                toDisplay.map((key,index) => 
                    <ListItem title={key} desc={[program[key]]} key={`key-${index}`}/>
                )
            }
        </View>
    )

}


