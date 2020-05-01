import React,{useEffect,useState} from 'react' ; 
import { View, ScrollView,Text,StyleSheet} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 
import {capitalize} from '../../Utilities' ; 

import AddProgram from './Components/AddProgram' ; 

import {List} from 'native-base' ; 
import {IconButton} from 'react-native-paper';

import RenderUserPrograms from './Components/RenderUserPrograms'

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

    function viewPrograms(filterBy,filterByValue) {
        navigation.push('ViewPrograms',{filterBy,filterByValue}) ;
    }

    useEffect(() => {

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
            headerRight:() => <IconButton icon="plus" color={colorCodes.secondary} onPress={ () => setAddProgram(!addProgram)}/>
        }) ;

    },[]) ; 

    const [addProgram,setAddProgram] = useState(false) ; 

    return (
        <View>
            <AddProgram visible={addProgram} toggler={setAddProgram} />
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


const styles = StyleSheet.create({
    info:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'stretch'
    }
})

const listItem = StyleSheet.create({
    container:{
        paddingBottom:0,
        paddingLeft:5,
    },
    child:{
        flexDirection:'row',    
        justifyContent:'flex-start'
    }
})

