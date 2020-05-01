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


export default function RenderUserPrograms({userPrograms,viewUserProgramInformation,onStartNewProgramIntent}) {
    var mainIndexPos = true, accessIndexPos = true ; 
    return (
        <View>
            {
                userPrograms.length === 0 ?
                    <Fragment>
                        <Header title="Main Lifts" key="main_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","main")}/>
                        <Text style={[globals.h5,text.center,colors.colorNeutral,globals.paddingTop]}>0 programs started</Text>
                        <Header title="Accessory Lifts" key="accessory_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","access")}/>
                        <Text style={[globals.h5,text.center,colors.colorNeutral,globals.paddingTop]}>0 programs started</Text>
                    </Fragment>
                :
                    userPrograms.map((userProgram,index) => {
                        if(userProgram.lift === "main") {
                            if(mainIndexPos) { // If its the first main Lift program to be displayed 
                                mainIndexPos = false ; 
                                return (
                                    <Fragment>
                                        <Header title="Main Lifts" key="main_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","main")}/>
                                        <CustomListItem title={userProgram.liftName} desc={[userProgram.programName || userProgram.userProgram.name]} onPress={() => viewUserProgramInformation(userProgram)} key={userProgram.programId || userProgram.userProgram._id} mode="NAV"/>
                                    </Fragment>
                                )
                            } else {
                                if(userPrograms.length - 1 === index) { // If its the last User program
                                    if(accessIndexPos) { // If no accessory program has been displyed yet 
                                        return (
                                            <Fragment>
                                                <CustomListItem title={userProgram.program.liftName} desc={[userProgram.programName || userProgram.userProgram.name]} onPress={() => viewUserProgramInformation(userProgram)} key={userProgram.programId || userProgram.userProgram._id} mode="NAV"/>
                                                <Header title="Accessory Lifts" key="accessorty_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","access")}/>
                                                <Text style={[globals.h5,text.center,colors.colorNeutral,globals.paddingTop]}>No Accessory Lift programs started</Text>
                                            </Fragment>
                                        )                               
                                    } else {
                                        return (
                                            <CustomListItem title={userProgram.program.liftName} desc={[userProgram.programName || userProgram.program.name]} onPress={() => viewUserProgramInformation(userProgram)} key={userProgram.programId || userProgram.program._id} mode="NAV"/>
                                        )                                     
                                    }
                                } else {
                                    return (
                                        <CustomListItem title={userProgram.program.liftName} desc={[userProgram.programName || userProgram.program.name]} onPress={() => viewUserProgramInformation(userProgram)} key={userProgram.programId || userProgram.program._id} mode="NAV"/>
                                    )  
                                }      
                            }
                        } else {
                            if(accessIndexPos) { // If its the first accessory program to be displayed 
                                accessIndexPos = false ; 
                                return (
                                    <Fragment>
                                        <Header title="Accessory Lifts" key="accessorty_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","access")}/>
                                        <CustomListItem title={userProgram.program.muscleGroup} desc={[userProgram.programName || userProgram.program.name]} onPress={() => viewUserProgramInformation(userProgram)} key={userProgram.programId || userProgram.program._id} mode="NAV"/>
                                        {
                                            mainIndexPos?
                                                <Fragment>
                                                    <Header title="Main Lifts" key="main_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","main")}/>
                                                    <Text style={[globals.h5,text.center,colors.colorNeutral,globals.paddingTop]}>No Main Lift programs started</Text>
                                                </Fragment>
                                            :
                                                null
                                        }
                                    </Fragment>
                                )     

                            } else {
                                if(userPrograms.length - 1 === index) { // If it the last accessory program to be displayed 
                                    if(mainIndexPos) { // If no main lift has been displayed yet 
                                        return (
                                            <Fragment>
                                                <CustomListItem title={userProgram.program.muscleGroup} desc={[userProgram.programName || userProgram.program.name]} onPress={() => viewUserProgramInformation(userProgram)} key={userProgram.programId || userProgram.program._id} mode="NAV"/>
                                                <Header title="Main Lifts" key="main_lifts_header" onIconPress={() => onStartNewProgramIntent("lift","main")}/>
                                                <Text style={[globals.h5,text.center,colors.colorNeutral,globals.paddingTop]}>No Main Lift programs started</Text>
                                            </Fragment>
                                        )                               
                                    } else {
                                        return (
                                            <CustomListItem title={userProgram.program.muscleGroup} desc={[userProgram.programName || userProgram.program.name]} onPress={() => viewUserProgramInformation(userProgram)} key={userProgram.programId || userProgram.program._id} mode="NAV"/>
                                        ) ; 
                                    }
                                } else {
                                    return (
                                        <CustomListItem title={userProgram.program.muscleGroup} desc={[userProgram.programName || userProgram.program.name]} onPress={() => viewUserProgramInformation(program)} key={userProgram.programId || userProgram.program._id} mode="NAV"/>
                                    ) ; 
                                } 

                            }
                        }

                    })
            }

        </View>
    )

}