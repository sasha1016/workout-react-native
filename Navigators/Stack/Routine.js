import React from 'react' ;
import { createStackNavigator } from '@react-navigation/stack' ; 

import {IconButton} from 'react-native-paper' ;

import {colorCodes} from '../../Styles/globals.js'; 
import {HEADER_TITLE_STYLE,HEADER_STYLE} from '../../Styles/header';

import Routine from '../../Pages/Routine/' ; 


import Day from '../../Pages/Routine/Day/index' ; 
import ViewUserPrograms from '../../Pages/Routine/Day/ViewUserPrograms/index' ;
import ChooseProgramDayForRoutine from '../../Pages/Routine/Day/ViewUserPrograms/ChooseProgramDayForRoutine/index' ;

import Program from '../../Pages/Routine/Program/' ; 


import {RoutineProvider} from '../../Pages/Routine/Contexts/index.js' ; 



const Stack = createStackNavigator();

function RoutineStack({navigation}) {
    return (
        <RoutineProvider>
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

                        {
                            /* All Screens only accessed uner day are put here */
                        }

                        <Stack.Screen
                            name="ViewUserPrograms"
                            component={ViewUserPrograms}
                            options={{
                                headerLeft:(() => <IconButton icon="close" color={colorCodes.secondary} onPress={() => navigation.navigate('Day')}/>)
                            }}
                        />

                            <Stack.Screen
                                name="ChooseProgramDayForRoutine"
                                component={ChooseProgramDayForRoutine}
                            />



                    <Stack.Screen
                        name="Program"
                        component={Program}
                    />




                    
            </Stack.Navigator>
        </RoutineProvider>
    )
}

export default RoutineStack ; 
