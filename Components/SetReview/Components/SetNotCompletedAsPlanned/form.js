import React,{useState} from 'react'  ;

import {List,Snackbar} from 'react-native-paper' ; 

import {globals,colorCodes,colors,text} from '../../../../Styles/globals' ; 

import {FlatList,View,Picker} from 'react-native' ; 
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Form({state,reducers,snackbar,snackbarToggler}) {

    const addRepToSetBreakdown = (count) => {
        reducers.updateSetReview({
                        ...state.setReview,
                        setBreakdown:[...state.setReview.setBreakdown,{reps:count,id:Math.floor(Math.random() * 100000)}]
                    }) ; 
        reducers.updateTotalSetBreakdown( state.totalSetBreakdown - count ) ; 
    }


    const deleteSet = (set) => {
        reducers.updateTotalSetBreakdown(state.totalSetBreakdown + set.reps) ; 
        reducers.updateSetReview({...state.setReview, setBreakdown:state.setReview.setBreakdown.filter((item) => {
            return (item.id !== set.id)
        })}) ; 
    }
    
    const ListItem = ({set,index}) => {
        return (
            <List.Item 
                style={[
                        globals.item,
                        {
                            padding:5,
                            borderBottomColor: (index == state.setReview.setBreakdown.length - 1 ? "transparent" : colorCodes.grey)
                        },
                    ]} 
                title={`1 x ${set.reps}`} 
                titleStyle={[
                                colors.colorPrimary,
                                text.bold
                            ]} 
                right={() =>  (<TouchableOpacity onPress={() => deleteSet(set)}><List.Icon color={colorCodes.neutral} icon="delete-outline"/></TouchableOpacity>)}
            />
        )
    }



    return (
        <View style={[{paddingTop:60},globals.rootContainer]}>

            <View>
                <FlatList 
                    data={state.setReview.setBreakdown}
                    renderItem={({item,index}) =>  <ListItem set={item} index={index}/>}
                    keyExtractor={({item,index}) => `${index}`}
                />
            </View>

            { // If set didn't go as planned 

                ( !(state.totalSetBreakdown < 1) ?
                    <View style={[{borderWidth:1,borderColor:colorCodes.grey,borderRadius:5},text.h5,colors.colorPrimary]}>
                        <Picker 
                            onValueChange={(value) => (value !== null ? addRepToSetBreakdown(value) : false)}
                            selectedValue={null}
                        >

                            <Picker.Item label="Reps" value={null}/>
                            {[...Array(state.repsInSet).keys()].map((item) => {
                                if(item < (state.totalSetBreakdown == state.repsInSet ? state.repsInSet - 1 : state.totalSetBreakdown)) {
                                    return (<Picker.Item label={`${item + 1}`} value={item + 1} key={item}/>)
                                } 
                            })}
                        
                        </Picker>
                    </View>

                    :

                    (null)
                
                )

            }

            <Snackbar
                visible={snackbar}
                onDismiss={()=> snackbarToggler(!snackbar)}
                duration={1000}
                style={colors.bgPrimary}
            >
                Set Breakdown Incomplete 
            </Snackbar>

        </View>
    )
}