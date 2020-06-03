import React,{useContext} from 'react' ; 
import { List } from 'native-base' ; 
import CustomListItem from '../../Components/ListItem2' ; 
import { RoutineContext } from './Contexts/index.js' ; 
import { UserContext } from '../../Layout/Contexts';
import { Routine } from '../../Classes';
import { DAYS } from '../../Constants' ; 

export default function RoutineScreen({navigation}) {
    const routines = useContext(RoutineContext) ; 
    const user = useContext(UserContext) ; 
    const routine = new Routine(user.data.uid) ; 

    function goToDay(day) {
        navigation.push('Day',{day}) ;
    }

    React.useLayoutEffect(() => {
        routine.get()
        .then((routine) => {
            console.warn(routine) ; 
            routines.set(routine) ;
        })
        .catch((error) => {
            console.warn(error) ; 
        })
    },[]) ; 

    return (
        <List style={{padding:20,paddingTop:5}}>
            {
                routines.data !== [] ? 
                    Object.keys(routines.data).map((day) => {
                        if(DAYS.includes(day)) {
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
