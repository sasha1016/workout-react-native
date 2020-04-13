import React,{useEffect,useState} from 'react' ; 
import { View, FlatList, Picker,ScrollView,Alert} from 'react-native' ; 

import {globals,colorCodes,colors,text} from '../../Styles/globals' ; 

import ListItem from '../../Components/ListItem.js' ; 

import {IconButton} from 'react-native-paper' ; 

import DraggableFlatList from 'react-native-draggable-flatlist' ;
import { TouchableOpacity } from 'react-native-gesture-handler';
import workOutForTheDay from '../StartWorkout';


export default function Day({navigation,route}) {

    const [currentAction,setCurrentAction] = useState(null);

    const allWorkouts = [
        {name:"squat",type:"sbd"},
        {name:"bench",type:"sbd"},
        {name:"deadlift",type:"sbd"},
        {name:"biceps",type:"accessory"},
        {name:"back",type:"accessory"},
        {name:"shoulders",type:"accessory"},
        {name:"calves",type:"accessory"}
    ] ; 

    const [workoutForTheDay,setWorkoutForTheDay] = useState([
        {name:"bench",type:"sbd"},
        {name:"squat",type:"sbd"},
        {name:"back",type:"accessory"},
        {name:"biceps",type:"accessory"}
    ]) ; 

    const workoutNamesList = workoutForTheDay.map(item => item.name) ; 

    const workoutForTheDayFull = workoutForTheDay.length == allWorkouts.length; 

    const popWorkout = (item) => {
        setWorkoutForTheDay(workoutForTheDay.filter((workout) => {
            return (item.name != workout.name)
        }))
    }



    const ActionButtons = () => {

        return(

            <View>
                {
                    !workoutForTheDayFull && currentAction == "ADD" ? 
                        <View style={[globals.paddingTop,{margin:20,marginBottom:0,borderWidth:1,borderColor:colorCodes.grey,color:colorCodes.primary,borderRadius:5}]}>
                            <Picker
                                    onValueChange={(value) => {setWorkoutForTheDay([...workoutForTheDay,value])}}
                            >
                                <Picker.Item label="Muscle Group / Lift" color={colorCodes.primary}/>
                                {
                                    
                                    allWorkouts.filter((item) => {
                                        return !workoutNamesList.includes(item.name)
                                    }).map((item) => {
                                        return <Picker.Item color={colorCodes.primary} label={item.name.slice(0,1).toUpperCase() + item.name.slice(1)} value={item}/>
                                    })
                                }

                                    
                            </Picker>
                        </View>
                    :
                        currentAction == "ADD" ? setCurrentAction(null) : null

                }


                <View style={[globals.paddingTop,globals.flex,globals.flexRow,{marginBottom:20}]}>
                    <IconButton 
                        mode="outlined"
                        style={[{flex:.5}]}
                        color={currentAction == "ADD" ? colorCodes.success : (workoutForTheDayFull ? colorCodes.neutral : colorCodes.primary)}
                        icon={currentAction == "ADD" && !workoutForTheDayFull ? "check" : "plus"}
                        onPress={() => {
                            (currentAction == "ADD" ? 
                                setCurrentAction(null)
                            : 
                                workoutForTheDayFull ? 
                                    Alert.alert(
                                        'New item cannot be added','Your workout for the day is full',
                                        [{text:'Ok',onPress:() => {setCurrentAction(null)}}]
                                    ) 
                                : 
                                    setCurrentAction("ADD"))
                        }}
                    />
                    <IconButton 
                        mode="outlined"
                        style={[{flex:.5}]}
                        color={currentAction == "DELETE" ? colorCodes.success : colorCodes.primary}
                        icon={currentAction == "DELETE" ? "check" : "delete"}
                        onPress={() => {
                            (currentAction == "DELETE" ? setCurrentAction(null) : setCurrentAction("DELETE"))
                        }}
                    />
                </View>
            </View>
        )
    }



    useEffect(() => {
        navigation.setOptions({
            title:`${route.params.day.day}'s Routine`
        })
    }) ; 

    return (
            <View>
                {
                    <View>
                        <FlatList
                            data={workoutForTheDay}
                            renderItem={({item,index}) => {
                                return (
                                    <View style={[{flex:1,marginLeft:20,marginRight:20,marginTop:(index == 0 ? 20 : 0)}]}>
                                        <ListItem 
                                            item={item}
                                            title={item.name.slice(0,1).toUpperCase() + item.name.slice(1)} 
                                            total={workoutForTheDay.length}
                                            index={index}
                                            left={
                                                    (
                                                        item.type === "sbd" ? 
                                                            {
                                                                icon:(currentAction === "DELETE" ? 'delete' : `alpha-${item.name.slice(0,1)}-circle-outline`),      
                                                                color:colorCodes.primary,
                                                                onPress:(currentAction == "DELETE" ? popWorkout: false)
                                                            } 
                                                        : 
                                                            {
                                                                icon:(
                                                                        currentAction === null || currentAction === "ADD"? 
                                                                            `alpha-a-circle-outline`
                                                                        :
                                                                        (
                                                                            currentAction === "DELETE" ? 
                                                                                `delete`
                                                                            : 
                                                                                `swap-vertical` 
                                                                    
                                                                        )
                                                                    ),         
                                                                color:colorCodes.primaryLighter, 
                                                                onPress:(currentAction == "DELETE" ? popWorkout: false)
                                                            } 
                                                    )
                                            }
                                            style={[( item.type === "sbd" ? colors.colorPrimary : colors.colorPrimaryLighter )]}
                                        />
                                    </View>
                                )
                            }}
                            keyExtractor={(item,index) => `${index}`}
                            ListFooterComponent={ActionButtons}
                        />
                    </View>
                }
            </View>
    ) ; 
 

}
