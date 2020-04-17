import React,{useState,useEffect} from 'react'  ;

import {globals,colorCodes,colors,text} from '../../../../Styles/globals' ; 
import {capitalize} from '../../../../Utilities' ; 

import {MUSCLE_GROUPS} from '../../../../Constants' ; 
import {API,V1} from '../../../../config/api' ;

import DaySetsForm from './Components/DaySetsForm' ; 

import {Modal,View,Text,ScrollView,StyleSheet,FlatList} from 'react-native' ; 
import {Picker, Item,Label,Input,List,ListItem,Body,Toast,Right,Icon, Radio} from 'native-base' ; 
import {Title,Appbar,Chip, Button} from 'react-native-paper' ; 

const axios = require('axios') ; 


const input = StyleSheet.create({
    label:{
        padding:5,
    }
}) ; 


const AddProgramForm = () => {

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
    
    var enabledCommonCondition = values.preferredDays.length <= values.frequency - 1 ;

    const styles = StyleSheet.create({
        chip:{
            borderColor:colorCodes.neutral,
            marginRight:10,
            marginBottom:10
        },
        chipContainer:{
            flexWrap:'wrap',
            alignItems:'flex-start',
            flexDirection:'row'
        }
    }) ; 

    /*
    
    days: [
        name: string, 
        toComplete: {
            Lift : [ {reps:number,percentage:number} ]
        }
    ]
    
    
    */

    const onSetAdd = (set,day,lift) => {

        const dayRemoved = values.days.filter((d)=> {
            if(d.name === day){
                if(d.toComplete[lift] !== undefined) {
                    let liftObj = d.toComplete[lift]; 
                    d.toComplete[lift] = [...liftObj, set] ; 
                } else {
                    d.toComplete[lift] = [set] 
                }
            }
            return true ; 
        }) ; 

        setValues( {...values, days: [ ...dayRemoved ]} )
    }

    const removeFromSelected = (day) => {

        let newSelected = values.preferredDays.filter((d) => {return (d===day? false : true)})
        let newDays = values.days.filter((d) => {return (d.name === day ? false : true )})  ; 
        setValues({...values,days:newDays,preferredDays:newSelected}) ; 

    }

    const addProgram = () => {
        console.warn(values) ;
        axios.post(API.V1 + V1.PROGRAMS.ADD, {
            ...values
        }).then((response) => {
            console.warn(response); 
        }).catch((error) => {
            console.warn(error.response) ; 
        })
    }

    return (
        <View>
            <Item inlineLabel >
                <Label style={[globals.h5,colors.colorPrimaryLighter,input.label]}>Name</Label>
                <Input 
                    style={[globals.h5,colors.colorPrimary]} 
                    onChangeText={(name) => setValues({...values,name:name})}
                />
            </Item>

            <Item  style={[globals.paddingTop]}>
                <Picker
                    mode="dropdown"
                    onValueChange={(lift) => setValues({...values,lift})}
                    selectedValue={values.lift || false}
                >
                    <Picker.Item label="Lift" value={false}/>
                    <Picker.Item label="Main Lift" value="main"/>
                    <Picker.Item label="Accessory" value="access"/>
                </Picker>
            </Item>
            {
                values.lift === "main" ?

                    <Item  style={[globals.paddingTop]}>
                        <Picker
                            mode="dropdown"
                            onValueChange={(liftName) => setValues({...values,liftName})}
                            selectedValue={values.liftName || false}
                        >
                            <Picker.Item label="Lift" value={false}/>
                            <Picker.Item label="Squat" value="squat"/>
                            <Picker.Item label="Bench" value="bench"/>
                            <Picker.Item label="Deadlift" value="deadlift"/>
                        </Picker>
                    </Item>

                :
                    <Item  style={[globals.paddingTop]}>
                        <Picker
                            mode="dropdown"
                            onValueChange={(muscleGroup) => setValues({...values,muscleGroup})}
                            selectedValue={values.muscleGroup || false}
                        >
                            <Picker.Item label="Muscle Group" value={false}/>
                                {
                                    MUSCLE_GROUPS.map((mg) => {
                                        return (<Picker.Item label={capitalize(mg)} value={mg}/>)
                                    })
                                }
                        </Picker>
                    </Item>                
            }
            <View style={[globals.flex,globals.flexRow,globals.paddingTop]}>
                <Item inlineLabel style={[globals.flex,{borderBottomWidth:0,justifyContent:'space-between',marginRight:8}]}>
                    <Label style={[globals.h5,colors.colorPrimaryLighter,input.label]}>Percentage</Label>
                    <Radio 
                        color={colorCodes.primaryLighter} 
                        selectedColor={colorCodes.primary} 
                        selected={values.weightFactor == "percentage"}
                        onPress={() => setValues({...values,weightFactor:"percentage"})}
                    />
                </Item>
                <Item inlineLabel  style={[globals.flex,{borderBottomWidth:0,justifyContent:'space-between',marginLeft:8}]}>
                    <Label style={[globals.h5,colors.colorPrimaryLighter,input.label]}>Absolute</Label>
                    <Radio 
                        color={colorCodes.primaryLighter} 
                        selectedColor={colorCodes.primary} 
                        onPress={() => setValues({...values,weightFactor:"absolute"})}
                        selected={values.weightFactor == "absolute"}
                    />
                </Item>
            </View>
            <View style={[globals.flex,globals.flexRow,globals.paddingTop]}>
                <Item inlineLabel style={[globals.flex,{borderBottomWidth:0,justifyContent:'space-between',marginRight:8}]}>
                    <Label style={[globals.h5,colors.colorPrimaryLighter,input.label]}>Strength</Label>
                    <Radio 
                        color={colorCodes.primaryLighter} 
                        selectedColor={colorCodes.primary} 
                        selected={values.type == "strength"}
                        onPress={() => setValues({...values,type:"strength"})}
                    />
                </Item>
                <Item inlineLabel  style={[globals.flex,{borderBottomWidth:0,justifyContent:'space-between',marginLeft:8}]}>
                    <Label style={[globals.h5,colors.colorPrimaryLighter,input.label]}>Hypertrophy</Label>
                    <Radio 
                        color={colorCodes.primaryLighter} 
                        selectedColor={colorCodes.primary} 
                        onPress={() => setValues({...values,type:"hypertophy"})}
                        selected={values.type == "hypertrophy"}
                    />
                </Item>
            </View>
            <Item inlineLabel style={[globals.paddingTop]}>
                <Label style={[globals.h5,colors.colorPrimaryLighter,input.label]}>Duration</Label>
                <Input 
                    keyboardType="numeric" 
                    style={[globals.h5,colors.colorPrimary]} 
                    onChangeText={(duration) => setValues({...values,duration})}
                />
            </Item>
            <Item picker style={[globals.paddingTop]}>
                <Picker
                    mode="dropdown"
                    selectedValue={values.frequency}
                    onValueChange={(frequency) => setValues({...values,frequency})}
                >
                    <Picker.Item label="Frequency" value={0} />
                    <Picker.Item label="1 x week" value={1} />
                    <Picker.Item label="2 x week" value={2} />
                    <Picker.Item label="3 x week" value={3} />
                    <Picker.Item label="4 x week" value={4} />
                    <Picker.Item label="5 x week" value={5} />
                    <Picker.Item label="6 x week" value={6} />
                    <Picker.Item label="7 x week" value={7} />
                </Picker>
            </Item>
            <View style={[globals.paddingTop,styles.chipContainer]}>
                {
                    
                    days.map((day) => {
                        let daySelected = values.preferredDays.includes(day); 
                        var enabled =  enabledCommonCondition || daySelected;
                        return (
                            <Chip 
                                mode="outlined"
                                disabled={enabled ? false : true}
                                style={[styles.chip,{backgroundColor:( daySelected ? colorCodes.primary : "transparent")}]}
                                textStyle={[( !daySelected ? (enabled ? colors.colorPrimary : colors.colorNeutral) : colors.colorSecondary),globals.h5]}
                                selected={daySelected}
                                selectedColor={colorCodes.secondary}
                                onPress={() => {
                                        if(!daySelected) { 
                                            setValues(
                                                {
                                                    ...values,
                                                    preferredDays:[...values.preferredDays,day],
                                                    days:[
                                                        ...values.days, 
                                                        {name:day,toComplete:{}}
                                                    ]
                                                }
                                            ) ; 
                                        } else {
                                            if (!enabled) {
                                                null
                                            } else {
                                                removeFromSelected(day) ;
                                            }
                                        
                                        }
                                      
                                    }
                                }
                                key={`key-${day}`}
                            >
                                {capitalize(day)}
                            </Chip>
                        )
                    })
                }
            </View>
           
            {
                values.days.map((day,index) => {
                    return (<DaySetsForm day={day.name} index={index} onSetAdd={onSetAdd} toComplete={day.toComplete} key={`key-${index}`} />)
                }) 
            }

            <View style={[globals.flex,globals.flexRow,globals.paddingTop,{alignItems:'center',justifyContent:'center'}]}>
                <Button
                    mode="transparent"
                    color={colorCodes.secondary}
                    icon="plus"
                    compact
                    style={[globals.h5,colors.bgPrimary,{marginLeft:5}]}
                    labelStyle={[globals.h5,colors.colorSecondary]}
                    onPress={() => {
                        addProgram();
                    }}
                >
                    Add Program
                </Button>
            </View>
        </View>       
    )
}



export default function AddProgram({visible,toggler}) {


    return (
        <Modal visible={visible} animationType="slide">
            <ScrollView>
                    <Appbar style={[{top:0,left:0,height:65,width:"100%"},colors.bgPrimary]}>
                        <Appbar.Action icon="close" color={colorCodes.secondary} onPress={() => toggler(!visible)}/>
                        <Title style={[text.bold,globals.h4,colors.colorSecondary,text.left]}>{`Add Program `}</Title>
                    </Appbar>
                    <View style={[globals.rootContainer]}>
                        <List>
                            <ListItem itemHeader style={[{borderBottomWidth:1,paddingBottom:10,borderBottomColor:colorCodes.grey}]}>
                                <Text style={[globals.h5,text.bold,text.uppercase,colors.colorNeutral]}>Information  </Text>
                            </ListItem>
                            <ListItem noBorder style={[{width:"100%",marginLeft:0}]}>
                                <Body style={{width:"100%"}}>
                                    <AddProgramForm/>
                                </Body>
                            </ListItem>
                        </List>
                    </View>
            </ScrollView>
        </Modal>
    )
}