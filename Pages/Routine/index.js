import React,{useEffect,useContext} from 'react' ; 
import { List } from 'native-base' ; 

import CustomListItem from '../../Components/ListItem2' ; 

import {API,V1,TEST} from '../../config/api' ; 

import {RoutineContext} from './Contexts/index.js' ; 

const axios = require('axios') ; 


export default function Routine({navigation}) {

    const routines = useContext(RoutineContext) ; 


    function goToDay(day) {
        navigation.push('Day',{day}) ;
    }


    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] ; 

    useEffect(() => {
        axios.get(API.V1 + V1.USER.ROUTINES.GET, {
            params:{
                userId:TEST.USER
            }
        }).then((response) => { 
            routines.set(response.data[0]) ;
        }).catch((error) => {
            console.warn(error.data.message,"failuer") ; 
        })
    },[]) ; 

    return (
        <List style={{padding:20,paddingTop:5}}>
            {
                routines.data !== [] ? 
                    Object.keys(routines.data).map((day) => {
                        if(days.includes(day)) {
                            return (<CustomListItem 
                                title={day}
                                mode="NAV"
                                key={`key_${day}`}
                                desc={[`${routines.data[day].length} programs`]}
                                onPress={() => {goToDay(day)}}
                            />)
                        } 
                    })
                : 
                    null
            }
        </List>
    ) ; 
 

}
