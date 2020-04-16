import React,{useState,useEffect} from 'react'  ;

import {globals,colorCodes,colors,text} from '../../../Styles/globals' ; 
import {capitalize} from '../../../Utilities' ; 

import {API, V1} from '../../../config/api' ; 

import {Modal,View,Text,StyleSheet,Alert} from 'react-native' ; 
import {Container,Button,Icon,Accordion} from 'native-base' ; 
import {Title,Appbar} from 'react-native-paper' ; 
import StarRating from 'react-native-star-rating' ;

import ChooseProgram from '../ChoosePrograms' ; 

const axios = require('axios'); 

export default function ChangeProgram({visible,toggler,lift,filterBy,filterByValue}) {

    var [programs,setPrograms] = useState([]) ; 

    const AccordionContent = (item) => {

        const itemStyle =  [globals.flex,globals.flexRow,{justifyContent:'space-between'}] ; 
        const textTitle = [globals.h5,text.bold,colors.colorNeutral] ; 
    
        return (
    
    
            <View style={[globals.flex,globals.flexColumn,globals.rootContainer,{marginTop:0}]}>
                <View style={itemStyle}>
                    <Text style={textTitle}>Duration  </Text>
                    <Text style={[globals.h5,colors.colorNeutral]}>{`${item.duration} weeks`}</Text>
                </View>
                <View style={itemStyle}>
                    <Text style={textTitle}>Rating </Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={item.rating}
                        starSize={13}
                        starStyle={[colors.colorNeutral,{marginLeft:2}]}
                    />
                </View>
                <View style={itemStyle}>
                    <Text style={textTitle}>Frequency  </Text>
                    <Text style={[globals.h5,colors.colorNeutral]}>{`${item.frequency} x week`}</Text>
                </View>
                <View style={[globals.flex,globals.flexRow,{paddingTop:10,alignItems:"flex-end",justifyContent:'space-between'}]}>
                    <Text></Text>
                    <Button
                        transparent
                        small
                        onPress={() =>  Alert.alert("Confirm Program Switch",`Are you sure you want to switch your ${capitalize(lift.liftName)} program to ${item.name}? All progress from your current program will be lost.`,[{text:"Cancel",style:"cancel"},{text:"Switch",onPress:() => toggler(!visible)}])}
                    >
                        <Text style={[globals.h6,text.bold,text.uppercase,colors.colorWarning]}>Switch </Text>
                    </Button>
                </View>
    
            </View>
    
        )
    }
    
    const AccordionHeader = (item,expanded) => {
    
        const styles = StyleSheet.create({
            icon:{
                color:colorCodes.primaryLighter,
                fontSize:18
            },
            header:{
                justifyContent:'space-between',
                alignItems:'center',
                padding:10,
                paddingTop:15,
                paddingBottom:15,
                borderBottomWidth:(expanded ? 0 : 1),
                borderColor:colorCodes.grey
            }
        }) ; 
    
        return (
            <View style={[globals.flex,globals.flexRow,styles.header]}>
                <View>
                    <Text style={[globals.h4,text.bold,colors.colorPrimary]}>{`${item.name}  `}</Text>
                    <Text style={[globals.h5,colors.colorNeutral]}>{`${item.duration} weeks`}</Text>
                </View>
                {
                    expanded ?
                        <Icon name="chevron-up" type="Feather" style={styles.icon}/>
                    :
                        <Icon name="chevron-down" type="Feather" style={styles.icon}/>
                }
            </View>
        )
    }



    return (
        <View>
            <Modal visible={visible} animationType="slide">
                    {/* <Container>
                        <Appbar style={[{top:0,left:0,height:65,width:"100%"},colors.bgPrimary]}>
                            <Appbar.Action icon="close" color={colorCodes.secondary} onPress={() => toggler(!visible)}/>
                            <Title style={[text.bold,globals.h4,colors.colorSecondary,text.left]}>{`${capitalize(lift.liftName || lift.muscleGroup)} Programs`}</Title>
                        </Appbar>
                        <View style={[globals.rootContainer]}>
                            <View>
                                <Accordion 
                                    dataArray={programs}
                                    renderHeader={AccordionHeader} 
                                    renderContent={AccordionContent}
                                    expanded={false} 
                                    animation={false}
                                    style={{borderWidth:0}}
                                />
                            </View>
                        </View>
                    </Container> */}
                <Appbar style={[{top:0,left:0,height:65,width:"100%"},colors.bgPrimary]}>
                    <Appbar.Action icon="close" color={colorCodes.secondary} onPress={() => toggler(!visible)}/>
                    <Title style={[text.bold,globals.h4,colors.colorSecondary,text.left]}>{`${capitalize(lift.liftName || lift.muscleGroup)} Programs`}</Title>
                </Appbar>
                <ChooseProgram filterBy={filterBy} filterByValue={filterByValue}/>
                
            </Modal>

        </View>
    )
}