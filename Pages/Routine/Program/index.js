import React,{useEffect,Fragment} from 'react' ; 
import { View } from 'react-native' ; 

import CustomListItem from '../../../Components/ListItem2' ; 
import ListHeader from '../../../Components/ListItem/Header.js' ;

import {capitalize} from '../../../Utilities' ; 

import {List} from 'native-base';

export default function Day({navigation,route}) {

    useEffect(() => {
        navigation.setOptions({
            title:capitalize(route.params.routine.program.name)
        })
    },[navigation])

    return (
        <List itemDivider={false} style={{padding:20,paddingTop:10}} >
        {
            route.params.routine.toComplete.map((exercise) => {
                
                return (
                    <Fragment>
                        <ListHeader title={`${exercise.name}      `} icon={false}/>
                        {
                            exercise.sets.map((set,index) => {
                                let weight = ( exercise.oneRM ? `${exercise.oneRM * Math.floor(parseInt(set.weightFactor || set.percentage)/100)} kg`: `${set.weightFactor || set.percentage}% Intensity`) ; 
                                return <CustomListItem 
                                    title={`Set ${index + 1}`}
                                    desc={[`${set.reps} Reps at ${ weight }`]}
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
