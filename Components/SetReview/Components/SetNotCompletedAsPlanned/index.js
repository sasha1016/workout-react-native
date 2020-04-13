import React,{useState} from 'react'  ;

import {Appbar,Title,Button,Snackbar} from 'react-native-paper' ; 

import {globals,colorCodes,colors,text} from '../../../../Styles/globals' ; 
import Form from './form' ; 

import {Modal,View,Alert} from 'react-native' ; 


export default function SetNotCompletedAsPlanned({state,reducers}) {
    var [visible,toggler] = useState(true) ;
    var [snackbar,toggleSnackbar] = useState(false) ;  

    return (
        <View>
            <Modal visible={visible} animationType="slide">
                <Appbar style={[{top:0,position:"absolute",left:0,flex:1,width:"100%",height:60},colors.bgPrimary]}>
                    <Appbar.Action icon="arrow-left" onPress={() => {( state.totalSetBreakdown < 1 ? toggler(!visible) : toggleSnackbar(!snackbar))}}/>
                    <Title style={[text.bold,globals.h4,colors.colorSecondary]}>Set Breakdown</Title>
                </Appbar>
                <Form state={state} reducers={reducers} snackbar={snackbar} snackbarToggler={toggleSnackbar}/> 
            </Modal>
            <Button 
                mode="outlined"
                icon="eye-outline"
                style={[globals.paddingTop]}
                color={colorCodes.primary}
                onPress={() => toggler(!visible)}
            >
                View Breakdown
            </Button>

        </View>
    )
}