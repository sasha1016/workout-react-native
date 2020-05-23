import React,{useEffect,useState} from 'react' ; 
import { FlatList,View } from 'react-native' ; 

import { colors } from '../../../../../Styles/globals' ; 

import Day from '../../../../../Pages/Programs/ProgramInformation/Components/Day.js' ; 

export default function ViewPrograms({navigation,route}) {

    useEffect(() => {

        navigation.setOptions({ 
           title:`Choose the day`
        }) ;  
    }, [navigation]) ; 


    const onProgramAdded = (day,programID,userProgramID,toComplete) => {
        navigation.navigate(
            "Day",
            {
                intentToAdd:true,
                toAdd:{
                    program:programID,
                    userProgram:userProgramID,
                    toComplete
                },
                daySelectedOfTheProgram:day.name
            }
        ) ; 
        //console.warn(toComplete) ; 
    }

    let userProgram = route.params.userProgram ;
    let program = route.params.program ;

    return(
        <FlatList 
           data={route.params.program.days} 
            renderItem={({item}) => {
                    let dayHasBeenSelected = userProgram.daysSelectedOfTheProgram.filter(selected => {return selected.programDaySelected === item.name}).length
                    let toCompleteOfTheDay = program.days.filter((day) => {return day.name== item.name})[0].toComplete ; 
                    return (
                        !dayHasBeenSelected ? 
                            <Day 
                                day={item} 
                                headerButton={true} 
                                headerButtonTextStyle={[colors.colorSuccess]} 
                                headerButtonText="Add " 
                                headerButtonType="TEXT"
                                onHeaderButtonPress={() => onProgramAdded(item,program._id,userProgram._id,toCompleteOfTheDay) }
                            />
                        :
                            null
                    )
            }}
            keyExtractor={(_,index) => `key-${index}`}
            contentContainerStyle={{padding:20,paddingTop:5}}
        /> 
    )

}



