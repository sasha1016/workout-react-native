import React from 'react'; 
import { StyleSheet } from 'react-native' ; 

export const colorCodes = {
    primary: "#573280",
    secondary:"#FAEAFF",
    primaryLighter:"#6A3589",
    secondaryDarker:"#FAEAFF",
    success:"#4CFF9C",
    danger:"#FF2C55",
    successLighter:"#BFFFDB",
    dangerLighter:"#FFCCD6", 
    grey:"#e3e3e3"
}


export const globals = StyleSheet.create({
    h1: {
        fontSize:32
    },
    h2: {
        fontSize:24
    },
    h3: {
        fontSize:19
    },
    h4: {
        fontSize:16
    },
    h5:{
        fontSize:13
    },
    paragraph: {
        fontSize:10
    },
    rootContainer:{
        margin:20,
        padding:0,
        flex:1
    },
    item:{
        margin:0,
        borderBottomWidth:1,
        backgroundColor:"transparent",
    },
    paddingTop:{
        marginTop:20
    },
    flex:{
        flex:1,
    },
    flexRow:{
        flexDirection:'row'
    }, 
    flexColumn:{
        flexDirection:'column'
    }, 
    justifyCenter:{
        justifyContent:'center'
    }
}) ; 

export const text = StyleSheet.create({
    capitalize:{
        textTransform:'capitalize'
    },
    uppercase:{
        textTransform:'uppercase'
    },
    lowercase:{
        textTransform:'lowercase'
    },
    bold:{
        fontWeight:"700"
    },
    light:{
        fontWeight:"100"
    },
    medium:{
        fontWeight:"500"
    },
    center:{
        textAlign:'center'
    },
    right:{
        textAlign:'right'
    },
    left:{
        textAlign:'left'
    }
}) ; 

export const colors = StyleSheet.create({
    bgPrimary: {
        backgroundColor:colorCodes.primary
    }, 
    colorPrimary: {
        color:colorCodes.primary
    },
    bgSecondary: {
        backgroundColor:colorCodes.secondary 
    }, 
    colorSecondary:{
        color:colorCodes.secondary 
    },
    bgPrimaryLighter:{
        backgroundColor:colorCodes.primaryLighter
    },
    bgSecondaryDarker:{
        color:colorCodes.secondaryDarker
    },
    colorSuccess:{
        color:colorCodes.success
    },
    bgSuccess:{
        backgroundColor:colorCodes.success
    }, 
    colorDanger: {
        color:colorCodes.danger
    },
    bgDanger:{
        backgroundColor:colorCodes.danger
    },
    colorSuccessLighter:{
        color:colorCodes.successLighter
    },
    bgSuccessLighter:{
        backgroundColor:colorCodes.successLighter
    }, 
    colorDangerLighter: {
        color:colorCodes.dangerLighter
    },
    bgDangerLighter:{
        backgroundColor:colorCodes.dangerLighter
    },
    colorGrey:{
        color:colorCodes.grey,
    },
    bgGrey:{
        backgroundColor:colorCodes.grey
    }
}) ; 