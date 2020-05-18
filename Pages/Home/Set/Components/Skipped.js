import React from 'react' ; 
import { View, Text, StyleSheet} from 'react-native' ; 

import  {
    globals,
    colors
} from '../../../../Styles/globals.js';

import {
    Icon
} from 'native-base' ; 

const styles = StyleSheet.create({
    container:{
        paddingTop:20
    },
    iconContainer:{
        width:`100%`,
    }
})


export default function Skipped() {

    
    return (
        <View style={[styles.container]}>
            <View style={[styles.iconContainer]}>
                <Icon name="x-circle" type="Feather" style={[colors.colorPrimaryLighter,{textAlign:"center",fontSize:100}]}/>
                <Text style={[globals.h5,colors.colorNeutral,{paddingTop:15,textAlign:"center"}]}>This set was skipped </Text>
            </View>
        </View>
    ) ; 
 

}
