import React from 'react' ; 
import { Text,StyleSheet} from 'react-native' ; 

import {globals,colors,text,colorCodes} from '../../Styles/globals' ; 

import {ListItem,Right,Icon} from 'native-base' ; 


export default function ListHeader({
                                title = "",
                                icon = false,
                                iconValue = "plus",
                                onIconPress = () => {}
                            }) {

    const styles = StyleSheet.create({
        container:{
            borderBottomWidth:1,
            paddingBottom:10,
            paddingLeft:0,
            paddingTop:10,
            borderBottomColor:colorCodes.grey,
            justifyContent:'space-between',
            paddingRight:5,
        },
        title:{
            
        },
        icon:{
            paddingRight:0,
            marginRight:0
        }
    }) ; 

    return (
        <ListItem itemHeader style={[styles.container]}>
            <Text style={[globals.h5,text.bold,text.uppercase,colors.colorNeutral]}>{title}</Text>
            <Right>
                {
                    icon === true ?
                        <Icon name={iconValue} type="Feather" style={[styles.icon,globals.h4,colors.colorPrimaryLighter]} onPress={onIconPress}/>
                    :   <Icon name={iconValue} type="Feather" style={[styles.icon,globals.h4,colors.colorPrimaryLighter,{opacity:0}]} onPress={onIconPress}/>
                }
            </Right>
        </ListItem>

    ) ; 
}