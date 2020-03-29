import React from 'react' ;
import { createStackNavigator } from '@react-navigation/stack' ; 
import { NavigationContainer } from '@react-navigation/native' ; 

import {colorCodes} from '../../Styles/globals.js'; 

import Home from '../../Pages/Home.js' ; 
import StartWorkout from '../../Pages/StartWorkout.js' ; 
import MuscleGroupInformation from '../../Pages/MuscleGroupInformation.js' ; 
import Set from '../../Pages/Set.js' ; 

import moment from 'moment' ; 

const headerStyle = {
    backgroundColor:colorCodes.primary,
    height:90,
    borderBottomWidth:0,
    elevation:0
} ;

const headerTitleStyle = {
    fontWeight:"bold",
    fontSize:16,
    color:colorCodes.secondary,
}

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle,
                headerTitleStyle
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title:moment().format("ddd, D/MM"),
                }}
            />
            <Stack.Screen
                name="StartWorkout"
                component={StartWorkout}
                options={{
                    title:"Today's Workout"
                }}
            />
            <Stack.Screen
                name="MuscleGroupInformation"
                component={MuscleGroupInformation}
            />
            <Stack.Screen
                name="Set"
                component={Set}
            />
                
        </Stack.Navigator>
    )
}

export default HomeStack ; 
