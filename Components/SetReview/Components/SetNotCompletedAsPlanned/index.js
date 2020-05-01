import React,{useState} from 'react'  ;

import {Appbar,Title} from 'react-native-paper' ; 

import {Alert} from 'react-native' ; 

import NavButton from "../../../NavButton";

import {globals,colorCodes,colors,text} from '../../../../Styles/globals' ; 
import Form from './form' ; 

import {Modal,View} from 'react-native' ; 
import Divider from 'react-native-divider';


export default function SetNotCompletedAsPlanned({state,reducers}) {
    var [visible,toggler] = useState(true) ;
    var [snackbar,toggleSnackbar] = useState(false) ;  

    return (
        <View>
            <Modal visible={visible} animationType="slide">
                <Appbar style={[{top:0,position:"absolute",left:0,flex:1,width:"100%",height:60},colors.bgPrimary]}>
                    <Appbar.Action 
                        icon="arrow-left" 
                        onPress={() => 
                            ( 
                                state.totalSetBreakdown < 1 ? 
                                    toggler(!visible) 
                                : 
                                    Alert.alert(
                                            'Warning',
                                            `You will not be able to submit your Set Review without completing the Set Breakdown.`, 
                                            [
                                                {
                                                    text:"Complete Now",
                                                    style:"cancel"
                                                },
                                                {
                                                    text:"Complete Later",
                                                    onPress : () => toggler(!visible)
                                                }
                                            ]
                                        ) 
                            ) 
                        } 
                    />
                    <Title style={[text.bold,globals.h4,colors.colorSecondary]}>Set Breakdown</Title>
                </Appbar>
                <Form state={state} reducers={reducers} snackbar={snackbar} snackbarToggler={toggleSnackbar}/> 
            </Modal>

            <Divider></Divider>
            
            <NavButton 
                containerStyle={[globals.flex,globals.flexRow,{justifyContent:'flex-end'}]}
                transparent
                title="Set Breakdown "
                icon="chevron-right"
                right={true}
                buttonTextStyle={[colors.colorNeutral]}
                iconStyle={[colors.colorNeutral]}
                onPress={() => toggler(!visible)}
                iconStyle={{marginLeft:0}}
            />
        </View>
    )
}