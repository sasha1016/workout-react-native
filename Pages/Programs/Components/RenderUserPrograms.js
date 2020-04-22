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
                <Icon name="plus" type="Feather" style={[styles.icon,globals.h4,colors.colorNeutral]} onPress={props.onIconPress}/>
            </Right>
        </ListItem>
    )
}


export default function RenderUserPrograms({programs,viewUserProgramInformation,onStartNewProgramIntent}) {
    var mainIndexPos = true, accessIndexPos = true ; 
    return (
        <View>
            {
                programs.map((program,index) => {
                    if(program.lift === "main") {
                        if(mainIndexPos) {
                            mainIndexPos = false ; 
                            return (
                                <Fragment>
                                    <Header title="Main Lifts" key="main_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","main")}/>
                                    <CustomListItem title={program.liftName} desc={[program.programName]} onPress={() => viewUserProgramInformation(program)} key={program.programId} mode="NAV"/>
                                </Fragment>
                            )
                        } else {
                            if(programs.length - 1 === index) {
                                if(accessIndexPos) {
                                    return (
                                        <Fragment>
                                            <CustomListItem title={program.liftName} desc={[program.programName]} onPress={() => viewUserProgramInformation(program)} key={program.programId} mode="NAV"/>
                                            <Header title="Accessory Lifts" key="accessorty_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","access")}/>
                                            <Text style={[globals.h5,text.center,colors.colorNeutral,globals.paddingTop]}>No Accessory Lift programs started</Text>
                                        </Fragment>
                                    )                               
                                } else {
                                    return (
                                        <CustomListItem title={program.liftName} desc={[program.programName]} onPress={() => viewUserProgramInformation(program)} key={program.programId} mode="NAV"/>
                                    )                                     
                                }
                            } else {
                                return (
                                    <CustomListItem title={program.liftName} desc={[program.programName]} onPress={() => viewUserProgramInformation(program)} key={program.programId} mode="NAV"/>
                                )  
                            }      
                        }
                    } else {
                        if(accessIndexPos) {
                            accessIndexPos = !accessIndexPos ; 
                            return (
                                <Fragment>
                                    <Header title="Accessory Lifts" key="accessorty_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","access")}/>
                                    <CustomListItem title={program.muscleGroup} desc={[program.programName]} onPress={() => viewUserProgramInformation(program)} key={program.programId} mode="NAV"/>
                                </Fragment>
                            )     

                        } else {
                            if(programs.length - 1 === index) {
                                if(mainIndexPos) {
                                    return (
                                        <Fragment>
                                            <CustomListItem title={program.muscleGroup} desc={[program.programName]} onPress={() => viewUserProgramInformation(program)} key={program.programId} mode="NAV"/>
                                            <Header title="Main Lifts" key="main_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","main")}/>
                                            <Text style={[globals.h5,text.center,colors.colorNeutral,globals.paddingTop]}>No Main Lift programs started</Text>
                                        </Fragment>
                                    )                               
                                } else {
                                    return (
                                        <CustomListItem title={program.muscleGroup} desc={[program.programName]} onPress={() => viewUserProgramInformation(program)} key={program.programId} mode="NAV"/>
                                    ) ; 
                                }
                            } else {
                                return (
                                    <CustomListItem title={program.muscleGroup} desc={[program.programName]} onPress={() => viewUserProgramInformation(program)} key={program.programId} mode="NAV"/>
                                ) ; 
                            }   
                        }
                    }

                })
            }

        </View>
    )

}