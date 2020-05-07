import React, {useContext,useState} from 'react' ; 

import { 
    StyleSheet,
    View,
    ScrollView
} from 'react-native' ; 

import {
    Button,
    FooterTab,
    Text, 
    Icon
} from 'native-base' ; 

import  {
    colors,
    globals,
    text,
    colorCodes
} from '../../../Styles/globals.js';

import  { 
    getSecondsElapsed,
    getCurrentEpoch,
    getDateTime,
    displayTime,
    displayUnixTime
} from '../../../Utilities/index' ; 

import { WorkoutContext } from '../Contexts/index' ; 
import RBSheet from 'react-native-raw-bottom-sheet';

import Divider from 'react-native-divider' ; 



const iconStyle = [globals.h3,text.bold] ; 

const BottomSheetContent = () => {
    const state = React.useContext(WorkoutContext) ;

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

    return (
            <ScrollView>
                <View style={[globals.flexRow,{padding:20,paddingBottom:0}]}>
                    <Button 
                        transparent
                        style={styles.button}
                    >
                        <Icon 
                            name="stop" 
                            type="MaterialCommunityIcons"
                            style={[...iconStyle,(colors.colorPrimary)]} 
                        />
                    </Button>
                    <View style={styles.info}>
                            <View style={[globals.flexColumn,globals.flex,{justify:'center'}]}>
                                <Text
                                    style={[globals.h8,colors.colorPrimaryLighter,styles.info_header,text.center]}
                                >
                                    {state.workout.paused.status ? `Paused at` : `Started at`}
                                </Text>
                                <Text
                                    style={[globals.h5,text.bold,colors.colorPrimary,styles.info_content,text.center]}
                                >
                                    {
                                        state.workout.paused.status ?
                                            displayUnixTime(state.workout.paused.started)
                                        : 
                                            displayTime(state.workout.startedTime)
                                    }
                                </Text>
                            </View>
                    </View>
                    <Button
                        transparent
                        style={styles.button}
                        onPress={
                            () => { 
                                let paused =  state.workout.paused.status ; 
                                state.reducers.workout.set(
                                    {
                                        ...state.workout,
                                        paused:{
                                            status:!paused,
                                            total:( paused ? state.workout.paused.total + getSecondsElapsed(state.workout.paused.started) : state.workout.paused.total),
                                            started:(paused ? 0 : getCurrentEpoch())
                                        }
                                    }
                                )
                            }
                        }
                    >
                        <Icon 
                            name={(!state.workout.paused.status ? "pause" : "play")} 
                            type="Feather"
                            style={[...iconStyle,colors.colorPrimary]} 
                        />      
                    </Button>      
                </View>
                <Divider borderColor={colorCodes.primaryLighter} orientation="center">
                    <Text style={[globals.h8,colors.colorPrimaryLighter,text.center,text.uppercase]}>Previous Set</Text>
                </Divider>  
                <View style={[globals.flexRow]}>
                    <View style={[globals.flexColumn,{justify:'center',flex:.5}]}>
                        <Text
                            style={[globals.h8,colors.colorPrimaryLighter,styles.info_header,text.center]}
                        >
                            Exercise
                        </Text>
                        <Text
                            style={[globals.h5,text.bold,colors.colorPrimary,styles.info_content,text.center]}
                        >
                            Squats
                        </Text>
                    </View>
                    <View style={[globals.flexColumn,globals.flex,{justify:'center',flex:.25}]}>
                        <Text
                            style={[globals.h8,colors.colorPrimaryLighter,styles.info_header,text.center]}
                        >
                            Rating
                        </Text>
                        <Text
                            style={[globals.h5,text.bold,colors.colorPrimary,styles.info_content,text.center]}
                        >
                            7
                        </Text>
                    </View>
                    <View style={[globals.flexColumn,globals.flex,{justify:'center',flex:.25}]}>
                        <Text
                            style={[globals.h8,colors.colorPrimaryLighter,styles.info_header,text.center]}
                        >
                            Technique
                        </Text>
                        <Text
                            style={[globals.h5,text.bold,colors.colorPrimary,styles.info_content,text.center]}
                        >
                            8
                        </Text>
                    </View>
                </View> 
                <Divider borderColor={colorCodes.primaryLighter} orientation="center">
                    <Text style={[globals.h8,colors.colorPrimaryLighter,text.center,text.uppercase]}>Next Set</Text>
                </Divider>  
                <View style={[globals.flexRow]}>
                    <View style={[globals.flexColumn,{justify:'center',flex:.5}]}>
                        <Text
                            style={[globals.h8,colors.colorPrimaryLighter,styles.info_header,text.center]}
                        >
                            Exercise
                        </Text>
                        <Text
                            style={[globals.h5,text.bold,colors.colorPrimary,styles.info_content,text.center]}
                        >
                            Squats
                        </Text>
                    </View>
                    <View style={[globals.flexColumn,globals.flex,{justify:'center',flex:.25}]}>
                        <Text
                            style={[globals.h8,colors.colorPrimaryLighter,styles.info_header,text.center]}
                        >
                            Reps
                        </Text>
                        <Text
                            style={[globals.h5,text.bold,colors.colorPrimary,styles.info_content,text.center]}
                        >
                            7
                        </Text>
                    </View>
                    <View style={[globals.flexColumn,globals.flex,{justify:'center',flex:.25}]}>
                        <Text
                            style={[globals.h8,colors.colorPrimaryLighter,styles.info_header,text.center]}
                        >
                            Weight
                        </Text>
                        <Text
                            style={[globals.h5,text.bold,colors.colorPrimary,styles.info_content,text.center]}
                        >
                            80 kg
                        </Text>
                    </View>
                </View> 
            
            </ScrollView>  
    )
}

const WorkoutStarted = ({bottomSheetRef}) => {

    return(
        <Button 
            onPress={() => bottomSheetRef.current.open()}
            iconLeft
            style={[globals.flex,globals.flexRow]}
        >
            <Icon 
                name="chevron-up"
                type="Feather"
                style={[{color:colorCodes.primaryLighter},globals.h4]}
            />
            <Text
                style={[globals.h6,text.uppercase,colors.colorPrimary,text.bold]}
            >
                Open Dashboard
            </Text>
        </Button>
    )

}

const WorkoutNotStarted = () => {
    const state = React.useContext(WorkoutContext) ;
    return(
        <React.Fragment>
            <Button transparent>
                <Text 
                    style={[globals.h6,text.uppercase,colors.colorDanger,text.bold]}
                >
                    Skip
                </Text>
            </Button>
            <Button 
                transparent
                onPress={() => state.reducers.workout.set({...state.workout, started:true, startedTime:getDateTime()})}
            >
                <Text
                    style={[globals.h6,text.uppercase,colors.colorPrimary,text.bold]}
                >
                    Start
                </Text>
            </Button>
        </React.Fragment>
    )
}


export default function ActionBar() {
    const state = React.useContext(WorkoutContext) ;
    const bottomSheetRef = React.createRef() ; 

    const footer = StyleSheet.create({
        container:{
            position:"absolute",
            bottom:0,
            flex:1,
            left:0,
            right:0,
            width:"100%", 
            backgroundColor:colorCodes.grey,
        }
    }) ; 

    return (
        <React.Fragment>
            <FooterTab style={footer.container}>
                {
                    state.workout.started ? 
                        <WorkoutStarted bottomSheetRef={bottomSheetRef}/>
                    : 
                        <WorkoutNotStarted/>
                }
            </FooterTab>
            <RBSheet
                ref={bottomSheetRef}
                height={450}
                customStyles={{
                    container:{
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        backgroundColor:colorCodes.grey,
                    }
                }}
            >
                <BottomSheetContent/>
            </RBSheet>
        </React.Fragment>
    )
}


