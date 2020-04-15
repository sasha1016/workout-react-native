import React from 'react' ; 
import {Text} from 'react-native' ; 
import {List,ListItem} from 'native-base' ;

import {globals,colorCodes,colors,text} from '../../../../Styles/globals' ; 

import CustomListItem from '../../../../Components/ListItem2.js';

export default function Day({day}) {
    const lifts = Object.keys(day.toComplete) ; 

    return (
        <List>
            <ListItem itemHeader style={[{borderBottomWidth:1,paddingBottom:10,paddingLeft:0,borderBottomColor:colorCodes.grey}]}>
                <Text style={[globals.h5,text.bold,text.uppercase,colors.colorPrimary]}>{`${day.name}   `}</Text>
            </ListItem>
            {
                lifts.map((lift) => {
                    return (day.toComplete[lift].map((set,index) => {
                        return (
                            <CustomListItem 
                                title={lift} 
                                desc={[`${set.reps} Reps at ${set.percentage || set.weightFactor}% of 1RM`]} 
                                key={`key-${index}`}
                            />
                        ) ; 
                    }))
                })
            }
        </List>
    )
}