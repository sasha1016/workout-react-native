import React,{useState,useEffect} from 'react'  ;

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 
import {capitalize} from '../../../Utilities' ; 

import {MUSCLE_GROUPS} from '../../../Constants' ; 
import {API,V1} from '../../../config/api' ;

import Header from '../../../Components/ListHeader' ; 
import CustomListItem from '../../../Components/ListItem2' ;

import {View,ScrollView,StyleSheet} from 'react-native' ; 
import {Button,Text} from 'native-base' ; 
import {Chip} from 'react-native-paper' ; 


import Day from './Components/Day' ; 

import { Name,Duration,PickAccessoryLift,PickMainLift,PickLift,PickFrequency,Type,WeightFactor } from './FormItems' 

const axios = require('axios') ; 

const input = StyleSheet.create({
    label:{
        padding:5,
    }
}) ; 


const AddProgramForm = ({visible,toggler}) => {

    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] ; 

    var [values,setValues] = useState({
        name:'',
        duration:0,
        type:false,
        lift:false,
        weightFactor:false,
        frequency:0,
        days:[],
        preferredDays:[] , //Array of names of all selected days
    }) ; 


    const styles = StyleSheet.create({
        chip:{
            borderColor:colorCodes.neutral,
            marginRight:10,
            marginBottom:10,
            paddingTop:0,
        },
        chipContainer:{
            flexWrap:'wrap',
            alignItems:'flex-start',
            flexDirection:'row',

        }
    }) ; 

    const [currentDayToggled,setCurrentDayToggled] = React.useState(null) ; 



    const onSetAdd = (set,day,lift) => {

        var updatedDayToPush = values.days.filter((dayObj) => {return dayObj.name === day})[0]  ;

        if (updatedDayToPush.toComplete.length !== 0) {
            var addedFlag = false ; 

            updatedDayToPush.toComplete.map((liftObj,index) => {
                if(liftObj.name === lift.trim()) { // lift exists  
                    addedFlag = true ; 
                    updatedDayToPush.toComplete[index].sets.push(set) ; 
                } 
            }) ; 

            if(!addedFlag) {
                updatedDayToPush.toComplete.push({name:lift.trim(),sets:[set]})
            }

        } else {
            updatedDayToPush.toComplete.push({name:lift.trim(),sets:[set]})
        }
            
        const dayRemovedFromValues = values.days.filter((dayObj) => {return dayObj.name !== day}) ; 

        setValues({...values,days:[...dayRemovedFromValues,updatedDayToPush]}) ; 

    }

    const addProgram = () => {
        axios.post(API.V1 + V1.PROGRAMS.ADD, {
            ...values
        }).then(() => {
            toggler(!visible) ; 
        }).catch((error) => {
            console.warn(error) ; 
        })
    } ; 

    const dayToggler = (day) => {
        setCurrentDayToggled((day === false ? null : day)) ; 
    }

    const addLiftsToDay = (toComplete,nameOfTheDay) => {
        let days = values.days ; 
        days.map((d,index) => {
            if (d.name === nameOfTheDay) {
                days[index] = {...d,toComplete}
            }
        }) ; 

        setValues({...values,days});
    }

    function _renderDays() {
        return (
            <React.Fragment>
                <Header title="Days"/>
                {
                    values.days.map((day) => {
                        return (
                            <CustomListItem 
                                title={day.name}
                                desc={[`Click to add lifts`]}
                                mode="NAV"
                                onPress={() => dayToggler(day.name)}
                            />
                        )
                    })
                }
            </React.Fragment>
        )
    }

    const Chips = () => {


        function _unSelectChip(day) {
            let newSelected = values.preferredDays.filter((d) => {return (d===day? false : true)})
            let newDays = values.days.filter((d) => {return (d.name === day ? false : true )})  ; 
            setValues({...values,days:newDays,preferredDays:newSelected}) ;             
        }

        function _selectChip(day,chipSelected) {
            if(!chipSelected) { 
                setValues(
                    {
                        ...values,
                        preferredDays:[...values.preferredDays,day],
                        days:[...values.days,{name:day,toComplete:[]}]
                    }
                ) ; 
            } else {
                enabled ? _unSelectChip(day) : false ;
            }
        }


        return(
            days.map((day) => {
                let chipSelected = values.preferredDays.includes(day); 
                let moreChipsCanBeSelected = values.preferredDays.length <= values.frequency - 1 ;
                let enabled = moreChipsCanBeSelected || chipSelected;

                return (
                    <Chip 
                        mode="outlined"
                        disabled={enabled ? false : true}
                        style={[
                            styles.chip,
                            {backgroundColor:( chipSelected ? colorCodes.primary : "transparent")}
                        ]}
                        textStyle={[
                            (!chipSelected ? (enabled ? colors.colorPrimary : colors.colorNeutral) : colors.colorSecondary),
                            globals.h6,
                            text.capitalize
                        ]}
                        selected={chipSelected}
                        selectedColor={colorCodes.secondary}
                        onPress={() => _selectChip(day,chipSelected)}
                        key={`key-${day}`}
                    >
                        {`${day}`}
                    </Chip>
                )
            })
        ); 
    }

    return (
        <View style={{alignContent:'stretch',justifyContent:'center'}}>
            <Day 
                visible={currentDayToggled ? true : false} 
                toggler={dayToggler} 
                nameOfTheDay={currentDayToggled} 
                program={values}
                addLiftsToDay={addLiftsToDay}
            />

            <Name onChangeName={(name) => setValues({...values,name:name})} />
            <Duration onChangeDuration={(duration) => setValues({...values,duration:duration})} />
            <PickLift onPickLift={(lift) => setValues({...values,lift:lift})} lift={values.lift}/>
            {
                values.lift === "main" ?
                    <PickMainLift 
                        liftName={values.liftName} 
                        onPickMainLift={(liftName) => setValues({...values,liftName:liftName})}
                    />
                :
                    <PickAccessoryLift 
                        onPickAccessoryLift={(muscleGroup) => setValues({...values,muscleGroup:muscleGroup})}
                        muscleGroup={values.muscleGroup}
                    />
            }
            <Type type={values.type} onSelectType={(type) => setValues({...values,type:type})}/>
            <WeightFactor type={values.weightFactor} onSelectWeightFactor={(weightFactor) => setValues({...values,weightFactor:weightFactor})}/>
            <PickFrequency onPickFrequency={(frequency) => setValues({...values,frequency:frequency})} frequency={values.frequency}/>

            <View style={[globals.paddingTop,styles.chipContainer]}>
                <Chips />
            </View>

            {
                values.days.length === 0 ? 
                    null
                : 
                    _renderDays() 
            }
            

            <View style={[globals.paddingTop]}>
                <Button
                    block
                    style={[colors.bgGrey,{shadowOpacity:0,elevation:0}]}
                    onPress={() => {
                        addProgram();
                    }}
                >
                    <Text style={[colors.colorPrimaryLighter]}>Add Program</Text>
                </Button>
            </View>
        </View>       
    )
}



export default function AddProgram() {


    return (
    
            <ScrollView>
                <View style={[globals.rootContainer]}>
                    <AddProgramForm/>
                </View>
            </ScrollView>
        
    )
}