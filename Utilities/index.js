import moment from 'moment' ; 


export const capitalize = (word : String) => {
    return `${word.slice(0,1).toUpperCase()}${word.slice(1)}`
}

export const getDateTime = () => {
    return moment().format() ; 
}
