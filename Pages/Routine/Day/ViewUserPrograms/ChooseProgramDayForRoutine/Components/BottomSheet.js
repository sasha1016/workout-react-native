import React from 'react' ; 

import NavButton from '../../../../../../Components/NavButton' ; 

import { 
    colors,
    globals,
    text,
    colorCodes
} from '../../../../../../Styles/globals' ; 


import {
    View,
    Text
} from 'react-native' ; 

import {
    Item,
    Label,
    Input
} from 'native-base' ; 

import RBSheet from "react-native-raw-bottom-sheet";

const Content = ({selectedDay,onSubmit}) => {
    
        var selectedDayCopy = selectedDay ; 
    
        var isSetOneRM = [] ; 

        const setOneRM = (exercise,oneRM) => {
            let toComplete = selectedDayCopy.toComplete ; //An array 
    
            toComplete.map((e,index) => {
                e.name === exercise.name ? toComplete[index] = {...e,oneRM} : null
            })
    
            selectedDayCopy = {...selectedDayCopy,toComplete}
        }
    
    
        return (
            <View style={[globals.rootContainer]}>

                <View style={[{paddingBottom:15,marginBottom:5,borderBottomWidth:1,borderBottomColor:colorCodes.grey}]}>
                    <Text style={[globals.h4,text.bold,colors.colorPrimary]}>One Rep Maxes</Text>
                </View>
                <View>
                    {
                        selectedDay.toComplete.map((exercise) => {
                            return (<Item inlineLabel >
                                <Label style={[globals.h5,colors.colorPrimaryLighter,text.capitalize,{padding:5}]}>
                                    {exercise.name}
                                </Label>
                                <Input 
                                    style={[globals.h5,colors.colorPrimary]} 
                                    keyboardType="numeric"
                                    onChangeText={(oneRM) => setOneRM(exercise,oneRM)}
                                />
                            </Item>)
                        })
                    }
                </View>
                    <NavButton 
                        transparent 
                        icon={false} 
                        //disabled={isSetOneRM.length !== selectedDayCopy.toComplete.length}
                        title="Add"
                        buttonTextStyle={colors.colorSuccess}
                        //containerStyle={{opacity:( isSetOneRM.length !== selectedDayCopy.toComplete.length ? 0.3:1)}}
                        onPress={() => onSubmit(selectedDayCopy)}
                    />
            </View>
        )
}

export default function BottomSheet({bottomSheetRef,selectedDay,onSubmit}) {
    return (
        <RBSheet
            ref={bottomSheetRef}
            duration={300}
            customStyles={{
                container:{
                    borderTopRightRadius:10,
                    borderTopLeftRadius:10,
                    backgroundColor:"#fff"
                }
            }}
        >
            <Content selectedDay={selectedDay} onSubmit={onSubmit}></Content>
        </RBSheet>
    )
}