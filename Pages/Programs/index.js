import React,{useEffect,useState} from 'react' ; 
import { View, ScrollView,Text,StyleSheet} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 
import {capitalize} from '../../Utilities' ; 

import AddProgram from './Lift/AddProgram' ; 

import {List,ListItem,Left,Icon,Body,Right} from 'native-base' ; 
import {IconButton} from 'react-native-paper';

const axios = require('axios') ; 

import {API_V1,USER} from '../../config/index' ; 


export default function Programs({navigation}) {

    var [main,setMain] = useState([]) ; 
    var [accessories,setAccessories] = useState([]) ; 

    function goToLift(lift) {
        navigation.push('Lift',{lift}) ;
    }

    function splitLifts(lifts) {
        lifts.map((program) => {
            (program.lift === "main" ? setMain([...main,program]) : setAccessories([...accessories,program]) )
        }) ; 
    }

    useEffect(() => {

        axios.get(API_V1+USER.GET_PROGRAMS, {
            params:{
                userId:"1",
                keys:"muscleGroup programName programId lift frequency liftName duration commenced workoutsCompleted"
            }
        })
        .then((response) => {
            splitLifts(response.data) ; 
        })
        .catch((error) => {
            console.warn(error.message)
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
                        <ListItem itemHeader style={[listItem.container,{borderBottomWidth:1,paddingBottom:10,borderBottomColor:colorCodes.grey}]}>
                            <Text style={[globals.h5,text.bold,text.uppercase,colors.colorNeutral]}>Main Lifts</Text>
                        </ListItem>
                        {
                            main.map((lift,index) => {
                                return(
                                    <ListItem key={`key-${index}`} onPress={() => goToLift(lift)} noBorder style={[listItem.container,{marginLeft:0}]}>
                                        <Body >
                                            <Text style={[globals.h4,text.bold,colors.colorPrimary]}>{capitalize(lift.liftName)}</Text>
                                            <Text note noOfLines={1} style={[globals.h5,colors.colorNeutral,{marginTop:5}]}>{lift.programName}</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="chevron-right" type="Feather" active style={colors.colorPrimaryLighter}/>
                                        </Right>
                                    </ListItem>
                                )
                            })
                        }
                        <ListItem itemHeader style={[globals.paddingTop,listItem.container,{borderBottomWidth:1,paddingBottom:10,borderBottomColor:colorCodes.grey}]}>
                            <Text style={[globals.h5,text.bold,text.uppercase,colors.colorNeutral]}>Accessories </Text>
                        </ListItem>
                        {
                            accessories.map((lift,index) => {
                                return(
                                    <ListItem noBorder key={`key-${index}`}  onPress={() => goToLift(lift)} style={[listItem.container,{marginLeft:0}]}>
                                        <Body>
                                            <Text style={[globals.h4,text.bold,colors.colorPrimary]}>{capitalize(lift.muscleGroup)}</Text>
                                            <Text note noOfLines={1} style={[globals.h5,colors.colorNeutral,{marginTop:5}]}>{lift.programName}</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="chevron-right" type="Feather" active style={colors.colorPrimaryLighter}/>
                                        </Right>
                                    </ListItem>
                                )
                            })
                        }
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

