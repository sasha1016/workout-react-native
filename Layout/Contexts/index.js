import React from 'react' ; 
import { UserContextProvider, UserContext } from './user' 

export {UserContext}

export default function Providers({children}) {
    return(
        <UserContextProvider>
            {children}
        </UserContextProvider>
    )
}