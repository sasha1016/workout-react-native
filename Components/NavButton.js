import React from 'react' ; 
import {Text,View,StyleSheet} from 'react-native' ; 
import {Button,Icon} from 'native-base' ;

import {text,colorCodes,globals,colors} from '../Styles/globals.js' ; 

const initialProps = {
    containerStyle:{},
    title:"Go",
    onPress:() => {},
    iconStyle:{}, 
    buttonTextStyle:{}
}

export default function NavButton(props = initialProps) {

    const styles = StyleSheet.create({
        container:{justifyContent:'flex-end'}, 
        button:{
            alignSelf:"flex-end",
            paddingLeft:10,
            marginRight:0,
            paddingRight:2,
            borderColor:colorCodes.primary,
            borderRadius:5
        },
        buttonText:{
            paddingRight:(!props.icon ? 0:5)
        }, 
        buttonIcon:{right:0,marginRight:0,paddingLeft:0,paddingRight:1}
    })

    return (
        <View style={[styles.container,globals.flex,props.containerStyle]} >
            <Button 
                small 
                iconRight
                transparent={props.transparent}
                style={[styles.button,props.buttonStyle]}
                onPress={props.onPress}
            >
                <Text style={[globals.h6, text.bold, text.uppercase, colors.colorPrimary,styles.buttonText,props.buttonTextStyle]}>{props.title}  </Text>
                {                    
                    props.icon ?
                        <Icon 
                            name={props.icon} 
                            type="Feather" 
                            style={[props.iconStyle,globals.h4,text.bold,colors.colorPrimaryLighter,styles.buttonIcon]}
                        />
                    : 
                        null
                }
            </Button>
        </View>
    )
}