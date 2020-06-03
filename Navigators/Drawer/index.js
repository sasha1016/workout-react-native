import React from 'react' ;
import { 
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer' ; 
import { View,Text,StyleSheet,Image } from 'react-native'  ;
import { NavigationContainer } from '@react-navigation/native' ; 
import { globals,text,colorCodes,colors } from '../../Styles/globals' ; 
 
import HomeStack from '../Stack/HomeNew.js'; 
import RoutineStack from '../Stack/Routine.js'
import ProgramsStack from '../Stack/Programs.js'

import User from '../../Classes/User' ; 
import { UserContext } from '../../Layout/Contexts';

const Drawer = createDrawerNavigator() ; 

function UserProfile() {
    const styles = StyleSheet.create({
        profile:{
            width:'100%',
            padding:20,
            marginBottom:20,
            borderBottomWidth:1,
            borderBottomColor:colorCodes.grey
        },
        pictureContainer:{
            marginBottom:10,
            width:80,
            height:80,
            backgroundColor:colorCodes.primary,
            alignSelf:'center',
            borderRadius:100
        },
        picture:{
            height:40,
            width:40,
            alignSelf:'center',
            top:'50%',
            marginTop:-20,
            resizeMode:'cover'
        }
    }) ; 

    var [user,setUser] = React.useState({}) ; 
    var userContext = React.useContext(UserContext) ;
    
    React.useEffect(() => {
        setUser({...user,fname:userContext.data.firstName})
    },[userContext.data]) ; 

    return (
        <View style={[globals.flexColumn,styles.profile]}>
            <View style={[styles.pictureContainer]}>
                <Image source={{uri:"https://github.com/travis-ci.png"}} style={[styles.picture]} />
            </View>
            <Text style={[
                text.h5,
                text.bold,
                text.center,
                text.uppercase,
                colors.colorPrimary
            ]}>
                {user.fname}
            </Text>
        </View>
    )
}

function DrawerContent(props) {

    var user = React.useContext(UserContext) ;

    const _logOut = async () => {
        await User.logout() ; 
        user.set({uid:false})
    }

    return(
        <DrawerContentScrollView {...props} style={[globals.flex]}>
            <UserProfile/>
            {
                props.state.routes.map((route,index) => {
                    return (
                        <DrawerItem 
                            label={({focused}) => 
                                <Text style={[
                                    text.h5,
                                    text.bold,
                                    (!focused ? colors.colorNeutral : colors.colorPrimary),
                                    text.uppercase
                                ]}>
                                    {`${route.name}  `}
                                </Text>
                            }
                            focused={props.state.index === index}
                            onPress={() => props.navigation.navigate(route.name)}
                            activeBackgroundColor='transparent'
                            key={route.key}
                        />
                    )
                })
            }
            <DrawerItem 
                label={() => 
                    <Text style={[
                        text.h5,
                        text.bold,
                        colors.colorNeutral,
                        text.uppercase
                    ]}>Logout </Text>
                }
                style={{flex:1,justifyContent:'flex-end'}}
                onPress={() => _logOut()}
            />
        </DrawerContentScrollView>
    )

}

function RootDrawer() {
    return(
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="Home"
                drawerContent={props => <DrawerContent {...props}/>}
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeStack}
                    options={
                        {
                            title:"Home",
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
                        }
                    }
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


export default RootDrawer ; 