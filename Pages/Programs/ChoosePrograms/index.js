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
                lift:route.params.lift
            }
        }).then((response) => {
            console.warn(response.data) ; 
            setPrograms(response.data)
        }).catch((error) => {
            console.warn(error, "asdas") ; 
        })
    },[]) ; 

    return(
        <FlatList 
            data={programs} 
            renderItem={(item) => <ListItem title={item.item.name} desc={[item.item.liftName]} mode="NAV" onPress={() => navigation.push('ProgramInformation',{program:item.item})}/>}
            keyExtractor={(item,index) => `key-${index}`}
            contentContainerStyle={{padding:20}}
        />
    )

}


