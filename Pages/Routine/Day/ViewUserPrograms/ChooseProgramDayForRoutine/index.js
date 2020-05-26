import React,{useEffect,useState} from 'react' ; 
import { FlatList,View } from 'react-native' ; 
import CustomListItem from '../../../../../Components/ListItem2' ; 


export default function ViewPrograms({navigation,route}) {

    useEffect(() => {

        navigation.setOptions({ 
           title:`Choose the day`
        }) ;  
    }, [navigation]) ; 


    const onProgramAdded = (day,programID,userProgramID) => {
        navigation.navigate(
            "Day",
            {
                intentToAdd:true,
                toAdd:{
                    program:programID,
                    userProgram:userProgramID,
                },
                daySelectedOfTheProgram:day
            }
        ) ; 
    }

    let userProgram = route.params.userProgram ;
    let program = route.params.program ;
    
    var daysSkipped = 0 ;  
    

    return(
        <FlatList 
           data={route.params.program.preferredDays} 
            renderItem={({item,index}) => {
                    let dayHasBeenSelected = userProgram.daysSelectedOfTheProgram.filter(selected => {return selected.programDaySelected === item}).length ; 
                    if(!dayHasBeenSelected) {
                        return(
                            <CustomListItem 
                                title={item}
                                mode="NAV" 
                                icon={index - daysSkipped === 0 ? "plus" : null }
                                onIconPress={() => index - daysSkipped === 0? onProgramAdded(item,program._id,userProgram._id) : console.warn(index - daysSkipped) }
                            />     
                        )
                    } else {
                        daysSkipped += 1 ; 
                        return null ; 
                    }
            }}
            keyExtractor={(_,index) => `key-${index}`}
            contentContainerStyle={{padding:20,paddingTop:5}}
        /> 
    )

}



