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



export default function CustomModal({visible,title,buttons,children,toggler,onClose = () => {}, scrollable = true}) {

    return (
        <Modal visible={visible} style={{position:'relative'}} animationType="slide">
            <Appbar style={[{top:0,left:0,height:65,width:"100%",position:"absolute"},colors.bgPrimary]}>
                <Appbar.Action icon="close" color={colorCodes.secondary} onPress={() => {onClose() ;toggler(!visible); }}/>
                <Title style={[HEADER_TITLE_STYLE,{textTransform:'capitalize'}]}>{title}</Title>
            </Appbar>
            {
                scrollable ?
                    <ScrollView style={[{top:65}]}>
                        <View style={[{padding:20,paddingBottom:(buttons.length !== 0 ? 75 + 55 : 65)}]}>
                            {children}
                        </View>
                    </ScrollView>
                : 
                    <View style={[{top:65}]}>
                        <View style={[{padding:20,paddingTop:5,paddingBottom:(buttons.length !== 0 ? 75 + 55 : 65)}]}>
                            {children}
                        </View>
                    </View>
            }

            <FooterTab style={footer.container}>
                {
                    buttons.map((button,index) => {
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
