import React from 'react' ; 
import { View, FlatList} from 'react-native' ; 

import ListItem from '../../Components/ListItem' ; 
import {List} from 'react-native-paper' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 


export default function Routine({navigation}) {

    const days = [
        {key:'id-0',day:'Monday',id:"mon"}, 
        {key:'id-1',day:'Tuesday',id:"tue"}, 
        {key:'id-2',day:'Wednesday',id:"wed"}, 
        {key:'id-3',day:'Thursday',id:"thu"}, 
        {key:'id-4',day:'Friday',id:"fri"}, 
        {key:'id-5',day:'Saturday',id:"sat"}, 
        {key:'id-6',day:'Sunday',id:"sun"}, 
    ] ; 

    function goToDay(day) {
        navigation.push('Day',{day}) ;
    }

    return (
        <View style={[{flex:1},globals.rootContainer]}>
            <FlatList 
                data={days}
                renderItem={({item,index}) => {
                    return (
                        <List.Item 
                            style={[
                                    globals.item,
                                    {
                                        padding:5,
                                        borderBottomColor: (index == days.length - 1 ? "transparent" : colorCodes.grey)
                                    },
                                ]} 
                            title={item.day} 
                            titleStyle={[
                                            colors.colorPrimary,
                                            text.bold
                                        ]} 
                            left={() => (<List.Icon color={colorCodes.primaryLighter} icon="calendar-edit"/>)}
                            onPress={() => goToDay(item)}
                        />
                    )
                }}
            />
        </View>
    ) ; 
 

}
