import React,{useEffect,useState} from 'react' ; 
import { FlatList} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 

const axios = require('axios') ; 

import {API,V1} from '../../../config/api' ; 
import ListItem from '../../../Components/ListItem2.js';


export default function ViewPrograms({navigation,route}) {

    var [programs,setPrograms] = useState([]);

    useEffect(() => {

        axios.get(API.V1 + V1.PROGRAMS.GET, {
            params:{
                filterBy:(route.params.filterBy),
                value:(route.params.filterByValue)  
            }
        }).then((response) => {
            setPrograms(response.data) ; 
        }).catch((error) => {
            console.warn(error.message) ; 
        }) ; 

    },[]) ; 

    useEffect(() => {
        
        if(route.params.title) {
            navigation.setOptions({
                title:`${route.params.title}`
            }) ; 
        }

    }, [route])


    return(
        <FlatList 
            data={programs} 
            renderItem={(item) => 
                                    (
                                        item.item._id !== route.params.programCurrentlySubscribedTo ? 
                                            <ListItem 
                                                title={item.item.name} 
                                                desc={[item.item.liftName || item.item.muscleGroup]} 
                                                mode="NAV" 
                                                onPress={() => 
                                                            navigation.push(
                                                                'ProgramInformation',
                                                                {
                                                                    program:item.item,
                                                                    programSwitch:(route.params.programSwitch || false),
                                                                    userProgramToSwitch:(route.params.userProgramToSwitch || false)
                                                                }
                                                            )
                                                        }
                                            />
                                        : 
                                            null
                                    )
                        }
            keyExtractor={(_,index) => `key-${index}`}
            contentContainerStyle={globals.listContainer}
        />
    )

}


