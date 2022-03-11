import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "./Context";
import Cookies from "js-cookie";


export default ()=>{

    const[user,setUser] = useContext(Context);

    useEffect(()=>{

        setUser(null);

        Cookies.remove('authentificatedUser');
    },[])



    return(

        <Redirect to="/login"></Redirect>
    )
}