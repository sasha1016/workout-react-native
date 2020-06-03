import React,{useState} from 'react'  ;
import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 
import {API,V1} from '../../../config/api' ;
import Divider from '../../../Components/Divider' ; 
import CustomListItem from '../../../Components/ListItem2' ;
import {View,ScrollView,StyleSheet,Alert, ToastAndroid} from 'react-native' ; 
import {Button,Text} from 'native-base' ; 
import {Chip} from 'react-native-paper' ; 
import Day from './Components/Day' ; 
import { Name,Duration,PickAccessoryLift,PickMainLift,PickLift,PickFrequency,Type,WeightFactor } from './FormItems' 
import Program from '../../../Classes/Program'

const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] ; 


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

    var WEEKS = [...Array(parseInt(values.duration || 0)).keys()] ; 

    const [currentDayToggled,setCurrentDayToggled] = React.useState(null) ;
    
    function addLastDayOfWeekFlag() {
        let preferredDays = values.preferredDays ; 
        let days = values.days ; 
        let lastDay = preferredDays[preferredDays.length - 1] ; 

        days = days.map((day) => {
            return {
                ...day,
                lastDayOfWeek:(day.name === lastDay ? true : false)
            }
        })
        return ({...values,days}) ; 
    }

    const addProgram = () => {

        var values = addLastDayOfWeekFlag(); 

        let program = new Program(values) ;
        program.add()
        .then(() => {
            ToastAndroid.showWithGravity(`Program added successfully`,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
            navigation.goBack()
        })
        .catch((error) => {
            ToastAndroid.showWithGravity(`${error}`,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        })
    } ; 

    const dayToggler = (day) => {
        setCurrentDayToggled((day === false ? null : day)) ; 
    }

    const addLiftsToDay = (toComplete,dayDetails,uniqueLiftsOfTheDay) => {
        let days = values.days ;
        let uniqueLiftsToAdd = uniqueLiftsOfTheDay.filter((lift) => {return !values.uniqueLifts.includes(lift)} ) ;

        days.map((d,index) => {
            if (d.name === dayDetails.name && d.week === dayDetails.week) {
                days[index] = {...d,toComplete}
            }
        }) ; 
        setValues({...values,days,uniqueLifts:[...values.uniqueLifts,...uniqueLiftsToAdd]});
    }

    function _renderDays() {
        return (
            <React.Fragment>
                {
                    WEEKS.map((_,index) => {
                        return(
                            <View key={`week-${index}`}>
                                <Divider title={`Week ${index+1}`} key={`divider-${index}`}/>
                                {
                                    values.preferredDays.map((day) => {
                                        return (
                                            <CustomListItem 
                                                title={day}
                                                desc={[`Click to add lifts`]}
                                                mode="NAV"
                                                key={`${day}`}
                                                onPress={() => dayToggler({name:day,week:index})}
                                            />
                                        )
                                    })
                                }
                            </View>
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

        function sortWeekdays(day) {
            let daysCopy = [...values.preferredDays,day] ; 
            let sorted = daysCopy.map((d) => days.indexOf(d)).sort() ;
            return (sorted.map((index) => days[index])) ; 
        }

        function _selectChip(day,chipSelected,enabled) {
            if(!chipSelected) { 
                let preferredDays = sortWeekdays(day) ; 
                let daysToAdd = WEEKS.map((_,index) => {
                    return {
                        name:day,
                        toComplete:[],
                        week:index
                    }
                }) ;  
                setValues(
                    {
                        ...values,
                        preferredDays:preferredDays,
                        days:[...values.days,...daysToAdd]
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
                        onPress={() => (enabled ? _selectChip(day,chipSelected,enabled) : _alert(moreChipsCanBeSelected,valuesSet))}
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
                dayDetails={currentDayToggled} 
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