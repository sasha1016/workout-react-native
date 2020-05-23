import React,{useState} from 'react'  ;

import {Appbar,Title} from 'react-native-paper' ; 
import {Alert} from 'react-native' ; 

import {globals,colors,text} from '../../../../Styles/globals' ; 
import Form from './form' ; 

import {Modal,View} from 'react-native' ; 
import BlockButton from '../../../BlockButton';


export default function SetNotCompletedAsPlanned({state,reducers}) {
    var [visible,toggler] = useState(true) ;
    
    function _onClose() {
        state.totalSetBreakdown < 1 ? 
            toggler(!visible) 
        : 
            Alert.alert(
                    'Warning',
                    `You will not be able to submit your Set Review without completing the Set Breakdown.`, 
                    [
                        {text:"Complete Now",style:"cancel"},
                        {
                            text:"Complete Later",
                            onPress : () => toggler(!visible)
                        }
                    ]
                )     ;   
    }

    return (
        <View>
            <Modal visible={visible} animationType="slide">
                <Appbar style={[{top:0,position:"absolute",left:0,flex:1,width:"100%",height:60},colors.bgPrimary]}>
                    <Appbar.Action 
                        icon="arrow-left" 
                        onPress={() => _onClose()} 
                    />
                    <Title style={[text.bold,globals.h4,colors.colorSecondary]}>Set Breakdown</Title>
                </Appbar>
                <Form state={state} reducers={reducers}/> 
            </Modal>
        
            <BlockButton 
                title="View Breakdown"
                onPress={() => toggler(!visible)}
                top={20}
                bottom={10}
            />
        </View>
    )
}