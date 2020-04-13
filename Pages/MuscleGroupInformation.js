import React, {useEffect,useState,useRef} from 'react' ; 
import {View,FlatList,StyleSheet,Alert} from 'react-native' ; 
import { List } from 'react-native-paper' ; 


import { globals, colorCodes, colors,text} from '../Styles/globals.js'; 


export default function MuscleGroupInformation({navigation,route}) {

    const [sets,updateSets] = useState(
        [
            {reps:5,weight:70,id:0,completed:false},
            {reps:5,weight:70,id:1,completed:false},
            {reps:5,weight:70,id:2,completed:false},
            {reps:5,weight:70,id:3,completed:false},
            {reps:5,weight:70,id:4,completed:false},
        ]
    ) ; 

    useEffect(() => {
        let title = route.params.group ; 
        (navigation.setOptions({title:`${title.charAt(0).toUpperCase() + title.slice(1)}`})) ; 
    }) ; 

    function onSetCompleted(setInformation) {
        updateSets(
            sets.filter((set) => {
                if (set.id === setInformation.id) {
                    set.completed = true; 
                }
                return true ; 
            })      
                  
        )
    }

    function goToSet(current,total,set) {
        navigation.push('Set',{current,total,set,onSetCompleted}) ; 
    }

    
        
    return (
        <View style={globals.rootContainer}>
            <FlatList
                data={sets}
                renderItem={({item,index}) => { 
                    return ( <List.Item title={`1 x ${item.reps} @ ${item.weight} kg`}
                                        titleStyle={
                                            [
                                                text.lowercase,
                                                text.bold,
                                                globals.h3,
                                                (item.completed ? colors.colorPrimaryLighter : colors.colorPrimary),
                                                {borderColor:colorCodes.primary}
                                            ]
                                        }
                                        style={[globals.item,{borderColor:colorCodes.grey}]}
                                        onPress={() => goToSet(index,sets.length,item)}
                                        left={() => <List.Icon icon={(!item.completed ? "checkbox-blank-outline" : "check-box-outline")} color={!item.completed ? colorCodes.primary : colorCodes.primaryLighter}/>} 
                            />
                        )

                }} 
                keyExtractor={({item,index}) => `item-${index}`}
            />
        </View>
    )
}