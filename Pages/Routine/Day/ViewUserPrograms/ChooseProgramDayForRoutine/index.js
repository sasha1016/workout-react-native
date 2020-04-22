import React,{useEffect,useState} from 'react' ; 
import { FlatList} from 'react-native' ; 

import { V1,API } from '../../../../../config/api' ; 

import { colors } from '../../../../../Styles/globals' ; 

const axios = require('axios') ; 

import Day from '../../../../../Pages/Programs/ProgramInformation/Components/Day.js'

export default function ViewPrograms({navigation,route}) {

    const [program,setProgram] = useState([]) ;



    useEffect(() => {
        axios.get(API.V1 + V1.PROGRAMS.GET, {
            params:{
                filterBy:"_id",
                value:route.params.programId,
                toReturn:"days name"
            }
        }).then((response) => {
            setProgram(response.data) ; 
        }).catch((error) => {
            console.warn(error.response.data.message,"failure") ; 
        })

        navigation.setOptions({ 
            title:`Choose the day`
        }) ; 
    }, [navigation]) ; 


    
    const onAdd = (toComplete,programName,userProgramId) => {
        navigation.navigate(
            "Day",
            {
                intentToAdd:true,
                toAdd:{
                    programName,
                    userProgramId,
                    toComplete
                }
            }
        ) ; 
    }


    

    return(
        <FlatList 
            data={program.days} 
            renderItem={({item}) => 
                    <Day 
                        day={item} 
                        headerButton={true} 
                        headerButtonTextStyle={[colors.colorSuccess]} 
                        headerButtonText="Add " 
                        headerButtonType="TEXT"
                        onHeaderButtonPress={() => onAdd(item.toComplete,program.name,route.params.userProgramId)}
                    /> 
            }
            keyExtractor={(_,index) => `key-${index}`}
            contentContainerStyle={{padding:20,paddingTop:5}}
        />
    )

}



