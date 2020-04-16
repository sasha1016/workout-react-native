import React,{Fragment} from 'react' ; 
import {Text,StyleSheet,View} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 

import {ListItem,Right,Icon} from 'native-base' ; 

import CustomListItem from '../../../Components/ListItem2.js';


const Header = (props) => {

    const styles = StyleSheet.create({
        info:{
            flex:1,
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'stretch'
        }, 
        listHeader:{
            borderBottomWidth:1,
            paddingBottom:10,
            paddingLeft:5,
            borderBottomColor:colorCodes.grey,
            justifyContent:'space-between',
            paddingRight:3,
        },
        icon:{
            paddingRight:0,
            marginRight:0
        }
    }) ; 

    return (
        <ListItem itemHeader style={[styles.listHeader,globals.flex,globals.flexRow]}>
            <Text style={[globals.h5,text.bold,text.uppercase,colors.colorNeutral]}>{props.title}</Text>
            <Right>
                <Icon name="plus" type="Feather" style={[styles.icon,globals.h4,colors.colorPrimaryLighter]} onPress={props.onIconPress}/>
            </Right>
        </ListItem>
    )
}


export default function RenderUserLifts({lifts,onPressCB,onStartNewProgram}) {
    var mainIndexPos = true, accessIndexPos = true ; 
    return (
        <View>
            {
                lifts.map((lift,index) => {


                    if(lift.lift === "main") {

                        if(mainIndexPos) {
                            mainIndexPos = false ; 
                            return (
                                <Fragment>
                                    <Header title="Main Lifts" onIconPress={() => onStartNewProgram(lift)}/>
                                    <CustomListItem title={lift.liftName} desc={[lift.programName]} onPress={() => onPressCB(lift)} key={lift.programId} mode="NAV"/>
                                </Fragment>
                            )
                        } else {

                            if(lifts.length - 1 === index) {
                                if(accessIndexPos) {
                                    return (
                                        <Fragment>
                                            <CustomListItem title={lift.liftName} desc={[lift.programName]} onPress={() => onPressCB(lift)} key={lift.programId} mode="NAV"/>
                                            <Header title="Accessory Lifts" onIconPress={() => onStartNewProgram({lift:"access"})}/>
                                            <Text style={[globals.h5,text.center,colors.colorNeutral,globals.paddingTop]}>No Accessory Lift programs started</Text>
                                        </Fragment>
                                    )                               
                                } else {
                                    return (
                                        <CustomListItem title={lift.liftName} desc={[lift.programName]} onPress={() => onPressCB(lift)} key={lift.programId} mode="NAV"/>
                                    )                                     
                                }
                            } else {
                                return (
                                    <CustomListItem title={lift.liftName} desc={[lift.programName]} onPress={() => onPressCB(lift)} key={lift.programId} mode="NAV"/>
                                )  
                            }      
                        }
                    } else {
                        if(accessIndexPos) {
                            accessIndexPos = !accessIndexPos ; 
                            return (
                                <Fragment>
                                    <Header title="Accessory Lifts"/>
                                    <CustomListItem title={lift.muscleGroup} desc={[lift.programName]} onPress={() => onPressCB(lift)} key={lift.programId} mode="NAV"/>
                                </Fragment>
                            )     

                        } else {
                            if(lifts.length - 1 === index) {
                                if(mainIndexPos) {
                                    return (
                                        <Fragment>
                                            <CustomListItem title={lift.muscleGroup} desc={[lift.programName]} onPress={() => onPressCB(lift)} key={lift.programId} mode="NAV"/>
                                            <Header title="Accessory Lifts" onIconPress={() => onStartNewProgram({lift:"access"})}/>
                                            <Text style={[globals.h5,text.center,colors.colorNeutral,globals.paddingTop]}>No Accessory Lift programs started</Text>
                                        </Fragment>
                                    )                               
                                } else {
                                    return (
                                        <CustomListItem title={lift.muscleGroup} desc={[lift.programName]} onPress={() => onPressCB(lift)} key={lift.programId} mode="NAV"/>
                                    ) ; 
                                }
                            } else {
                                return (
                                    <CustomListItem title={lift.muscleGroup} desc={[lift.programName]} onPress={() => onPressCB(lift)} key={lift.programId} mode="NAV"/>
                                ) ; 
                            }   
                        }
                    }

                })
            }

        </View>
    )

}