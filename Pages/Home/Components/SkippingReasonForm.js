import React from 'react'  ;

import {
    globals,
    colorCodes,
    colors,
    text
} from '../../../Styles/globals' ; 

import {
    Modal,
    View,
    Text,
    ScrollView
} from 'react-native' ; 

import {
    Title,
    Appbar
} from 'react-native-paper' ; 

import {
    List,
    ListItem
} from 'native-base' ; 

import CustomListItem from '../../../Components/ListItem2' ; 

const EXCUSES = [
    `Time Constraint`,
    `Exhausted`,
    `Unwell`,
    `Got High Today`,
    `Hungover`
]


export default function ReasonForSkipping({visible,toggler,aspect=""}) {

    const [selectedExcuses,setSelectedExcuses] = React.useState([]); 

    return (
        <Modal visible={visible} animationType="slide">
            <ScrollView>
                <Appbar style={[{top:0,left:0,height:65,width:"100%"},colors.bgPrimary]}>
                    <Appbar.Action icon="close" color={colorCodes.secondary} onPress={() => toggler(!visible)}/>
                    <Title style={[text.bold,globals.h4,colors.colorSecondary,text.left]}>{`Skip ${aspect}`}</Title>
                </Appbar>
                <View style={[globals.rootContainer]}>
                    {
                        EXCUSES.map((excuse) => {
                            let excuseSelected = selectedExcuses.includes(excuse);
                            return(
                                <CustomListItem 
                                    title={excuse}
                                    mode="NAV"
                                    icon={excuseSelected ? "minus-square" : "plus-square"}
                                    onIconPress={() => excuseSelected ? setSelectedExcuses(selectedExcuses.filter(e => e !== excuse)) : setSelectedExcuses([...selectedExcuses,excuse])}
                                />
                            )
                        })
                    }

                </View>
            </ScrollView>
        </Modal>
    )
}