import React, {useContext,useState} from 'react' ; 
import { View} from 'react-native' ; 

import  {globals} from '../../../Styles/globals.js';
import  CustomListItem from '../../../Components/ListItem2';

import {WorkoutContext} from '../Contexts/index' ; 


export default function Exercise({navigation,route}) {


    //const workout = useContext(WorkoutContext) ; 

    React.useEffect(() => {
        navigation.setOptions({
            title:route.params.exerciseName
        })
    })

    const goToSet = (set,setNo,totalSets) => {
        navigation.navigate('Set',{set,setNo,totalSets}) ; 
    }



    return (
        <View style={[globals.flex,globals.listContainer]}>

                {
                        route.params.sets.map((set,index) => {
                            return (
                                <CustomListItem
                                    title={`Set ${index + 1}`} 
                                    desc={[`${set.reps} Reps @ ${set.percentage || set.weightFactor}%`]}
                                    mode="NAV"
                                    onPress={() => goToSet(set,index + 1, route.params.totalSets)}
                                />
                            )
                        })
                }

        </View>
    ) ; 
 

}
