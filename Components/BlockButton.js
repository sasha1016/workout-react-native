import React from 'react' ; 
import { Button } from 'native-base' ;
import { Text } from 'react-native' ; 
import {
    text,
    colors,
    colorCodes
} from '../Styles/globals' ; 

export default function BlockButton({
                                        title,
                                        onPress,
                                        disabled,
                                        top = 30 ,
                                        bottom = 30 ,
                                        color = colorCodes.primaryLighter,
                                        background = colorCodes.grey
                                    }) {
    return (
        <Button
            disabled={disabled}
            full
            style={{
                    opacity:(!disabled ? 1 : 0.4),
                    marginBottom:(bottom),
                    marginTop:(top),
                    elevation:0,
                    color:color,
                    backgroundColor:background
            }}
            onPress={() => onPress()}
        >
            <Text style={[text.h5, text.center,text.bold,text.uppercase,colors.colorPrimaryLighter]}>
                {` ${title}    `} 
            </Text>
        </Button>
    )
}