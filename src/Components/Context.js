import React, { createContext, useState, useEffect } from "react";

import Cookies from'js-cookie';

export const Context = createContext();

const UserProvider=({children})=>{

    const [user, setUser] = useState(undefined);
    
    useEffect(() => {
      
        if(Cookies.get('authentificatedUser')){

            setUser(JSON.parse(Cookies.get('authentificatedUser')));
        }
     
    }, []);

    return(
        <Context.Provider value={[user,setUser]}>{children}</Context.Provider>
    )
    
}




export default UserProvider;