import React, {useContext,useState} from 'react' ; 
import { View, Text, ScrollView} from 'react-native' ; 

import  {globals,text,colors,colorCodes} from '../../../Styles/globals.js';

import CustomListItem from '../../../Components/ListItem2' ; 

import {WorkoutContext} from '../Contexts/index' ; 
import Stopwatch from '../../../Components/Stopwatch.js' ; 
import ActionsBar from './Components/ActionsBar' ; 

import Divider from 'react-native-divider' ; 


export default function Set({navigation,route}) {


    //const workout = useContext(WorkoutContext) ; 

    React.useEffect(() => {
        navigation.setOptions({
            title:`Set ${route.params.setNo} of ${route.params.totalSets}`
        })
    })



    return (
        <React.Fragment>
            <ScrollView style={[globals.flex]}>
                <View style={[globals.listContainer]}>
                    <CustomListItem
                        title="Reps"
                        desc={[route.params.set.reps.toString()]}
                        mode="INFO"
                    />
                    <CustomListItem
                        title="Weight"
                        desc={[(route.params.set.percentage || route.params.set.weightFactor).toString()]}
                        mode="INFO"
                    />
                </View>
                <Divider borderColor={colorCodes.grey} orientation="center">
                    <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>Set Timer</Text>   
                </Divider>
                <View style={{paddingTop:10,paddingBottom:10}}>
                    <Stopwatch title="set"/>
                </View>
                <Divider style={{marginTop:20,marginBottom:20}} borderColor={colorCodes.grey} orientation="center">
                    <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>Set Review</Text>   
                </Divider>
            </ScrollView>
            <ActionsBar/>
        </React.Fragment>
    ) ; 
 

}
