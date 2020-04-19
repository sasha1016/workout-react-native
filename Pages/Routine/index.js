import React,{useState,useEffect} from 'react' ; 
import { View, FlatList} from 'react-native' ; 


import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 

import CustomListItem from '../../Components/ListItem2' ; 

import {API,V1,TEST} from '../../config/api'

const axios = require('axios') ; 


export default function Routine({navigation}) {

    function goToDay(day) {
        navigation.push('Day',{day}) ;
    }

    const [routines,setRoutines] = useState([]) ; 

    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] ; 

    useEffect(() => {
        axios.get(API.V1 + V1.USER.ROUTINES.GET, {
            params:{
                userId:TEST.USER
            }
        }).then((response) => {
            setRoutines(response.data) ; 
        }).catch((error) => {
            console.warn(error.data.message,"failuer") ; 
        })
    },[])

    return (
        <View style={{padding:20,paddingTop:5}}>
            {
                routines.length !== 0 ? 
                    days.map((day,index) => {
                            return <CustomListItem 
                                title={day}
                                mode="NAV"
                                desc={[`${routines[0][day].length} Programs`]}
                                key={`key-${index}`}
                                onIconPress={() => {}}
                            />
                    })
                : 
                    null
            }
        </View>
    ) ; 
 

}
