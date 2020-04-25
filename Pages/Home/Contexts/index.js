import React,{createContext,useState} from 'react' ; 

const INITIAL_WORKOUT_STATE = {
    skipped:false,
    started:false,
    timeStarted:null,
    day:null,
    date:null,
}

export const WorkoutContext = createContext({}); 

export function WorkoutContextProvider(props) {
    const [workout,setWorkout] = useState(INITIAL_WORKOUT_STATE) ; 

    return (
                <WorkoutContext.Provider value={{data:workout,set:setWorkout}}>
                    {props.children}
                </WorkoutContext.Provider>
    )
}