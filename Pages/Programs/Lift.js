import React, {useState,useEffect} from 'react' ; 
import { View, ScrollView,Text,StyleSheet} from 'react-native' ; 

import {globals,colors,text} from '../../Styles/globals' ; 
import {capitalize} from '../../Utilities' ; 
import ChangeProgram from './Lift/ChangeProgram'  ;

import {List,ListItem,Icon,Body,Right} from 'native-base' ; 

import moment from 'moment' ; 



export default function Lift({navigation,route}) {

    const details = [
        {displayTitle:"Program",key:"programName",displayValue:(value) => {return `${value}`}},
        {displayTitle:"Type",key:"lift",displayValue:(value) => {return `${value}`}},
        {displayTitle:"Muscle Group",key:"muscleGroup",displayValue:(value) => {return `${value}`}},
        {displayTitle:"Lift",key:"liftName",displayValue:(value) => {return `${value}`}},
        {displayTitle:"Commenced",key:"commenced",displayValue:(value) => {return `${moment(value,"YYYY-MM-DD").fromNow()}`}},
        {displayTitle:"Duration",key:"duration",displayValue:(value) => {return `${value} weeks`}},
        {displayTitle:"Frequency",key:"frequency",displayValue:(value) => {return `${value} x week`}},
        {displayTitle:"Workouts Completed",key:"workoutsCompleted",displayValue:(value,total) => {return `${value} of ${total}`}}
    ] ; 

    const goToChangeProgram = () => {
        navigation.push(
            'ChooseProgram',
            {
                filterBy:(route.params.lift.liftName ? "liftName" : "muscleGroup"),
                filterByValue:(route.params.lift.liftName || route.params.lift.muscleGroup), 
                title:`${capitalize(route.params.lift.liftName || route.params.lift.muscleGroup)} Programs`,
                programSwitch:true,
                userProgramToSwitch:route.params.lift._id //The ID of the document stored in UserPrograms Collection 
            }
        ) ; 
    }

    useEffect(() => {

        navigation.setOptions({
            title:`${capitalize(route.params.lift.liftName || route.params.lift.muscleGroup)}`
        })
    }, [])

    return (
        <View>
            <ScrollView>
                <View style={[{flex:1,marginTop:10},globals.rootContainer]}>
                    <List itemDivider={false}>
                        {
                            details.map((detail) => {

                                let lift = route.params.lift ; 
                            
                                if(lift[detail.key] !== undefined) {
                                    return(
                                        <ListItem noBorder
                                            style={[listItem.container,{marginLeft:0,paddingBottom:15}]}
                                            
                                        >
                                            <Body>
                                                <Text style={[globals.h4,text.bold,colors.colorPrimary]}>
                                                    {capitalize(detail.displayTitle)}
                                                </Text>
                                                <Text note noOfLines={1} style={[colors.colorNeutral,globals.h5,{marginTop:5}]}>
                                                    {
                                                        detail.key === "workoutsCompleted" ? 
                                                            detail.displayValue(lift[detail.key],(lift[details[5].key] * lift[details[6].key])) 
                                                        : 
                                                            capitalize(detail.displayValue(lift[detail.key]))
                                                    }
                                                </Text>
                                            </Body>
                                            {
                                                detail.key == "programName" ?
                                                    <Right>
                                                        <Icon 
                                                            name="edit-2"
                                                            onPress={() => {
                                                                goToChangeProgram() ; 
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
                                } else {
                                    return false;
                                }
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

