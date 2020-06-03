import React,{useState} from 'react' ; 
import { FlatList} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 

import ListItem from '../../../Components/ListItem2.js';
import Program from '../../../Classes/Program';


export default function ViewPrograms({navigation,route}) {

    var [programs,setPrograms] = useState([]);

    React.useLayoutEffect(() => {
        if(route.params.title) {
            navigation.setOptions({
                title:`${route.params.title}`
            }) ; 
        }

        let filterBy = route.params.filterBy ; 
        let filterByValue = route.params.filterByValue ; 
        let exclude = route.params.exclude ; 

        if(filterBy) {
            Program.getFiltered(filterBy,filterByValue,exclude)
            .then((programs) => {
                setPrograms(programs) ; 
            })
            .catch((error) => {
                console.warn(error) ; 
            })
        } else {
            Program.getAll()
            .then((programs) => {
                setPrograms(programs) ; 
            })
            .catch((error) => {
                console.warn(error) ; 
            })
        }



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


