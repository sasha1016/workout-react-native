import React from 'react' ; 
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper' ; 
import  { text,colors } from '../../../Styles/globals.js';

export default function SkipButton({onPress}) {
    return(
        <TouchableWithoutFeedback onPress={() => onPress()}>
            <Title style={[text.bold,text.h4,colors.colorSecondary,{paddingRight:20}]}>
                Skip
            </Title>
        </TouchableWithoutFeedback>
    )
}