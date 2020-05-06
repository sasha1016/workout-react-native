import React,{useEffect,useState} from 'react' ; 
import { FlatList} from 'react-native' ; 

import { colors } from '../../../../../Styles/globals' ; 

import Day from '../../../../../Pages/Programs/ProgramInformation/Components/Day.js' ; 

import OneRepMaxBottomSheet from "./Components/BottomSheet";

export default function ViewPrograms({navigation,route}) {

    const [toAdd,setToAdd] = useState({}) ;

    var bottomSheetRef = React.createRef() ; 

    const [selectedDay,setSelectedDay] = useState({toComplete:[]}) ; 

    

    const onProgramAdded = (day,program,userProgram) => {
        setToAdd({program,userProgram}) ; 
        setSelectedDay(day) ;
        bottomSheetRef.current.open() ; 
    }

    useEffect(() => {

        navigation.setOptions({ 
           title:`Choose the day`
        }) ;  
    }, [navigation]) ; 


    
    const onAdd = (toComplete,program,userProgram) => {
        // navigation.navigate(
        //     "Day",
        //     {
        //         intentToAdd:true,
        //         toAdd:{
        //             program,
        //             userProgram,
        //             toComplete
        //         }
        //     }
        // ) ; 
    }

    const addProgram = (program) => {

        navigation.navigate(
            "Day",
            {
                intentToAdd:true,
                toAdd:{
                    ...toAdd,
                    toComplete:program.toComplete
                }
            }
        ) ; 
    }

    return(
        <FlatList 
            data={route.params.program.days} 
            renderItem={({item}) => 
                    <Day 
                        day={item} 
                        headerButton={true} 
                        headerButtonTextStyle={[colors.colorSuccess]} 
                        headerButtonText="Add " 
                        headerButtonType="TEXT"
                        onHeaderButtonPress={() => onProgramAdded(item,route.params.program._id,route.params.userProgram) /*onAdd(item.toComplete,route.params.program._id,route.params.userProgram)*/ }
                    /> 
            }
            ListFooterComponent={<OneRepMaxBottomSheet bottomSheetRef={bottomSheetRef} selectedDay={selectedDay} onSubmit={addProgram}/>}
            keyExtractor={(_,index) => `key-${index}`}
            contentContainerStyle={{padding:20,paddingTop:5}}
        />
    )

}



