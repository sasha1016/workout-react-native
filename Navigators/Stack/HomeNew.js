import React from 'react' ;
import { createStackNavigator } from '@react-navigation/stack' ; 

import {IconButton} from 'react-native-paper' ;

import {colorCodes} from '../../Styles/globals.js'; 
import {HEADER_TITLE_STYLE,HEADER_STYLE} from '../../Styles/header';

import Home from '../../Pages/Home/index.js' ; 
import Exercise from '../../Pages/Home/Exercise/index.js' ; 
import Set from '../../Pages/Home/Set/index.js' ; 

import { WorkoutContextProvider } from "../../Pages/Home/Contexts/index";
import { ExerciseContextProvider } from "../../Pages/Home/Contexts/exercise";

import moment from 'moment' ; 

const Stack = createStackNavigator();

function HomeStack({navigation}) {
    return (
            <WorkoutContextProvider>
                <ExerciseContextProvider>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            headerStyle:HEADER_STYLE,
                            headerTitleStyle:HEADER_TITLE_STYLE,
                            headerTintColor:colorCodes.secondary
                        }}
                    >
                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{
                                    title:moment().format("dddd, DD/MM"),
                                    headerLeft:(() => <IconButton icon="menu" color={colorCodes.secondary} onPress={() => navigation.openDrawer()}/>)
                                }}
                            />

                            <Stack.Screen
                                name="Exercise"
                                component={Exercise}
                            />

                            <Stack.Screen
                                name="Set"
                                component={Set}
                            />
                            
                    </Stack.Navigator>
                </ExerciseContextProvider>
            </WorkoutContextProvider>
    )
}


export default HomeStack ; 
 
