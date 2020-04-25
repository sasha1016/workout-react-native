import React from 'react' ;
import { createDrawerNavigator } from '@react-navigation/drawer' ; 
import { NavigationContainer } from '@react-navigation/native' ; 

import HomeStack from '../Stack/HomeNew.js'; 
import RoutineStack from '../Stack/Routine.js'
import ProgramsStack from '../Stack/Programs.js'

const Drawer = createDrawerNavigator() ; 

function RootDrawer() {
    return(
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="Home"
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeStack}
                    options={
                        {
                            title:"Home",
                            drawerLabel:"Home"
                        }
                    }
                />
                <Drawer.Screen
                    name="Routine"
                    component={RoutineStack}
                    options={
                        {
                            title:"Routine",
                            drawerLabel:"Routine"
                        }
                    }
                />
                <Drawer.Screen
                    name="Programs"
                    component={ProgramsStack}
                    options={
                        {
                            title:"Programs",
                            drawerLabel:"Programs"
                        }
                    }
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


export default RootDrawer ; 