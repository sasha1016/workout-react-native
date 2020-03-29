import React from 'react' ; 
import { StyleSheet, Text, View } from 'react-native' ; 
import {IconButton} from 'react-native-paper' ; 

export default function Header({title}) {


    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <IconButton icon="menu" size={25} style={[styles.icon,{opacity:0}]}></IconButton>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:0,
        paddingRight:0,
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    headerText:{
        fontWeight:"700",
        fontSize:25,
    },
    icon:{
    }
})