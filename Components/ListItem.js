import React from 'react'  ;

import {List} from 'react-native-paper' ; 

import {globals,colorCodes,colors,text} from '../Styles/globals' ; 
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ListItem = ({item,index,total,title,left = null,right = null,style,props}) => {
    return (
        <List.Item 
            style={[
                    globals.item,
                    {
                        padding:5,
                        borderBottomColor: (index == total - 1 ? "transparent" : colorCodes.grey)
                    },
                    ...style
                ]} 
            title={title} 
            titleStyle={[
                            colors.colorPrimary,
                            text.bold
                        ]} 
            left={() => (left !== null ? <TouchableOpacity onPress={() => left.onPress(item)}><List.Icon color={left.color} icon={left.icon}/></TouchableOpacity> : false)}
            right={() => (right !== null ? <List.Icon color={left.color} icon={right.icon}/> : false)}
            {...props}
        />
    )
}