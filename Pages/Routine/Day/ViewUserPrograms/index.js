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
                userId:TEST.USER
            }
        }).then((response) => {
            var selectedPrograms = [] ; 
            route.params.dayRoutine.map(program => selectedPrograms = [...selectedPrograms,program.userProgramId]) ;
            const filteredUserPrograms = response.data.filter((program) => {return !selectedPrograms.includes(program._id)}) ;

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
                                        title={item.programName} 
                                        desc={[item.liftName || item.muscleGroup]}
                                        onPress={() => navigation.navigate('ChooseProgramDayForRoutine',{programId:item.programId,userProgramId:item._id})}
                                        mode="NAV" 
                                    />
                        }
            keyExtractor={(_,index) => `key-${index}`}
            contentContainerStyle={{padding:20,paddingTop:5}}
        />
    )

}



