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
    started:false,
    startedAt:null,
    endedAt:null,
    id:null,
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
    rest:{
        status:false,
        duration:0,
        timeStarted:0,
    },
    date:date,

}

const INITIAL_LISTS_STATE = {
    sets:[],
    exercises:[],
    programs:[]
}

export const WorkoutContext = createContext({}); 

export function WorkoutContextProvider(props) {
    const [workout,setWorkout] = useState(INITIAL_WORKOUT_STATE) ; 
    const [exercise,setExercise] = useState(INITIAL_EXERCISE_STATE) ; 
    const [set,updateSet] = useState(INITIAL_SET_STATE) ;

    const [routineForTheDay,setRoutineForTheDay] = useState(
            {
                sets:[{
                    review:{
                        date:"",
                        timeTaken:0,
                        technique:0,
                        rating:0
                    },
                    completed:false
                }],
                programs:[{
                    review:{
                        timeTaken:0
                    },
                    state:{
                        completed:false,
                        timeTaken:0,
                        exercisesRemaining:0
                    }
                }],
                exercises:[{
                    review:{
                        timeTaken:0
                    },
                    state:{
                        completed:false,
                        timeTaken:0,
                        exercisesRemaining:0
                    }
                }]
            }
        ) ; 
    var [completed,setCompleted] = useState(INITIAL_LISTS_STATE) ;

    const [setsCompleted,setSetsCompleted] = useState([]) ; 
    const [exercisesCompleted,setExercisesCompleted] = useState([]) ; 
    const [progrmasCompleted,setProgramsCompleted] = useState([]) ; 


    React.useEffect(() => {
        var sets = [] ; 
        routineForTheDay.sets.map((set) => {
            (set.completed ? sets.push(set._id) : false)
        });   
        setSetsCompleted([...sets])
    },[routineForTheDay.sets]); 

    React.useEffect(() => {
        var exercises = [] ; 
        routineForTheDay.exercises.map((exercise) => {
            (exercise.state.completed ? exercises.push(exercise._id) : false)
        });   
        setExercisesCompleted([...exercises]); 
    },[routineForTheDay.exercises]); 

    React.useEffect(() => {
        var programs = [] ; 
        routineForTheDay.programs.map((program) => {
            (program.state.completed ? programs.push(program._id) : false)
        });   
        setProgramsCompleted([...programs]) ; 
    },[routineForTheDay.programs]); 



    const createRoutineTracker = (dayRoutine) => {

        var programs = [] ; 
        var exercises = [] ; 
        var sets = [] ; 

        const TO_ADD = {
            PROGRAMS:{
                review:{
                    timeTaken:0
                },
                state:{
                    completed:false,
                    timeTaken:0,
                    exercisesRemaining:0
                }
                
            },
            EXERCISES:{
                review:{
                    timeTaken:0,
                },
                state:{
                    completed:false,
                    setsRemaining:0
                }
            },
            SETS:{
                review:{
                    date:"",
                    timeTaken:0,
                    technique:0,
                    rating:0
                },
                completed:false
            }
        }

        dayRoutine.map((program) => {
            program.toComplete.map((exercise) => {
                exercise.sets.map((set) => {
                    sets = [...sets, {...TO_ADD.SETS,_id:set._id}] ; 
                }) ;
                TO_ADD.EXERCISES.state.setsRemaining = exercise.sets.length ; 
                exercises = [...exercises, {_id:exercise._id,...TO_ADD.EXERCISES}] ;
            }) ; 
            TO_ADD.PROGRAMS.state.exercisesRemaining = program.toComplete.length ; 
            programs = [...programs, {_id:program._id,...TO_ADD.PROGRAMS}] ; 
        });
        setRoutineForTheDay({sets,exercises,programs}) ; 
    }

    const findAndReplaceInRoutine = (property,toFind,replace,where) => {
        var list ; 

        var copy = list ; 

        routineForTheDay[where].map((item,index) => {
            item[property] == toFind ? copy[index] = replace : null ; 
        }) ; 
        
        setRoutineForTheDay({[where]:copy,...routineForTheDay})
    }

    
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

    
    const startExercise = (id) => {
        let startedAt = (new Date).getTime() ; 
        setExercise({endedAt:null,startedAt:startedAt,started:true,id:id}) ; 
    } 

    const endExercise = (id) => {
        let timeTaken = Math.ceil(((new Date).getTime() - exercise.startedAt) / 1000) ; 
        let exercises = routineForTheDay.exercises ; 
        console.warn("exercise ended") ; 

        routineForTheDay.exercises.map((exercise,index) => {
            exercise._id === id ? exercises[index] = {review:{timeTaken},state:{completed:true,setsRemaining:0}} : null 
        }); 

        setRoutineForTheDay({exercises:exercises,...routineForTheDay}) ; 
        setExercise(INITIAL_EXERCISE_STATE); 

    }

    const endSet = (id,review) => {
        var sets = [...routineForTheDay.sets];

        routineForTheDay.sets.map((set,index) => {
            set._id === id ? sets[index] = {...set,review,completed:true} : null ; 
        }) ; 

        var exercises = [...routineForTheDay.exercises] ;
        
        var exerciseEnded = false ; 

        exercises.map((e,index) => {
            if(e._id === exercise.id) {
                let exerciseSetBelongsTo = exercises[index] ; 

                if(exerciseSetBelongsTo.state.setsRemaining === 1) {
                    endExercise(exercise.id,sets) ; 
                    exerciseEnded = true ; 
                } else {
                    exerciseSetBelongsTo = {
                        ...exerciseSetBelongsTo,
                        state:{
                            ...exerciseSetBelongsTo.state,
                            setsRemaining:(exerciseSetBelongsTo.state.setsRemaining - 1)
                        }
                    } ; 
                    exercises[index] = exerciseSetBelongsTo ;
                }
            }

        }); 

        !exerciseEnded ? setRoutineForTheDay({...routineForTheDay,exercises,sets}) : setRoutineForTheDay({...routineForTheDay,sets}) ;   

    }

    const value = {
        workout,
        exercise,
        set,
        routineForTheDay,
        reducers:{
            workout:{
                set:setWorkout
            }, 
            exercise:{
                set:setExercise,
                start:startExercise, 
                end:endExercise,
                updateSetStatus,
            }, 
            set:{
                set:updateSet,
                end:endSet, 
            }, 
            routineTracker:{
                set:createRoutineTracker
            }
        }, 
        completed:{
            sets:setsCompleted,
            exercises:exercisesCompleted,
            programs:progrmasCompleted
        }
    } ; 


    return (
        <WorkoutContext.Provider value={value}>
            {props.children}
        </WorkoutContext.Provider>
    )
}