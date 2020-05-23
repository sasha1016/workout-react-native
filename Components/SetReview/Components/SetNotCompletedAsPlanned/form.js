import React from 'react'  ;

import CustomListItem from '../../../ListItem2' ; 

import {globals,colorCodes,colors,text} from '../../../../Styles/globals' ; 

import {FlatList,View,Text} from 'react-native' ; 

import Divider from 'react-native-divider' ; 


export default function Form({state,reducers}) {

    const addRepToSetBreakdown = (count) => {
        reducers.updateSetReview({
                        ...state.setReview,
                        setBreakdown:[...state.setReview.setBreakdown,count]
                    }) ; 
        reducers.updateTotalSetBreakdown( state.totalSetBreakdown - count ) ; 
    }


    const deleteSet = (set,toDeleteIndex) => {
        reducers.updateTotalSetBreakdown(state.totalSetBreakdown + set) ; 
        let setBreakdownAfterDeletion = state.setReview.setBreakdown.filter((_,index) => {return index !== toDeleteIndex})
        reducers.updateSetReview({...state.setReview, setBreakdown:setBreakdownAfterDeletion}) ; 
    }

    const SetBreakDownForm = () => {
        return (
            ( !(state.totalSetBreakdown < 1) ?
                <React.Fragment>
                    <View style={[globals.flex,{paddingTop:10}]}>
                        <Divider style={{marginTop:20,marginBottom:20}} borderColor={colorCodes.grey} orientation="center">
                            <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>Add Set</Text>   
                        </Divider>
                        {
                            [...Array(state.repsInSet).keys()].map((item,index) => {
                                if(item < (state.totalSetBreakdown == state.repsInSet ? state.repsInSet - 1 : state.totalSetBreakdown)) {
                                    return (
                                        <CustomListItem 
                                            title={`Set ${state.setReview.setBreakdown.length + 1}`}
                                            icon="plus"
                                            desc={[`${item+1} Reps`]}
                                            onIconPress={() => addRepToSetBreakdown(item + 1)}
                                            key={`key_${index}`}
                                            mode="NAV"
                                        />
                                    )
                                } 
                            })
                        }
                    </View>
                </React.Fragment>

                :

                (null)
            
            )
        )
    }



    return (
        <View style={[{paddingTop:60}]}>
            <FlatList 
                data={state.setReview.setBreakdown}
                ListEmptyComponent={<Text style={[globals.h6,colors.colorGrey,{letterSpacing:0},text.center]}>Set Breakdown is empty</Text>}
                renderItem={({item,index}) =>  <CustomListItem 
                                                    title={`Set ${(index+1)}`}
                                                    desc={[`${item} Reps`]}
                                                    onIconPress={() => deleteSet(item,index)}
                                                    icon="trash-2"
                                                    mode="NAV"
                                                />}
                keyExtractor={(item) => `${item.id}`}
                ListFooterComponent={SetBreakDownForm}
                contentContainerStyle={{padding:20}}
            />
        </View>
    )
}