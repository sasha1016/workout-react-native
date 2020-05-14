import React,{createContext,useState} from 'react' ;
import moment from 'moment' ;

const day = moment().format("dddd").toLowerCase() ; 
const date = moment().format() ; 


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

const INITIAL_STATES = {
    CURRENT:{
        PROGRAM:{   
            started:false,
            startedAt:null,
            endedAt:null,
            exercisesRemaining:null,
            _id:null
        }, 
        SET:{
            _id:null,
            completed:false,
            reviewSubmitted:false,
            endedAt:null,
            startedAt:null,
            started:false,  
            paused:false,
        }, 
        EXERCISE:{
            started:false,
            startedAt:null,
            endedAt:null,
            setsRemaining:null,
            _id:null            
        }
    }, 
    ROUTINE_FOR_THE_DAY:{
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
}

export const WorkoutContext = createContext({}); 

export function WorkoutContextProvider(props) {
    const [workout,setWorkout] = useState(INITIAL_WORKOUT_STATE) ; 

    const [currentProgram,setCurrentProgram] = useState(INITIAL_STATES.CURRENT.PROGRAM) ; 
    const [currentExercise,setCurrentExercise] = useState(INITIAL_STATES.CURRENT.EXERCISE) ; 
    const [currentSet,setCurrentSet] = useState(INITIAL_STATES.CURRENT.SET) ; 


    const [routineForTheDay,setRoutineForTheDay] = useState(INITIAL_STATES.ROUTINE_FOR_THE_DAY) ; 

    const [setsCompleted,setSetsCompleted] = useState([]) ; 
    const [exercisesCompleted,setExercisesCompleted] = useState([]) ; 
    const [programsCompleted,setProgramsCompleted] = useState([]) ; 


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
            (exercise.completed ? exercises.push(exercise._id) : false)
        });   
        setExercisesCompleted([...exercises]); 
    },[routineForTheDay.exercises]); 

    React.useEffect(() => {
        var programs = [] ; 
        routineForTheDay.programs.map((program) => {
            (program.completed ? programs.push(program._id) : false)
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
                    timeTaken:0,
                    skipped:false,
                    date:null
                },
                completed:false,
                exercisesRemaining:0,
                skipped:false
            },
            EXERCISES:{
                review:{
                    timeTaken:0,
                    skipped:false,
                    date:null
                },
                completed:false,
                skipped:false,
                setsRemaining:0
            },
            SETS:{
                review:{
                    date:null,
                    timeTaken:0,
                    technique:0,
                    rating:0
                },
                completed:false,
                skipped:false,
            }
        }

        dayRoutine.map((program) => {
            program.toComplete.map((exercise) => {
                exercise.sets.map((set) => {
                    sets = [...sets, {...TO_ADD.SETS,_id:set._id,exercise_id:exercise._id,program_id:program._id}] ; 
                }) ;
                TO_ADD.EXERCISES.setsRemaining = exercise.sets.length ; 
                exercises = [...exercises, {_id:exercise._id,program_id:program._id,...TO_ADD.EXERCISES}] ;
            }) ; 
            TO_ADD.PROGRAMS.exercisesRemaining = program.toComplete.length ; 
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


    const _startProgram = (programID, startedAt) => {
        let exercisesRemaining = routineForTheDay.programs.filter((p) => {return p._id === programID})[0].exercisesRemaining; 
        setCurrentProgram({
            ...currentProgram,
            startedAt:startedAt,
            started:true,
            _id:programID, 
            exercisesRemaining
        }) ;
    }

    const _endProgram = (programID,exercises,sets) => {
        let timeTaken = Math.ceil(((new Date).getTime() - currentProgram.startedAt) / 1000) ; 

        let programs = [...routineForTheDay.programs] ; 

        programs.map((program,index) => {
            program._id === programID ? programs[index] = {...program,review:{timeTaken},completed:true,exercisesRemaining:0} : false
        }) ; 

        setCurrentProgram(INITIAL_STATES.CURRENT.PROGRAM) ;
        setRoutineForTheDay({programs,exercises,sets});
    }

    
    const _startExercise = (exerciseID,programID,startedAt = false) => {
        !startedAt ? startedAt = (new Date).getTime() : false ; 

        let exercise = routineForTheDay.exercises.filter((e) => {return e._id === exerciseID})[0]; 

        setCurrentExercise({
            ...currentExercise,
            startedAt:startedAt,
            started:true,
            _id:exerciseID,
            setsRemaining:exercise.setsRemaining
        }) ;


        !currentProgram.started ? _startProgram(programID,startedAt) : false ; 
    } 


    const _endExercise = (id,sets) => {
        let timeTaken = Math.ceil(((new Date).getTime() - currentExercise.startedAt) / 1000) ; 
        let exercises = [...routineForTheDay.exercises] ; 

        //mapping through exercises to update the status 

        exercises.map((exercise,index) => {
            if(exercise._id === id) {{
                exercises[index] = {...exercise,review:{timeTaken},completed:true,setsRemaining:0} ; 
            }}
        }); 


        let exercisesRemaining = currentProgram.exercisesRemaining;

        if(exercisesRemaining === 1) { // last exercise of the set 
            _endProgram(currentProgram._id,exercises,sets) ; 
        } else {
            setCurrentProgram({...currentProgram,exercisesRemaining:exercisesRemaining - 1}) ;
            setRoutineForTheDay({...routineForTheDay,exercises,sets})        
        }

        setCurrentExercise(INITIAL_STATES.CURRENT.EXERCISE) ; 

    }


    const startSet = (setID,exerciseID,programID) => {
        let startedAt = (new Date).getTime() ; 
        setCurrentSet({
            ...currentSet,
            started:true,
            _id:setID,
            startedAt,
        });

        (!currentExercise.started ? _startExercise(exerciseID,programID,startedAt) : null)
    }

    const endSet = (id,review) => {
        var sets = [...routineForTheDay.sets];

        routineForTheDay.sets.map((set,index) => {
            set._id === id ? sets[index] = {...set,review,completed:true} : null ; 
        }) ; 

        let setsRemaining = currentExercise.setsRemaining ; 

        if(setsRemaining === 1) { // last set of the exercise 
            _endExercise(currentExercise._id,sets) ; 
        } else {
            setCurrentExercise({...currentExercise,setsRemaining:setsRemaining - 1}) ;
            setRoutineForTheDay({...routineForTheDay,sets})
        }

        setCurrentSet(INITIAL_STATES.CURRENT.SET) ; 

    }

    const skip = (aspect,id,reason) => {
        var key = `_id` ;
        var sets = [...routineForTheDay.sets] ; 
        var exercises = [...routineForTheDay.exercises] ; 
        var programs = [...routineForTheDay.programs] ; 

        switch(aspect) {
            case "PROGRAM":
                programs.map((program,index) => {
                    program[key] === id ? program[index] = {...program, skipped:true,reason} : false 
                }) ;
                key = `program_id` ; 
            case "EXERCISE":
                exercises.map((exercise,index) => {
                    exercise[key] === id ? exercise[index] = {...exercise, skipped:true,reason} : false 
                }) ;
                key = (key === `_id` ? `exercise_id` : key);
            default:
                sets.map((set,index) => {
                    set[key] === id ? set[index] = {...set, skipped:true,reason} : false 
                }) ; 
                break  ;
        }

        setRoutineForTheDay({sets,exercises,programs}) ; 

    }


    const value = {
        workout,
        routineForTheDay,
        reducers:{
            workout:{
                set:setWorkout
            }, 
            routineTracker:{
                set:createRoutineTracker,
                skip:skip
            },
            current:{
                set:{
                    start:startSet,
                    end:endSet, 
                }
            }
        }, 
        current:{
            set:currentSet,
            exercise:currentExercise,
            program:currentProgram
        },
        completed:{
            sets:setsCompleted,
            exercises:exercisesCompleted,
            programs:programsCompleted
        }
    } ; 


    return (
        <WorkoutContext.Provider value={value}>
            {props.children}
        </WorkoutContext.Provider>
    )
}