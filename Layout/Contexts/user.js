import React from 'react' ; 

export const UserContext = React.createContext({}) ; 

export function UserContextProvider(props) {
    const [user,setUser] = React.useState({uid:false}) ;

    function _setUser(data) {
        setUser(data)
    }

    const value = {
        data:user,
        set:_setUser
    }
    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}