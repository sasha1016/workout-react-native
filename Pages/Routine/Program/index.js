import React,{useEffect,Fragment} from 'react' ; 
import { View } from 'react-native' ; 

import CustomListItem from '../../../Components/ListItem2' ; 
import ListHeader from '../../../Components/ListItem/Header.js' ;

import {capitalize} from '../../../Utilities' ; 

import {List} from 'native-base';

export default function Day({navigation,route}) {

    useEffect(() => {
        navigation.setOptions({
            title:capitalize(route.params.program.programName)
        })
    },[])

    return (
        <List itemDivider={false} style={{padding:20,paddingTop:10}} >
        {
                route.params.program.toComplete.map((lift,index) => {
                        return (
                            <Fragment>
                                <ListHeader title={lift.name} icon={false}/>
                                {
                                    lift.sets.map((set,index) => {
                                        return <CustomListItem 
                                            title={`Set ${index + 1}`}
                                            desc={[`${set.reps} Reps at ${set.weightFactor}% Intensity`]}
                                        />
                                    })
                                }
                            </Fragment>
                        )
                }) 
            }
        </List>
    ) ; 
 

}
