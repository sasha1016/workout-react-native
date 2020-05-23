import React,{useState} from 'react'  ;
import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 
import {API,V1} from '../../../config/api' ;
import Divider from '../../../Components/Divider' ; 
import CustomListItem from '../../../Components/ListItem2' ;
import {View,ScrollView,StyleSheet,Alert} from 'react-native' ; 
import {Button,Text} from 'native-base' ; 
import {Chip} from 'react-native-paper' ; 
import Day from './Components/Day' ; 
import { Name,Duration,PickAccessoryLift,PickMainLift,PickLift,PickFrequency,Type,WeightFactor } from './FormItems' 

const axios = require('axios') ; 

const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] ; 


const AddProgramForm = ({navigation}) => {

    var [values,setValues] = useState({
        name:null,
        duration:null,
        type:null,
        lift:null,
        weightFactor:null,
        frequency:null,
        days:[],
        preferredDays:[] , //Array of names of all selected days
        uniqueLifts:[]
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

    const addProgram = () => {
        var message = null ; 
        axios.post(API.V1+ V1.PROGRAMS.ADD, {
            ...values
        }).then(() => {
            message = `Program Added`
        }).catch(() => {
            message = `Program couldn't be added. Try again later.` ;
            message = `${error.data.message}` ; 
        }) ; 
        
        Alert.alert(`Success`,message) ;  
        window.setTimeout(() => navigation.goBack(), 1000) ;
    } ; 

    const dayToggler = (day) => {
        setCurrentDayToggled((day === false ? null : day)) ; 
    }

    const addLiftsToDay = (toComplete,nameOfTheDay,uniqueLiftsOfTheDay) => {
        let days = values.days ;
        let uniqueLiftsToAdd = uniqueLiftsOfTheDay.filter((lift) => {return !values.uniqueLifts.includes(lift)} ) ;

        days.map((d,index) => {
            if (d.name === nameOfTheDay) {
                days[index] = {...d,toComplete}
            }
        }) ; 
        setValues({...values,days,uniqueLifts:[...values.uniqueLifts,...uniqueLiftsToAdd]});
    }

    function _renderDays() {
        return (
            <React.Fragment>
                <Divider title="Days"/>
                {
                    values.days.map((day) => {
                        return (
                            <CustomListItem 
                                title={day.name}
                                desc={[`Click to add lifts`]}
                                mode="NAV"
                                key={`${day.name}`}
                                onPress={() => dayToggler(day.name)}
                            />
                        )
                    })
                }
            </React.Fragment>
        )
    }

    const Chips = () => {

        function allValuesSet() {

            let toReturn = {value:true,message:`You have't entered a Program `}

            if(values.name === null || values.name === "") {
                toReturn.value = false ; toReturn.message += "Name"
            } else if(!values.duration) {
                toReturn.value = false ; toReturn.message += "Duration"
            } else if(!values.lift) {
                toReturn.value = false ; toReturn.message = `You have't set a Lift type`
            } else if(!values.frequency) {
                toReturn.value = false ; toReturn.message += "Frequency"
            } else if(!values.type) {
                toReturn.value = false ; toReturn.message += `Type`
            } else if(!values.weightFactor) {
                toReturn.value = false ; toReturn.message += `Weight Factor`
            } else {
                toReturn.message = null ; 
            }

            return toReturn; 
        }


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

        function _alert(moreChipsCanBeSelected,valuesSet) {
            let message = `` ; 
            if (!valuesSet.value) {
                message = valuesSet.message ; 
            } else if(!moreChipsCanBeSelected) {
                message =  `The number of days cannot exceed the frequency of the workout`
            } 
            Alert.alert(`Warning`,message) ; 
        }


        return(
            days.map((day) => {
                let chipSelected = values.preferredDays.includes(day); 
                let moreChipsCanBeSelected = values.preferredDays.length <= values.frequency - 1 ;
                let valuesSet = allValuesSet() ; 
                let enabled = moreChipsCanBeSelected || chipSelected && valuesSet.value;

                return (
                    <Chip 
                        mode="outlined"
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
                        onPress={() => (enabled ? _selectChip(day,chipSelected) : _alert(moreChipsCanBeSelected,valuesSet))}
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
            <WeightFactor weightFactor={values.weightFactor} onSelectWeightFactor={(weightFactor) => setValues({...values,weightFactor:weightFactor})}/>
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



export default function AddProgram({navigation}) {


    return (
    
            <ScrollView>
                <View style={[globals.rootContainer]}>
                    <AddProgramForm navigation={navigation}/>
                </View>
            </ScrollView>
        
    )
}