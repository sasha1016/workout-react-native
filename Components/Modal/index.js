import React from 'react'  ;

import {
    globals,
    colorCodes,
    colors,
    text
} from '../../Styles/globals' ; 

import {
    HEADER_TITLE_STYLE
} from '../../Styles/header' ; 

import {
    View,
    Modal,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native' ; 

import {
    Title,
    Appbar
} from 'react-native-paper' ; 

import {
    FooterTab,
    Button
} from 'native-base'



export default function CustomModal(props) {

    return (
        <Modal visible={props.visible} style={{position:'relative'}} animationType="slide">
            <Appbar style={[{top:0,left:0,height:65,width:"100%",position:"absolute"},colors.bgPrimary]}>
                <Appbar.Action icon="close" color={colorCodes.secondary} onPress={() => {props.onClose() ;props.toggler(!props.visible); }}/>
                <Title style={[HEADER_TITLE_STYLE,{textTransform:'capitalize'}]}>{props.title}</Title>
            </Appbar>
            <ScrollView>
                <View style={[{top:65,padding:20,paddingBottom:(props.buttons.length !== 0 ? 75 + 55 : 65)}]}>
                    {props.children}
                </View>
            </ScrollView>
            <FooterTab style={footer.container}>
                {
                    props.buttons.map((button,index) => {
                        return <Button 
                            transparent
                            onPress={() => button.onPress()}
                            key={index}
                        >
                            <Text style={[globals.h6,text.uppercase,colors.colorPrimaryLighter,text.bold]}>
                                {`${button.text} `}
                            </Text>
                        </Button>
                    })
                }
            </FooterTab>
        </Modal>
    )
}


const footer = StyleSheet.create({
    container:{
        position:"absolute",
        bottom:0,
        flex:1,
        left:0,
        right:0,
        width:"100%", 
        backgroundColor:colorCodes.grey,
    }
}) ; 
