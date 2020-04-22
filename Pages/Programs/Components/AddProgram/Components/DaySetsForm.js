import React,{useState,useEffect} from 'react'  ;

import {globals,colorCodes,colors,text} from '../../../../../Styles/globals' ; 

import {View,Text,Alert} from 'react-native' ; 
import {Item,Label,Input,List,ListItem,Body,Right,Icon} from 'native-base' ; 
import { Button} from 'react-native-paper' ; 



export default function DaySetsForm({day,index,onSetAdd,toComplete}) {

    const [lift,setLift] = useState("") ; 

    const setToAddInitialState = {reps:null,percentage:null} ; 

    const [setToAdd,updateSetToAdd] = useState(setToAddInitialState) ; 

    let lifts = Object.keys(toComplete) ; 
    let sets = [].concat.apply([],Object.values(toComplete)); 

    return (
        <View>
            <ListItem itemHeader style={[{borderBottomWidth:1,paddingBottom:10,borderBottomColor:colorCodes.grey}]}>
                <Text style={[globals.h5,text.bold,text.uppercase,colors.colorPrimary]}>{`Day ${index+ 1} / ${day}          `}</Text>
            </ListItem>
            <ListItem noBorder style={{marginLeft:0,marginRight:0,width:"100%",paddingRight:0}}>
                <Body style={{marginLeft:0,padding:0}}>
                    <View>
                        <List style={{paddingBottom:20}}>
                            {  

                                !sets.length ? 
                                    (<Text style={[globals.h5,colors.colorNeutral,text.center]}>Add a set below</Text>)
                                :
                                    toComplete.map((exercise,index) => {
                                        return(
                                            <ListItem key={`key-${index}`} noBorder>
                                                <Body >
                                                    <Text style={[globals.h4,text.bold,colors.colorPrimary]}>{`${exercise.name}`}</Text>
                                                    {
                                                        exercise.sets.map((set) => 
                                                            <Text note noOfLines={1} style={[globals.h5,colors.colorNeutral,{marginTop:5}]}>{`${set.reps} Reps at ${set.percentage}% of 1RM`}</Text>
                                                        )
                                                    }
                                                </Body>
                                                <Right>
                                                    <Icon name="trash-2" type="Feather" active style={colors.colorPrimaryLighter}/>
                                                </Right>
                                            </ListItem>
                                        )
                                    })
                            }
                            
                        </List>
                        <View style={{width:"100%",borderTopWidth:1,borderTopColor:colorCodes.grey,padding:0,}}>
                            <View style={[globals.flex,globals.flexRow,{width:"100%"}]}>
                                <Item inlineLabel style={[globals.flex,{marginRight:5}]}>
                                    <Label style={[globals.h5,colors.colorPrimaryLighter,{paddingLeft:5}]}>Lift</Label>
                                    <Input 
                                        keyboardType="default" 
                                        style={[globals.h5,colors.colorPrimary]} 
                                        value={lift} 
                                        onChangeText={(value) => setLift(value)}
                                    />
                                </Item>
                            </View>
                            <View style={[globals.flex,globals.flexRow,{width:"100%"}]}>
                                <Item fixedLabel style={[globals.flex,{marginRight:5}]}>
                                    <Label style={[globals.h5,colors.colorPrimaryLighter,{paddingLeft:5}]}>Reps</Label>
                                    <Input 
                                        keyboardType="numeric" 
                                        style={[globals.h5,colors.colorPrimary]} 
                                        value={setToAdd.reps} 
                                        onChangeText={(value) => updateSetToAdd({...setToAdd,reps:value})}
                                    />
                                </Item>
                                <Item inlineLabel style={[globals.flex,{marginLeft:5}]}>
                                    <Label style={[globals.h5,colors.colorPrimaryLighter,{paddingLeft:5}]}>Percentage</Label>
                                    <Input 
                                        keyboardType="numeric"
                                        style={[globals.h5,colors.colorPrimary,{margin:0,padding:0,marginLeft:-10}]} 
                                        value={setToAdd.percentage} 
                                        onChangeText={(value) => updateSetToAdd({...setToAdd,percentage:value})}
                                        onBlur={() => {
                                            if(setToAdd.reps !== null && setToAdd.percentage !== null) {
                                                onSetAdd(setToAdd,day,lift) ; 
                                                setLift("") ; 
                                                updateSetToAdd(setToAddInitialState) ;
                                            } 
                                        }}
                                    />
                                </Item>
                            </View>
                        </View>
                    </View>
                </Body>
            </ListItem>
        </View>
    )

}
