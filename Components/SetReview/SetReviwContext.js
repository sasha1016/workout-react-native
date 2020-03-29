imort React from 'react' ; 

export const setReviewContext = React.createContext({
    setReview:{
        completedAsPlanned:true,
        setBreakdown:null,
        technique:0,
        rating:0,
    }
})