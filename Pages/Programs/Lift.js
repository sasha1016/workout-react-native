import React, {useState,useEffect} from 'react' ; 
import { View, ScrollView,Text,StyleSheet} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 
import {capitalize} from '../../Utilities' ; 
import ChangeProgram from './Lift/ChangeProgram'  ;

import {List,ListItem,Left,Icon,Body,Right} from 'native-base' ; 

import moment from 'moment' ; 




export default function Lift({navigation,route}) {

    const detail = {
        program:"Smolov",
        type:"main",
        started:"15/03/20",
        programDuration:5,
        frequency:4,
        workoutsCompleted:10,
    }

    const details = [
        {displayTitle:"Program",key:"program",displayValue:(value) => {return `${value}`},value:"Smolov"},
        {displayTitle:"Type",key:"type",displayValue:(value) => {return `${value}`},value:"main lift"},
        {displayTitle:"Commenced",key:"started",displayValue:(value) => {return `${moment(value,"YYYYMMDD").fromNow()}`},value:"20200220"},
        {displayTitle:"Duration",key:"duration",displayValue:(value) => {return `${value} weeks`},value:6},
        {displayTitle:"Frequency",key:"frequency",displayValue:(value) => {return `${value} x week`},value:4},
        {displayTitle:"Workouts Completed",key:"workoutsCompleted",displayValue:(value,total) => {return `${value} of ${total}`},value:23}
    ] ; 

    const [changeProgram,setChangeProgram] = useState(false) ;

    useEffect(() => {
        navigation.setOptions({
            title:`${capitalize(route.params.lift.name)}`
        })
    })

    return (
        <View>
            <ChangeProgram visible={changeProgram} toggler={setChangeProgram} currentProgram={details} lift={route.params.lift}/>
            <ScrollView>
                <View style={[{flex:1,marginTop:10},globals.rootContainer]}>
                    <List itemDivider={false}>
                        {
                            details.map((detail) => {
                                return(
                                    <ListItem noBorder
                                        style={[listItem.container,{marginLeft:0,paddingBottom:15}]}
                                        
                                    >
                                        <Body>
                                            <Text style={[globals.h4,text.bold,colors.colorPrimary]}>
                                                {capitalize(detail.displayTitle)}
                                            </Text>
                                            <Text note noOfLines={1} style={[colors.colorNeutral]}>
                                                {
                                                    detail.key === "workoutsCompleted" ? 
                                                        detail.displayValue(detail.value,(details[3].value * details[4].value)) 
                                                    : 
                                                        capitalize(detail.displayValue(detail.value))
                                                }
                                            </Text>
                                        </Body>
                                        {
                                            detail.key == "program" ?
                                                <Right>
                                                    <Icon 
                                                        name="edit-2"
                                                        onPress={() => {
                                                            setChangeProgram(!changeProgram) 
                                                        }} 
                                                        type="Feather" 
                                                        active 
                                                        style={colors.colorPrimaryLighter}/>
                                                </Right>
                                            : 
                                                null
                                        }
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

