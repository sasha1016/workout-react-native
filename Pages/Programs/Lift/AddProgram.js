import React,{useState,useEffect} from 'react'  ;

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 
import {capitalize} from '../../../Utilities' ; 

import DaySetsForm from './Components/DaySetsForm' ; 

import {Modal,View,Text,ScrollView,StyleSheet,FlatList} from 'react-native' ; 
import {Picker, Item,Label,Input,List,ListItem,Body,Toast,Right,Icon, Radio} from 'native-base' ; 
import {Title,Appbar,Chip, Button} from 'react-native-paper' ; 

const programs = [
    {title:"Smolov",lift:"squat",duration:6,frequency:2,rating:3.5,increase:3},
    {title:"Smolov Jr.",lift:"bench",duration:6,frequency:4,rating:4,increase:10},
    {title:"Candito",lift:"deadlift",duration:8,frequency:3,rating:3.5,increase:6},
    {title:"Mark Bell",lift:"squat",duration:12,frequency:4,rating:3.5,increase:7},
] ; 

const input = StyleSheet.create({
    label:{
        padding:5,
    }
}) ; 


const BasicsForm = ({onDaySelected}) => {

    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] ; 

    var [values,setValues] = useState({
        name:'',
        duration:0,
        type:false,
        weightFactor:false,
        frequency:0,
        days:[],
        selected:[] , //Array of names of all selected days
    }) ; 
    
    var enabledCommonCondition = values.selected.length <= values.frequency - 1 ;

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

        let newSelected = values.selected.filter((d) => {return (d===day? false : true)})
        let newDays = values.days.filter((d) => {return (d.name === day ? false : true )})  ; 
        setValues({...values,days:newDays,selected:newSelected}) ; 


    }

    return (
        <View>
            <Item floatingLabel>
                <Label style={[globals.h5,colors.colorPrimaryLighter,input.label]}>Name</Label>
                <Input style={{padding:5}} onChangeText={(name) => setValues({...values,name:name})}/>
            </Item>
            <Item  style={[globals.paddingTop]}>
                <Picker
                    mode="dropdown"
                    onValueChange={(type) => setValues({...values,type})}
                    selectedValue={values.type || false}
                >
                    <Picker.Item label="Type" value={false}/>
                    <Picker.Item label="Main Lift" value="sbd"/>
                    <Picker.Item label="Accessory" value="accessory"/>
                </Picker>
            </Item>
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
                        let daySelected = values.selected.includes(day); 
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
                                                    selected:[...values.selected,day],
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
                                    <BasicsForm/>
                                </Body>
                            </ListItem>
                        </List>
                    </View>
            </ScrollView>
        </Modal>
    )
}