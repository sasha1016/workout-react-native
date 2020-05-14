import React,{useContext} from 'react' ; 
import { 
    View,
    Text 
} from 'react-native' ; 

import  {globals,colorCodes,text,colors} from '../../../Styles/globals.js';
import  CustomListItem from '../../../Components/ListItem2';

import {WorkoutContext} from '../Contexts/index' ; 

import ActionBar from '../Components/ActionBar' ; 
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import {Title} from 'react-native-paper' ; 

import ReasonForSkipping from '../Components/SkippingReasonForm';



export default function Exercise({navigation,route}) {

    const state = useContext(WorkoutContext) ;
    const [intentToSkip,setIntentToSkip] = React.useState(false);   

    React.useEffect(() => {
        navigation.setOptions({
            title:route.params.exercise.name,
            headerRight:() => (
                                <TouchableWithoutFeedback onPress={() => setIntentToSkip(!intentToSkip)}>
                                    <Title style={[text.bold,text.h4,colors.colorSecondary,{paddingRight:20}]}>
                                        Skip
                                    </Title>
                                </TouchableWithoutFeedback>
                            )
        }) ; 
    }) ; 

    const goToSet = (set,weight,setNo,totalSets) => {
        navigation.navigate('Set',{set,weight,setNo,totalSets,exercise:route.params.exercise,program:route.params.program}) ; 
    }

    return (
        <React.Fragment>
            <ReasonForSkipping visible={intentToSkip} toggler={setIntentToSkip} aspect="exercise"/>
            <View style={[globals.flex,globals.listContainer]}>
                    {
                            route.params.exercise.sets.map((set,index) => {
                                let weight = ( route.params.exercise.oneRM ? `${Math.floor(route.params.exercise.oneRM * (parseInt(set.percentage)/100))} kg`: `${set.percentage}% Intensity`) ; 
                                let completed = state.completed.sets.includes(set._id) ; 
                                return (
                                    <CustomListItem
                                        title={`Set ${index + 1}`} 
                                        desc={[`${set.reps} Reps @ ${weight}`]}
                                        mode="NAV"
                                        icon={completed ? "check" : "chevron-right"}
                                        iconStyle={completed ? {color:colorCodes.success} : null}
                                        key={set._id}
                                        onPress={() => goToSet(set,weight,index + 1, route.params.exercise.sets.length) }
                                    />
                                )
                            })
                    }

            </View>
            <ActionBar/>
        </React.Fragment>
    ) ; 

}



