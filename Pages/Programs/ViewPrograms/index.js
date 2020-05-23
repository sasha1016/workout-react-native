import React,{useEffect,useState} from 'react' ; 
import { FlatList} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 

const axios = require('axios') ; 

import {API,V1} from '../../../config/api' ; 
import ListItem from '../../../Components/ListItem2.js';

function _getPrograms(routeParams,callback) {
    let params = {
        filterBy:(routeParams.filterBy),
        value:(routeParams.filterByValue)  
    }

    routeParams.exclude ? params.exclude = routeParams.exclude : null

    console.warn(params) ; 

    axios.get(API.V1 + V1.PROGRAMS.GET, {
        params
    }).then((response) => {
        callback(response.data) ; 
    }).catch((error) => {
        console.warn(error.message) ; 
    }) ; 
}

export default function ViewPrograms({navigation,route}) {

    var [programs,setPrograms] = useState([]);

    React.useLayoutEffect(() => {
        if(route.params.title) {
            navigation.setOptions({
                title:`${route.params.title}`
            }) ; 
        }

        _getPrograms(route.params,setPrograms) ; 

    },[]) ; 

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


