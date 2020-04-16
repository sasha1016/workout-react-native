import React,{useEffect,useState} from 'react' ; 
import { View, ScrollView,Text,StyleSheet} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 
import {capitalize} from '../../Utilities' ; 

import AddProgram from './Lift/AddProgram' ; 

import {List,ListItem,Left,Icon,Body,Right,Button} from 'native-base' ; 
import {IconButton} from 'react-native-paper';

import RenderUserLifts from './Components/RenderUserLifts'

const axios = require('axios') ; 

import {API_V1,USER} from '../../config/index' ; 
import {TEST} from '../../config/api' ; 

import NavButton from '../../Components/NavButton.js';


export default function Programs({navigation}) {

    var [lifts,setLifts] = useState([]);

    function goToLift(lift) {
        navigation.push('Lift',{lift}) ;
    }

    function goToChooseProgram(lift) {
        navigation.push('ChooseProgram',{lift}); 
    }

    useEffect(() => {

        axios.get(API_V1+USER.GET_PROGRAMS, {
            params:{
                userId:`${TEST.USER}`,
                keys:"muscleGroup programName programId lift frequency liftName duration commenced workoutsCompleted"
            }
        })
        .then((response) => {
            console.warn(response.data) ; 
            setLifts(response.data) ;  
        })
        .catch((error) => {
            console.warn(error.response.data.message)
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
                        <RenderUserLifts lifts={lifts} onPressCB={goToLift} onStartNewProgram={goToChooseProgram}/>
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

