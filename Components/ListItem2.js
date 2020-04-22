import React from 'react' ; 
import { Text,StyleSheet} from 'react-native' ; 

import {globals,colors,text} from '../Styles/globals' ; 
import {capitalize} from '../Utilities' ; 

import {ListItem,Body,Right,Icon} from 'native-base' ; 


export default function LI({title = "",desc = [],icon = "chevron-right",mode = "INFORMATION",onPress = () => {}, onIconPress = () => {}, index}) {

    const styles = StyleSheet.create({
        container:{
            position:"relative",
            paddingLeft:0,
            paddingRight:0,
            paddingTop:15,
            paddingBottom:15,
            width:"100%"
        }, 
        iconContainer:{
            marginRight:0,
            paddingRight:0,
            right:0,
            position:"absolute"
        },
        icon:{
            marginRight:0,
            right:0
        }
    }) ; 

    return (
        <ListItem noIndent onPress={onPress} noBorder style={styles.container}>
            <Body >
                <Text style={[globals.h4,text.bold,colors.colorPrimary]}>{capitalize(title || "")}</Text>
                {
                    desc.map((description,descIndex) => 
                        <Text key={`key_${descIndex}`} note noOfLines={1} style={[globals.h5,colors.colorNeutral,styles.desc,{marginTop:(descIndex === 0 ? 5 : 0)}]}>{capitalize(description || "")}</Text>
                    )
                }
            </Body>
            {
                mode === "NAV" ? 
                    <Right style={styles.iconContainer}>
                        <Icon 
                            name={icon} 
                            type="Feather" 
                            active 
                            style={[colors.colorPrimaryLighter,text.right,styles.icon]}
                            onPress={onIconPress}
                        />
                    </Right>
                : 
                    null
            }   
        </ListItem>
    ) ; 
}