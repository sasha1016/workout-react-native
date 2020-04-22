import React from 'react' ; 
import {Text,StyleSheet,TouchableOpacity} from 'react-native' ; 
import {List,ListItem,Right,Icon} from 'native-base' ;

import {globals,colorCodes,colors,text} from '../../../../Styles/globals' ; 

import CustomListItem from '../../../../Components/ListItem2.js';

export default function Day({day, headerButton = false, headerButtonType = "ICON", headerButtonText = "", headerButtonTextStyle = [], headerButtonIconStyle = [], onHeaderButtonPress = () => {}}) {
    const exercises = day.toComplete ; 

    const sets = (sets) => {
        var arr = [] ; 
        sets.map(set => arr =[...arr,`${set.reps} Reps at ${set.percentage || set.weightFactor}% of 1RM`] ) ; 
        return arr ; 
    }

    return (
        <List>
            <ListItem itemHeader style={[styles.listHeader,globals.flex,globals.flexRow]}>
                <Text style={[globals.h5,text.bold,text.uppercase,colors.colorNeutral]}>{`${day.name}   `}</Text>
                <Right>
                    {
                        headerButton ?
                            headerButtonType === "ICON" ?
                                <Icon name="plus" type="Feather" style={[styles.icon,globals.h4,colors.colorNeutral, ...headerButtonIconStyle]} onPress={onHeaderButtonPress}/>
                            : 
                                <TouchableOpacity onPress={onHeaderButtonPress}>
                                    <Text style={[globals.h5,text.bold,text.uppercase,colors.colorNeutral, ...headerButtonTextStyle]}>{headerButtonText}</Text>
                                </TouchableOpacity>
                        : 
                            null 
                    }
                </Right>
            </ListItem>
            {
                exercises.map((exercise,index) => {
                        return (
                            <CustomListItem 
                                title={exercise.name} 
                                desc={sets(exercise.sets)} 
                                key={`key-${index}`}
                            />
                        ) ; 
                })
            }
        </List>
    )
}


const styles = StyleSheet.create({
    info:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'stretch'
    }, 
    listHeader:{
        borderBottomWidth:1,
        paddingBottom:10,
        paddingLeft:5,
        borderBottomColor:colorCodes.grey,
        justifyContent:'space-between',
        paddingRight:3,
    },
    icon:{
        paddingRight:0,
        marginRight:0
    }
}) ; 