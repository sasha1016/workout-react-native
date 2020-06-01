import React from 'react' ; 
import Providers from './Contexts' ; 
import Main from './Main'

function Layout() {

    return (
        <Providers>
            <Main/>
        </Providers>
    ) 
}
export default Layout ; 
