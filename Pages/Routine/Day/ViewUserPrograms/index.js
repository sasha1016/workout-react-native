import React,{useEffect,useState} from 'react' ; 
import { FlatList} from 'react-native' ; 

import {V1,API, TEST} from '../../../../config/api' ; 

const axios = require('axios') ; 
import {capitalize} from '../../../../Utilities' ; 

import CustomListItem from '../../../../Components/ListItem2.js';


export default function ViewPrograms({navigation,route}) {

    const [programs,setPrograms] = useState([]) ;
    

    navigation.setOptions({
        title:`Add to ${capitalize(route.params.day)}'s routine`
    }) ; 

    useEffect(() => {
        axios.get(API.V1 + V1.USER.PROGRAMS.GET, {
            params:{
                user:TEST.USER,
                populate:"program"
            }
        }).then((response) => {
            var selectedPrograms = [] ; 
            route.params.dayRoutine.map(routine => selectedPrograms = [...selectedPrograms,routine.userProgram._id]) ;
            const filteredUserPrograms = response.data.filter((userProgram) => {return !selectedPrograms.includes(userProgram._id)}) ;
            setPrograms(filteredUserPrograms) ;  
        }).catch((error) => {
            console.warn(error,"failure") ; 
        })
    }, [navigation]) ; 

    

    return(
        <FlatList 
            data={programs} 
            renderItem={({item}) => 
                                    <CustomListItem 
                                        title={item.program.name} 
                                        desc={[item.program.liftName || item.program.muscleGroup]}
                                        onPress={() => navigation.navigate('ChooseProgramDayForRoutine',{program:item.program,userProgram:item._id})}
                                        mode="NAV" 
                                    />
                        }
            keyExtractor={(_,index) => `key-${index}`}
            contentContainerStyle={{padding:20,paddingTop:5}}
        />
    )

}



