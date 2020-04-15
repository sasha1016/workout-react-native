import React from 'react' ; 
import { Text,StyleSheet} from 'react-native' ; 

import {globals,colors,text} from '../Styles/globals' ; 
import {capitalize} from '../Utilities' ; 

import {ListItem,Body,Right,Icon} from 'native-base' ; 


export default function LI({title = "",desc = [],icon = "chevron-right",mode = "INFORMATION",onPress = () => {}}) {

    return (
        <ListItem onPress={onPress} noBorder style={[{marginLeft:0,position:"relative"}]}>
            <Body >
                <Text style={[globals.h4,text.bold,colors.colorPrimary]}>{capitalize(title)}</Text>
                {
                    desc.map((description) => 
                        <Text note noOfLines={1} style={[globals.h5,colors.colorNeutral,{marginTop:5}]}>{description}</Text>
                    )
                }
            </Body>
            {
                mode === "NAV" ? 
                    <Right style={{marginRight:0,paddingRight:0,right:0,position:"absolute"}}>
                        <Icon name={icon} type="Feather" active style={[colors.colorPrimaryLighter,text.right,{marginRight:0,right:0}]}/>
                    </Right>
                : 
                    null
            }   
        </ListItem>
    ) ; 
}