import React from 'react' ; 

const INITIAL_EXERCISE_STATE = {
    setStatuses:[],
    timeTaken:0,
    started:false, // flag
    skipped:false, 
    completed:false,
} ; 

export const ExerciseContext = React.createContext({}) ;  

export function ExerciseContextProvider(props) {

    const [exercise,setExercise] = React.useState(INITIAL_EXERCISE_STATE) ; 

    const updateSetStatus = (setId, skipped = false, reason = "") => {
        const sets = exercise.setStatuses.filter(set => set._id !== setId) ; 

        console.warn(setId,sets);

        // const set = exercise.setStatuses.find(set => set._id === setId) ;  

        // if(!skipped) {
        //     set.skipped = false, set.completed = true ; 
        // }
        // else {
        //     set.skipped = true, set.completed = false, set.reason = reason ; 
        // }

        // setExercise({...exercise,setSatuses:[...sets,set]});

        // (
        //     exercise.sets.find(set => set.completed === null) === undefined ? 
        //         setExercise({...exercise,completed:true})
        //     :   null
        // )
    }


    return(
        <ExerciseContext.Provider value={{data:exercise,reducers: {setData:setExercise,updateSetStatus}}}>
            {props.children}
        </ExerciseContext.Provider>
    )
}

export function exerciseContextProvider(Component) {
    return ({children,...props}) => {
        return (
            <ExerciseContextProvider>
                <Component {...props}>
                    {children}
                </Component>
            </ExerciseContextProvider>
        )
        
    }
}