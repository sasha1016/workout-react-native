import React,{useEffect,Fragment} from 'react' ; 
import { View } from 'react-native' ; 

import CustomListItem from '../../../Components/ListItem2' ; 
import ListHeader from '../../../Components/ListItem/Header.js' ;
import RenderProgramSchedule from '../../Programs/Components/RenderUserProgramSchedule' ; 

import {capitalize} from '../../../Utilities' ; 


export default function Day({navigation,route}) {

    var element = route.params.routine ; 

    useEffect(() => {
        navigation.setOptions({
            title:capitalize(route.params.routine.program.name)
        })
    },[navigation])

    console.warn(element.userProgram.oneRepMaxes) ; 

    return (
        <View style={{padding:20,paddingTop:10}}>
            <RenderProgramSchedule
                userProgram={element.userProgram} 
                duration={element.program.duration} 
                preferredDays={element.program.preferredDays}
                oneRepMaxes={element.userProgram.oneRepMaxes}
                days={element.program.days}
            />
        </View>
    ) ; 
 

}
