import React from 'react' ; 
import { View,StyleSheet} from 'react-native' ; 

import {Button} from 'react-native-paper' ; 

import  {colors,colorCodes} from '../Styles/globals.js';

export default function Home({navigation}) {

    const startWorkout = () => {
        navigation.push('StartWorkout')  ; 
    }


    return (
        <View style={{flex:1}}>
            <View style={[styles.halfContainer]}>
                <Button mode="outlined" style={[styles.button,colors.colorSecondary,colors.bgPrimary]} icon="check" color={colorCodes.secondary} onPress={startWorkout}>
                    Start Workout
                </Button>
                <Button mode="outlined" style={[styles.button,{borderColor:colorCodes.danger},{marginTop:20}]} icon="close" color={colorCodes.danger} onPress={startWorkout}>
                    Skip Workout
                </Button>
            </View>
        </View>
    ) ; 
 

}

const styles = StyleSheet.create({
    halfContainer:{
        flex:1,
        height:'100%',
        backgroundColor:"white",
        flexDirection:'column',
        justifyContent:'center',
        textAlign:'center'
    },
    text:{
        textAlign:'center',
    },
    button:{
        alignSelf:"center",
        width:200
    }
})