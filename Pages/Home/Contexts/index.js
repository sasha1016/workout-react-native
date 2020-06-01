import React,{createContext,useState} from 'react' ;
import moment from 'moment' ;
import {API,V1,TEST} from '../../../config/api'
const axios = require('axios') ; 
const TODAY = moment().format("dddd").toLowerCase() ; 
const date = moment().format() ; 


const INITIAL_WORKOUT_STATE = {
    skipped:false,
    started:false,
    timeStarted:null,
    day:TODAY,
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
    ended:false,
    endedAt:null,
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
            endedAt:null,
            reviewSubmitted:false,
            timeTaken:0,
            startedAt:null,
            started:false,  
            paused:false,
            pausedAt:null,
            pausedTime:0,
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


const uploadReviews = (reviews) => {
    axios.post(API.V1+V1.REVIEWS.ADD, {
        reviews:reviews,
        user:TEST.USER
    }).then((response) => {
    }).catch((error) => {
        console.warn(error) ; 
    })
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

    const [setsSkipped,setSetsSkipped] = useState([]) ; 
    const [exercisesSkipped,setExercisesSkipped] = useState([]) ; 
    const [programsSkipped,setProgramsSkipped] = useState([]) ; 

    const [allSetsAttempted,setAllSetsAttempted] = useState(false) ; 


    React.useEffect(() => {
        var sets = [] ; 
        var setsAttempted = [] ; 
        routineForTheDay.sets.map((set) => {
            (set.completed ? sets.push(set._id) : false) ; 
            (set.completed || set.skipped ? setsAttempted.push(set._id) : false)
        });   
        setSetsCompleted([...sets])  ; 

        setAllSetsAttempted(routineForTheDay.sets.length === setsAttempted.length) ; 
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
                },
                completed:false,
                exercisesRemaining:0,
                skipped:false,
                date:date
            },
            EXERCISES:{
                review:{
                    timeTaken:0,
                },
                completed:false,
                skipped:false,
                setsRemaining:0,
                date:date
            },
            SETS:{
                review:{
                    timeTaken:0,
                    technique:0,
                    rating:0
                },
                date:date,
                completed:false,
                skipped:false,
            }
        }

     dayRoutine.forEach((element) => {
            var programDaySelected = element.userProgram.daysSelectedOfTheProgram.filter((day) => {
                return (day.userDaySelected === TODAY)
            }) ; 
            
            programDaySelected = programDaySelected.length !== 0 ? programDaySelected[0].programDaySelected : `` ; 
            
            let day = element.program.days.filter((day) => {
                return (programDaySelected === day.name && element.userProgram.currentWeek === day.week)
            }) ; 
            
            day = day.length !== 0 ? day[0] : {toComplete:[]}  ; 
            
            var program = element.program ; 

            day.toComplete.map((exercise) => {
                exercise.sets.map((set) => {
                    sets = [...sets, {
                        ...TO_ADD.SETS,
                        _id:set._id,
                        exercise_id:exercise._id,
                        program_id:program._id,
                        routineElementID:element._id,
                    }] ; 
                }) ;
                TO_ADD.EXERCISES.setsRemaining = exercise.sets.length ; 
                exercises = [...exercises, {
                    _id:exercise._id,
                    program_id:program._id,
                    routineElementID:element._id,
                    ...TO_ADD.EXERCISES
                }] ;
            }) ; 
            TO_ADD.PROGRAMS.exercisesRemaining = day.toComplete.length ; 
            programs = [...programs, {
               _id:program._id,
               userProgramID:element.userProgram._id,
               lastDayOfWeek:day.lastDayOfWeek,
               routineElementID:element._id,
               ...TO_ADD.PROGRAMS
            }] ; 
        });
        setRoutineForTheDay({sets,exercises,programs}) ;
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

    function _updateUserProgramCurrentWeek(userProgramID) {
        axios.post(API.V1+V1.USER.PROGRAMS.UPDATE.CURRENT_WEEK,{
            id:userProgramID,
            user:TEST.USER,
        }).then(() => {
            return true
        }).catch((error) => {
            throw new Error(error.response.message)
        })
    }

    const _endProgram = (programID,exercises,sets) => {
        let timeTaken = Math.ceil(((new Date).getTime() - currentProgram.startedAt) / 1000) ; 

        let programs = [...routineForTheDay.programs] ; 

        programs.forEach((program,index) => {
            if(program._id === programID) {
                programs[index] = {...program,review:{timeTaken},completed:true,exercisesRemaining:0} ; 
                if (program.lastDayOfWeek === true) _updateUserProgramCurrentWeek(program.userProgramID) ; 
            }
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

    const finishSet = () => {
        let timeTaken = Math.ceil( ((new Date).getTime() - currentSet.startedAt) / 1000) - (currentSet.pausedTime); 
        setCurrentSet({...currentSet,timeTaken,completed:true}) ; 
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

    const pauseSet = () => {
        let pausedAt = (new Date).getTime() ; 
        setCurrentSet({...currentSet,pausedAt,paused:true}) ; 
    }

    const playSet = () => {
        let pausedTime = Math.ceil( ( (new Date).getTime() - (currentSet.pausedAt) ) / 1000 ) ;  ; 
        setCurrentSet({...currentSet,pausedAt:null,paused:false,pausedTime:pausedTime}) ; 
    }

    const skip = (aspect,id,reasons) => {
        var key = `_id` ;
        var sets = [...routineForTheDay.sets] ; 
        var exercises = [...routineForTheDay.exercises] ; 
        var programs = [...routineForTheDay.programs] ; 

        aspect = aspect.toUpperCase() ; 

        var programsSkippedCopy = programsSkipped ; 
        var exercisesSkippedCopy = exercisesSkipped; 
        var setsSkippedCopy = setsSkipped; 

        switch(aspect) {
            case "PROGRAM":
                programs.map((program,index) => {
                    if(program[key] === id && !program.skipped && !program.completed ) {
                        programs[index] = {...program, skipped:true,reasons} ; 
                        programsSkippedCopy.push(program._id) ; 
                    } 
                }) ;
                setProgramsSkipped(programsSkippedCopy);
                key = `program_id` ; 
            case "EXERCISE":
                exercises.map((exercise,index) => {
                    if(exercise[key] === id && !exercise.skipped && !exercise.completed) {
                        exercises[index] = {...exercise, skipped:true,reasons} ; 
                        exercisesSkippedCopy.push(exercise._id) ; 
                    } 
                }) ;
                setExercisesSkipped(exercisesSkippedCopy) ; 
                key = (key === `_id` ? `exercise_id` : key);
            default:
                sets.map((set,index) => {
                    if(set[key] === id && !set.skipped && !set.completed) {
                        sets[index] = {...set, skipped:true,reasons} ; 
                        setsSkippedCopy.push(set._id) ; 
                    } 
                }) ;
                setSetsSkipped(setsSkippedCopy) ;  
                break  ;
        }
        setRoutineForTheDay({sets,exercises,programs}) ; 

    }

    const _skipAll = (reasons,callback) => {
        routineForTheDay.programs.map((program) => {
            program.completed === false ? skip("PROGRAM",program._id,reasons) : false ; 
        })

        callback() ; 
    }

    
    function _createReviewsToPost(aspect) {

        const aspectsRemaining = {'EXERCISE':'setsRemaining','PROGRAM':'exercisesRemaining'} ; 
        let aspectsChildren = aspectsRemaining[aspect];

        let aspectReviews = routineForTheDay[`${aspect.toLowerCase()}s`].map((item) => {
            
            let review = {aspect:`${aspect}`, [`${aspect.toLowerCase()}ID`]:item._id,date:item.date}  
            let skipped = item.skipped, itemReview = item.review ; 
            var remaining ; 

            if(aspect === `EXERCISE`) {
                currentExercise._id === item._id ? remaining = currentExercise[aspectsChildren] : item[aspectsChildren] ; 
            } else if (aspect === `PROGRAM`) {
                currentProgram._id === item._id ? remaining = currentProgram[aspectsChildren] : item[aspectsChildren] ; 
            }

            if(skipped) {
                review = {
                    ...review,
                    review:{skipped,reasons:item.reasons}
                }; 
                aspect === `SET` ? null : review.review[aspectsChildren] = remaining 
            } else {
                review = {
                    ...review,
                    itemReview
                }
            }
            delete review["completed"] ; 
            return (review) ; 
        })  ; 

        return aspectReviews ; 

    }

    React.useEffect(() => {
        if(workout.ended) {
            let programReviews = _createReviewsToPost(`PROGRAM`) ; 
            let setReviews = _createReviewsToPost(`SET`);
            let exerciseReviews = _createReviewsToPost(`EXERCISE`) ; 

            uploadReviews([...exerciseReviews,...programReviews,...setReviews]) ; 
        }
    },[workout.ended]) ; 

    const _endWorkout = () => {
        setWorkout({...workout,ended:true,endedAt:(new Date).getTime()})            
    }

    const handleEndWorkout = (reasons) => {
        
        if(allSetsAttempted) {
            _endWorkout() ; 
        } else {
            _skipAll(reasons,_endWorkout) ; 
        }
    }


    const value = {
        workout,
        routineForTheDay,
        reducers:{
            workout:{
                set:setWorkout,
                end:handleEndWorkout,
            }, 
            routineTracker:{
                set:createRoutineTracker,
                skip:skip
            },
            current:{
                set:{
                    start:startSet,
                    finish:finishSet,
                    end:endSet, 
                    pause:pauseSet,
                    play:playSet
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
            programs:programsCompleted,
        },
        skipped:{
            programs:programsSkipped,
            exercises:exercisesSkipped,
            sets:setsSkipped
        }, 
        information:{
            workout:{
                mutable:(workout.started^workout.ended)
            },
            allSetsAttempted
        }
        
    } ; 


    return (
        <WorkoutContext.Provider value={value}>
            {props.children}
        </WorkoutContext.Provider>
    )
}