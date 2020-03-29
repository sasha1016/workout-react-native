import React, {useEffect,useState,useRef} from 'react' ; 
import {View,FlatList,StyleSheet,Alert} from 'react-native' ; 
import { List } from 'react-native-paper' ; 


import { globals, colorCodes, colors,text} from '../Styles/globals.js'; 


export default function MuscleGroupInformation({navigation,route}) {

    const [sets] = useState(
        [
            {reps:5,weight:70},
            {reps:5,weight:70},
            {reps:5,weight:70},
            {reps:5,weight:70},
            {reps:5,weight:70},
        ]
    ) ; 

    useEffect(() => {
        let title = route.params.group ; 
        (navigation.setOptions({title:`${title.charAt(0).toUpperCase() + title.slice(1)}`})) ; 
    }) ; 

    function goToSet(current,total,set) {
        navigation.push('Set',{current,total,set}) ; 
    }

    
        
    return (
        <View style={globals.rootContainer}>
            <FlatList
                data={sets}
                renderItem={({item,index}) => { 
                    return ( <List.Item title={`1 x ${item.reps} @ ${item.weight} kg`}
                                        titleStyle={[text.lowercase,text.bold,globals.h3,colors.colorPrimary,{borderColor:colorCodes.primary}]}
                                        style={[globals.item,{borderColor:colorCodes.grey}]}
                                        onPress={() => goToSet(index,sets.length,item)}
                                        left={() => <List.Icon icon={`numeric-${index+1}`} color="#8A7090"/>} 
                            />
                        )

                }} 
                keyExtractor={({item,index}) => index}
            />
        </View>
    )
}