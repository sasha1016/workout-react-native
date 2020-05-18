import React from 'react' 
import {
    View
} from 'react-native' ; 
import {
    Item,
    Label,
    Radio
} from 'native-base'; 
import {
    globals,
    colors,
    colorCodes
} from '../../../../Styles/globals' ; 

import PropTypes from 'prop-types' ; 

function ButtonLabel({children}) {
    return (
            <Label 
                style={[
                    globals.h5,
                    colors.colorPrimaryLighter,
                    {padding:5}
                ]}
            >
                {children}
            </Label>
    )
}

ButtonLabel.propTypes = {
    children:PropTypes.string.isRequired
}

export function RadioButton({onSelected,selected,children}) {
    return ( 

        <Item 
            inlineLabel 
            style={[
                globals.flex,
                {
                    borderBottomWidth:0,
                    justifyContent:'space-between',
                    paddingLeft:5,
                    paddingRight:5,
                }
            ]}
        >   
            {children}

            <Radio 
                color={colorCodes.primaryLighter} 
                selectedColor={colorCodes.primary} 
                selected={selected}
                onPress={() => onSelected()}
            />
        </Item>
    )
}

RadioButton.propTypes = {
    onSelected:PropTypes.func.isRequired,
    selected:PropTypes.bool.isRequired
}

RadioButton.defaultProps = {
    onSelected:(value) => {},
    selected:false
}

RadioButton.Label = ButtonLabel  ; 

export function RadioButtons({children}) {
    //console.warn(util.inspect(children)); 
    return (
        <View style={[globals.flex,globals.flexRow,globals.paddingTop]}>
            {children}
        </View>
    )
}

RadioButtons.propTypes = {
    children:PropTypes.arrayOf(PropTypes.element)
}
