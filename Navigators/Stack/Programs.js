import React from 'react' ;
import { createStackNavigator } from '@react-navigation/stack' ; 

import {IconButton} from 'react-native-paper' ;

import {colorCodes} from '../../Styles/globals.js'; 
import {HEADER_TITLE_STYLE,HEADER_STYLE} from '../../Styles/header';

import Programs from '../../Pages/Programs/' ; 
import AddProgram from '../../Pages/Programs/AddProgram';
import ViewPrograms from '../../Pages/Programs/ViewPrograms';
import ProgramInformation from '../../Pages/Programs/ProgramInformation/index.js';
import UserProgramInformation from '../../Pages/Programs/UserProgramInformation/index.js';



const Stack = createStackNavigator();

function ProgramsStack({navigation}) {
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
                name="AddProgram"
                component={AddProgram}
                options={{
                    title:"Add A Program",
    
                }}
            />

            <Stack.Screen
                name="UserProgramInformation"
                component={UserProgramInformation}
            />

            <Stack.Screen
                name="ViewPrograms"
                component={ViewPrograms}
                options={{
                    title:"Choose A Program",
                }}
            />

            <Stack.Screen
                name="ProgramInformation"
                component={ProgramInformation}
            />
                
        </Stack.Navigator>
    )
}

export default ProgramsStack ; 
