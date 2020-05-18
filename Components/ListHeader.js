import React from 'react' ;
import {StyleSheet,Text} from 'react-native' ; 
import {globals,colorCodes,colors,text} from '../Styles/globals' ; 
import {ListItem,Right,Icon} from 'native-base' ; 


export default function Header(props) {

    const styles = StyleSheet.create({
        listHeader:{
            borderBottomWidth:1,
            paddingBottom:10,
            paddingLeft:5,
            paddingTop:5,
            borderBottomColor:colorCodes.grey,
            justifyContent:'space-between',
            paddingRight:3,
        },
        icon:{
            paddingRight:0,
            marginRight:0
        }
    }) ; 

    return (
        <ListItem itemHeader style={[styles.listHeader]}>
            <Text style={[globals.h5,text.bold,text.uppercase,colors.colorNeutral]}>{`${props.title}  `}</Text>
            <Right>
                <Icon name={props.icon} type="Feather" style={[styles.icon,globals.h4,colors.colorNeutral]} onPress={props.onIconPress}/>
            </Right>
        </ListItem>
    )
}
