import React,{createContext,useState} from 'react' ;
import moment from 'moment' ;

const day = moment().format("dddd").toLowerCase() ; 
const date = moment().format() ; 

const INITIAL_SET_STATE = {
    completed:false,
    timeTaken:0,
    startedTime:0,
    started:false,  
    paused:false,
}

const INITIAL_EXERCISE_STATE = {
    setStatuses:[],
    timeTaken:0,
    started:false, // flag
}

const INITIAL_WORKOUT_STATE = {
    skipped:false,
    started:false,
    timeStarted:null,
    day:day,
    paused:{
        status:false,
        total:0,
        started:0,
    },
    date:date,

}

export const WorkoutContext = createContext({}); 

export function WorkoutContextProvider(props) {
    const [workout,setWorkout] = useState(INITIAL_WORKOUT_STATE) ; 
    const [exercise,setExercise] = useState(INITIAL_EXERCISE_STATE) ; 
    const [set,updateSet] = useState(INITIAL_SET_STATE) ; 

    
    const updateSetStatus = (setId, skipped = false, reason = "") => {
        const sets = exercise.setStatuses.filter(set => set._id !== setId) ; 

        const set = exercise.setStatuses.find(set => set._id === setId) ;  

        if(!skipped) {
            set.skipped = false, set.completed = true ; 
        }
        else {
            set.skipped = true, set.completed = false, set.reason = reason ; 
        }

        setExercise({...exercise,setSatuses:[...sets,set]});

        (
            exercise.setStatuses.find(set => set.completed === null) === undefined ? 
                setExercise({...exercise,completed:true})
            :   null
        )
    }

    const value = {
        workout,
        exercise,
        set,
        reducers:{
            workout:{
                set:setWorkout
            }, 
            exercise:{
                set:setExercise,
                updateSetStatus
            }, 
            set:{
                set:updateSet
            }
        }
    } ; 


    return (
        <WorkoutContext.Provider value={value}>
            {props.children}
        </WorkoutContext.Provider>
    )
}