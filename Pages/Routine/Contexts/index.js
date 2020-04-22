import React,{useState} from 'react' ; 

export const RoutineContext = React.createContext({}) ; 

export function RoutineProvider(props) {
    const [routines,setRoutines] = useState({}) ; 

    return (
        <RoutineContext.Provider value={{data:routines,set: (newRoutines) => setRoutines(newRoutines)}}>
            {props.children}
        </RoutineContext.Provider>
    )
}