import React from 'react' ; 
import Header from '../../../../../Components/ListHeader' ; 
import CustomListItem from '../../../../../Components/ListItem2' ;
import Modal from '../../../../../Components/Modal';
import {View,Text} from 'react-native' ; 


export default function RenderDay({visible,toggler,day,week,days,oneRepMaxes,userProgram}) {

    var toCompleteForTheDay = days.filter((d) => {return (d.week === week && d.name === day)})[0].toComplete ; 

    function calculateSetWeight(set,exercise1RM) {
        if(set.weightIncrement !== undefined) {
            return (`${parseFloat(exercise1RM + set.weightIncrement)} kg`) ; 
        } else {
            return ( exercise1RM ? `${Math.floor(exercise1RM * (parseInt(set.percentage)/100))} kg`: `${set.percentage}% Intensity`) ; 
        }
    }

    const RenderSets = ({sets,lift}) => {
        return(
            <React.Fragment>
                {
                    sets.map((set,index) => {
                        let setDescription ;
                        if(userProgram !== false) {
                            let oneRM = oneRepMaxes.filter((RM) => RM.name === lift.name)[0].oneRM ; 
                            setDescription = calculateSetWeight(set,oneRM)
                        } else {
                            setDescription = (set.percentage ? 
                                                    `${set.reps} Reps at  ${set.percentage}% of 1RM` 
                                                : 
                                                    `${set.reps} Reps at 1RM + ${set.weightIncrement} kg`
                                                ) ; 
                        }
                        return (
                            <CustomListItem
                                title={`Set ${index +1}`}
                                desc={[`${set.reps} Reps at ${setDescription}`]}
                                key={`${index}-lift`}
                            />
                        )
                    }) 
                }
            </React.Fragment>

        ) ;  

    }
    const RenderLifts = ({lifts}) => {
        return (
            <React.Fragment>
                {
                    lifts.map((lift) => {
                        return (
                            <View style={{marginBottom:20}}>
                                <Header title={lift.name || ""}/>
                                <RenderSets sets={lift.sets} lift={lift}/>
                            </View>
                        )
                    })
                }
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Modal title={`${day}, Week ${week + 1}`} visible={visible} toggler={toggler}>
                <View>
                    <RenderLifts lifts={toCompleteForTheDay}/>
                </View>
            </Modal>
        </React.Fragment>
    )

}