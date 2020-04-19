import React from 'react' ;
import { createStackNavigator } from '@react-navigation/stack' ; 

import {IconButton} from 'react-native-paper' ;

import {colorCodes} from '../../Styles/globals.js'; 
import {HEADER_TITLE_STYLE,HEADER_STYLE} from '../../Styles/header';

import Routine from '../../Pages/Routine/' ; 
import Day from '../../Pages/Routine/Day/index' ; 
import Program from '../../Pages/Routine/Program/' ; 



const Stack = createStackNavigator();

function RoutineStack({navigation}) {
    return (
        <Stack.Navigator
            initialRouteName="Routine"
            screenOptions={{
                headerStyle:HEADER_STYLE,
                headerTitleStyle:HEADER_TITLE_STYLE,
                headerTintColor:colorCodes.secondary
            }}
        >
            <Stack.Screen
                name="Routine"
                component={Routine}
                options={{
                    title:"Routine",
                    headerLeft:(() => <IconButton icon="menu" color={colorCodes.secondary} onPress={() => navigation.openDrawer()}/>)
                }}
            />

            <Stack.Screen
                name="Day"
                component={Day}
            />

            <Stack.Screen
                name="Program"
                component={Program}
            />
                
        </Stack.Navigator>
    )
}

export default RoutineStack ; 
