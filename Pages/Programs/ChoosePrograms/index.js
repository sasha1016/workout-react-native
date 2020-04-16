import React,{useEffect,useState} from 'react' ; 
import { View, ScrollView,Text,StyleSheet,FlatList} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 
import {capitalize} from '../../../Utilities' ; 

const axios = require('axios') ; 

import {API,V1} from '../../../config/index' ; 
import ListItem from '../../../Components/ListItem2.js';


export default function ChooseProgram({navigation,route}) {

    var [programs,setPrograms] = useState([]);

    useEffect(() => {
        axios.get(API.V1 + V1.PROGRAMS.GET, {
            params:{
                filterBy:(route.params.filterBy),
                value:(route.params.filterByValue)
            }
        }).then((response) => {
            setPrograms(response.data)
        }).catch((error) => {
            console.warn(error) ; 
        })
        

        if(route.params.title) {
            navigation.setOptions({
                title:`${route.params.title}`
            }) ; 
        }
    },[]) ; 

    return(
        <FlatList 
            data={programs} 
            renderItem={(item) => <ListItem title={item.item.name} desc={[item.item.liftName || item.item.muscleGroup]} mode="NAV" onPress={() => navigation.push('ProgramInformation',{program:item.item,programSwitch:(route.params.programSwitch || false)})}/>}
            keyExtractor={(item,index) => `key-${index}`}
            contentContainerStyle={{padding:20}}
        />
    )

}


