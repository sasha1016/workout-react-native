import React,{useEffect,useState} from 'react' ; 
import { View, ScrollView,Text,StyleSheet} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 

import {List} from 'native-base' ; 
import {IconButton} from 'react-native-paper';

import RenderUserPrograms  from './Components/RenderUserPrograms'

const axios = require('axios') ; 

import {
    TEST,
    API,
    V1
} from '../../config/api' ; 
import UserProgram from '../../Classes/UserProgram';
import { UserContext } from '../../Layout/Contexts';


export default function Programs({navigation}) {

    var [programs,setPrograms] = useState([]);
    const user = React.useContext(UserContext) ; 

    function viewUserProgram(userProgram) {
        navigation.push('UserProgramInformation',{userProgram}) ; 
    }

    function viewPrograms(filterBy,filterByValue,exclude) {
        navigation.push('ViewPrograms',{filterBy,filterByValue,exclude}) ;
    }

    function getPrograms() {
        let userProgram = new UserProgram(user.data.uid) ;
        userProgram.getAll()
        .then((programs) => {
            setPrograms(programs) ; 
        }) 
        .catch((error) => {
            console.warn(error.message) ; 
        })
    }


    function setHeaderButton() {
        navigation.setOptions({
            headerRight:() => <IconButton icon="plus" color={colorCodes.secondary} onPress={ () => navigation.push('AddProgram')}/>
        }) ;
    }

    React.useLayoutEffect(() => {
        getPrograms() ; 
        setHeaderButton() ; 
    },[])

    return (
        <View>
            <ScrollView>
                <View style={[{flex:1,marginTop:10},globals.rootContainer]}>
                    <List itemDivider={false}>
                        <RenderUserPrograms userPrograms={programs} viewUserProgramInformation={viewUserProgram} onStartNewProgramIntent={viewPrograms}/>
                    </List>
                </View>
            </ScrollView>
        </View>
    ) ; 
 

}
