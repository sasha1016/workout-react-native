import React from 'react' ;

import {
    colorCodes,
    globals,
    colors,
    text
} from '../../../../Styles/globals' 

import {
    View,
    Text
} from 'react-native'

import Divider from 'react-native-divider' 

import CustomListItem from '../../../../Components/ListItem2' 


const convertSecondsToMinutes = (seconds) => {
    return `${Math.floor(seconds / 60)} minutes and ${seconds % 60} seconds`
}

const Program = ({review}) => {
    return(
        <CustomListItem
            mode="INFO"
            title="Time Taken"
            desc={[convertSecondsToMinutes(review.timeTaken)]}
        />
    )
}

const Exercise = ({review}) => {
    return(
        <CustomListItem
            mode="INFO"
            title="Time Taken"
            desc={[convertSecondsToMinutes(review.timeTaken)]}
        />
    )
}

const Set = ({review}) => {
    let completedAsPlanned = review.completedAsPlanned ; 
    return(
        <React.Fragment>
            <CustomListItem
                mode="INFO"
                title="Time taken"
                desc={[convertSecondsToMinutes(review.timeTaken)]}
            />
            <CustomListItem
                mode="INFO"
                title="Technique rating"
                desc={[`${review.technique}`]}
            />
            <CustomListItem
                mode="INFO"
                title="Set rating"
                desc={[`${review.rating}`]}
            />
            <CustomListItem
                mode="INFO"
                title="Completed as planned"
                desc={[(completedAsPlanned ? `Yes` : `No`)]}
            />
            {
                !completedAsPlanned ? 
                    <CustomListItem
                        mode="INFO"
                        title="Completed As Planned"
                        desc={[review.setBreakdown.map((reps) => {return (`1 set of ${reps} reps`)})]}
                    />
                : 
                    null 
            }
        </React.Fragment>
    )
}

const Review = ({children}) => {
    return (
        <View>
            <Divider borderColor={colorCodes.grey} orientation="center">
                <Text style={[text.uppercase,globals.h8,colors.colorNeutral]}>
                    {`Review  `}
                </Text>   
            </Divider>
            <View>
                {children}
            </View>
        </View>
    )
}

Review.Set = Set ; 
Review.Exercise = Exercise ; 
Review.Program = Program ; 

export default Review ; 
