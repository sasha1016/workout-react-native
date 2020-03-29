import React from 'react' ;
import { createDrawerNavigator } from '@react-navigation/drawer' ; 
import { NavigationContainer } from '@react-navigation/native' ; 

import HomeStack from '../Stack/Home.js'

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
                            title:"Home"
                        }
                    }
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


export default RootDrawer ; 