import React from 'react' ; 
import {Text,View,StyleSheet} from 'react-native' ; 
import {Button,Icon} from 'native-base' ;

import {text,colorCodes,globals,colors} from '../Styles/globals.js' ; 

const initialProps = {
    containerStyle:{},
    title:"Go",
    onPress:() => {},
    iconStyle:{}, 
    buttonTextStyle:{},
    right:true
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
                transparent={props.transparent}
                style={[styles.button,props.buttonStyle]}
                onPress={props.onPress}
            >
                {                    
                    props.icon && !props.right ?
                        <Icon 
                            name={props.icon} 
                            type="Feather" 
                            style={[globals.h4,text.bold,colors.colorPrimaryLighter,styles.buttonIcon,props.iconStyle]}
                        />
                    : 
                        null
                }
                <Text style={[globals.h6, text.bold, text.uppercase, colors.colorPrimary,styles.buttonText,props.buttonTextStyle]}>{props.title}  </Text>
                {                    
                    props.icon && props.right ?
                        <Icon 
                            name={props.icon} 
                            type="Feather" 
                            style={[globals.h4,text.bold,colors.colorPrimaryLighter,styles.buttonIcon,props.iconStyle]}
                        />
                    : 
                        null
                }
            </Button>
        </View>
    )
}