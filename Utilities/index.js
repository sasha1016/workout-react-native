import moment from 'moment' ; 


export const capitalize = (word : String) => {
    return `${word.slice(0,1).toUpperCase()}${word.slice(1)}`
}

export const getDateTime = () => {
    return moment().format() ; 
}

export const displayTime = (time,withDistinction = true) => {
    return moment(time).format(`hh:mm ${withDistinction ? 'a' : ''}`)
}

export const displayUnixTime = (time,withDistinction = true) => {
    return moment(time).format(`hh:mm ${withDistinction ? 'a' : ''}`)
}

export const getSecondsElapsed = (from = 0) => {
    return (Math.ceil(((new Date).getTime() - from) / 1000)) ; 
}
export function getCurrentEpoch() {
    return (new Date).getTime() ; 
}