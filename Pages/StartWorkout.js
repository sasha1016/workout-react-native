import React from 'react' ; 
import {View,FlatList,StyleSheet,Alert} from 'react-native' ; 
import { List } from 'react-native-paper' ; 

import { globals, colorCodes, colors,text} from '../Styles/globals.js'; 

export default function workOutForTheDay({navigation}) {
    const muscleGroups = [
        {name:"bench",id:0,type:"sbd"},
        {name:"squat",id:1,type:"sbd"},
        {name:"back",id:2,type:"accessory"},
        {name:"biceps",id:3,type:"accessory"}
    ] ; 

    function selectGroup(group) {
        navigation.push('MuscleGroupInformation',{
            group
        }) ; 
    }

    return (
        <View style={globals.rootContainer}>
            <FlatList
                data={muscleGroups}
                renderItem={({item}) => { 
                    return (item.type == "sbd" 
                    ?    (
                            <List.Item  title={item.name} 
                                        button
                                        left={() => <List.Icon icon={`alpha-${item.name.slice(0,1)}-circle-outline`} color={colorCodes.primary}/>} 
                                        titleStyle={[text.capitalize,text.bold,globals.h3,colors.colorPrimary]}
                                        onPress={() => selectGroup(item.name)}
                                        style={[globals.item,styles.sbd]}
                            />
                        )
                    :    (
                            <List.Item  title={item.name} 
                                        button
                                        left={() => <List.Icon icon="alpha-a-circle-outline" color="#8A7090"/>} 
                                        onPress={() => selectGroup(item.name)}
                                        titleStyle={[text.capitalize,text.bold,globals.h3,{color:"#8A7090"}]}
                                        style={[globals.item,styles.accessory]}
                            />
                        )
                    )

                }} 
                keyExtractor={item => `${item.id}`}
            />
        </View>
    )
}; 

const styles = StyleSheet.create({
    sbd:{
        borderColor:colorCodes.grey,

    },
    accessory:{
        borderColor:colorCodes.grey,
    }
})

