import React,{useState,useEffect} from 'react' ; 
import { View, FlatList} from 'react-native' ; 


import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 

import CustomListItem from '../../Components/ListItem2' ; 

import {API,V1,TEST} from '../../config/api'

const axios = require('axios') ; 


export default function Routine({navigation}) {


    const onRoutineChange = (newRoutineForDay,day) => {
        var newRoutines = routines ; 
        newRoutine[day] = newRoutineForDay ; 
        setRoutine(newRoutines) ; 
    }

    function goToDay(routine,day) {
        navigation.push('Day',{day,routine,onRoutineChange}) ;
    }

    const [routines,setRoutines] = useState([]) ; 

    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] ; 

    useEffect(() => {
        axios.get(API.V1 + V1.USER.ROUTINES.GET, {
            params:{
                userId:TEST.USER
            }
        }).then((response) => {
            setRoutines(response.data[0]) ; 
        }).catch((error) => {
            console.warn(error.data.message,"failuer") ; 
        })
    },[]) ; 

    return (
        <View style={{padding:20,paddingTop:5}}>
            {
                routines.length !== 0 ? 
                    days.map((day,index) => {
                            return <CustomListItem 
                                title={day}
                                mode="NAV"
                                desc={[`${routines[day].length} Programs`]}
                                key={`key-${index}`}
                                onPress={() => {goToDay(routines[day], day)}}
                            />
                    })
                : 
                    null
            }
        </View>
    ) ; 
 

}
