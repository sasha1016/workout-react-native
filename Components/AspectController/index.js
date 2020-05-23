import React from 'react' ; 

import { 
    StyleSheet,
    View,
    Alert
} from 'react-native' ; 
import {
    Button, 
    Text, 
    Icon 
} from 'native-base' ; 
import  {
    colors,
    globals,
    text,
} from '../../Styles/globals.js';

const iconStyle = [globals.h3,text.bold] ; 

const _Alert = (message) => {
    Alert.alert(
        `Warning`,
        `${message}`
    ) ;
}

const styles = StyleSheet.create({
    button:{
        flex:0.25, 
        justifyContent:'center',
        flexDirection:'row',
    },
    info:{
        flex:.5,
        justifyContent:'center',
        height:45,
    },
    info_header:{
        flex:.25,
        flexDirection:'column',
    },
    info_content:{
        flex:.75,
        paddingTop:10
    },
    infoText:{
        justifyContent:'space-evenly',
        alignContent:'space-around'
    }
});

const LeftButton = (props) => {
    return(
        <Button 
            disabled={!props.started}
            transparent
            style={[styles.button,{opacity:(!props.started?0.4:1)}]}
            onPress={() => props.onStop()}
        >
            <Icon 
                name="stop"
                type="MaterialCommunityIcons"
                style={[...iconStyle,(colors.colorPrimary)]} 
            />
        </Button>
    )
}

const RightButton = (props) => {

    return(
        <Button
            transparent
            style={[styles.button]}
            onPress={() => (!props.started ? props.disabled ? _Alert(props.disabledMessage) : props.onPlay() : null)}
        >
            <Icon 
                name={(props.paused ? "pause" : "play")} 
                type="Feather"
                style={[...iconStyle,colors.colorPrimary]} 
            />      
        </Button>  
    )
}
const CenterInformation = (props) => {
    return(
        <View style={styles.info}>
            <View style={[globals.flexColumn,globals.flex,{justify:'center'}]}>
                <Text
                    style={[
                        globals.h8,
                        colors.colorPrimaryLighter,
                        styles.info_header,
                        text.center
                    ]}
                >
                    {
                        props.started ? 
                            `Started At`
                        : 
                            `Not started yet`
                    }
                </Text>
                <Text
                    style={[
                        globals.h5,
                        text.bold,
                        colors.colorPrimary,
                        styles.info_content,
                        text.center
                    ]}
                >
                    {
                        props.started ? 
                            props.values.started
                        : 
                            `Not started yet`
                    }
                </Text>
            </View>
        </View>
    )
}

const AspectController = ({children,started,paused,disabled,disabledMessage}) => {

    return(
        <View style={[globals.flex,globals.flexRow]}>
            {
                React.Children.map(children,(child) => 
                    React.cloneElement(child,{paused,disabled,started,disabledMessage})
                )
            }
        </View>
    )
}

AspectController.Left = LeftButton ; 
AspectController.Right = RightButton;
AspectController.Center = CenterInformation ; 

export default AspectController ; 



