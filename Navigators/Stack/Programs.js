import React from 'react' ;
import { createStackNavigator } from '@react-navigation/stack' ; 

import {IconButton} from 'react-native-paper' ;

import {colorCodes} from '../../Styles/globals.js'; 
import {HEADER_TITLE_STYLE,HEADER_STYLE} from '../../Styles/header';

import Programs from '../../Pages/Programs/' ; 
import Lift from '../../Pages/Programs/Lift' ; 



const Stack = createStackNavigator();

function RoutineStack({navigation}) {
    return (
        <Stack.Navigator
            initialRouteName="Programs"
            screenOptions={{
                headerStyle:HEADER_STYLE,
                headerTitleStyle:HEADER_TITLE_STYLE,
                headerTintColor:colorCodes.secondary
            }}
        >
            <Stack.Screen
                name="Programs"
                component={Programs}
                options={{
                    title:"Programs",
                    headerLeft:(() => <IconButton icon="menu" color={colorCodes.secondary} onPress={() => navigation.openDrawer()}/>)
                }}
            />

            <Stack.Screen
                name="Lift"
                component={Lift}
            />
                
        </Stack.Navigator>
    )
}

export default RoutineStack ; 
