import React,{useEffect,useState} from 'react' ; 
import { View, ScrollView,Text,StyleSheet} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 

import {List} from 'native-base' ; 
import {IconButton} from 'react-native-paper';

import RenderUserPrograms  from './Components/RenderUserPrograms'

const axios = require('axios') ; 

import {
    TEST,
    API,
    V1
} from '../../config/api' ; 


export default function Programs({navigation}) {

    var [programs,setPrograms] = useState([]);

    function viewUserProgram(userProgram) {
        navigation.push('UserProgramInformation',{userProgram}) ; 
    }

    function viewPrograms(filterBy,filterByValue,exclude) {
        navigation.push('ViewPrograms',{filterBy,filterByValue,exclude}) ;
    }

    React.useEffect(() => {

        axios.get(API.V1 + V1.USER.PROGRAMS.GET, {
            params:{
                user:`${TEST.USER}`,
                populate:"program"
            }
        })
        .then((response) => {
            setPrograms(response.data) ;  
        })
        .catch((error) => {
            console.warn(error)
        })  ; 

        navigation.setOptions({
            headerRight:() => <IconButton icon="plus" color={colorCodes.secondary} onPress={ () => navigation.push('AddProgram')}/>
        }) ;

    },[navigation]) ; 

    return (
        <View>
            <ScrollView>
                <View style={[{flex:1,marginTop:10},globals.rootContainer]}>
                    <List itemDivider={false}>
                        <RenderUserPrograms userPrograms={programs} viewUserProgramInformation={viewUserProgram} onStartNewProgramIntent={viewPrograms}/>
                    </List>
                </View>
            </ScrollView>
        </View>
    ) ; 
 

}
