import React from 'react' ; 
import {StyleSheet} from 'react-native'  ; 

import {globals, text,colors,colorCodes} from '../../../../Styles/globals' ; 

import {FooterTab,Button,Icon} from 'native-base' ; 


export default function ActionsBar(props) {

    const iconStyle = [globals.h3,text.bold]

    return (
        <FooterTab style={footer.container}>
            <Button>
                <Icon 
                    name="plus" 
                    type="Feather"
                    style={[...iconStyle,colors.colorNeutral]} 
                />
            </Button>
            <Button onPress={props.onDeleteIntent}>
                <Icon 
                    name="trash-2" 
                    type="Feather"
                    style={[...iconStyle,(!props.deleteIntent ? colors.colorNeutral : colors.colorPrimary)]} 
                />
            </Button>
            <Button>
                <Icon 
                    name="shuffle" 
                    type="Feather"
                    style={[...iconStyle,colors.colorNeutral]} 
                />
            </Button>
        </FooterTab>
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
})
