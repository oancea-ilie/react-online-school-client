import React, { useEffect, useContext } from "react";
import Api from "../api"

import { Link } from "react-router-dom";
import { Context } from "./Context";

import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default ()=>{

    const[user,setUser] = useContext(Context);

    useEffect(()=>{

        if(user){
             Cookies.set("authentificatedUser",JSON.stringify(user));
        }
    },[user]);


    return (
        <>
            {
                user
                ?<header>
                    <Link to={"/"} className="brand">Courses</Link>
                    <section className="logsection">
                            <p>Hi, {user.email}</p>
                            <Link to={"/sign-out"} className="home-logout-buton">Log Out</Link>
                    </section>
                </header>
                :<header>
                      <Link to={"/"} className="brand">Courses</Link>
                    <section className="logsection">
                             <Link to={"/register"} className="home-logout-buton">Register</Link>
                             <Link to={"/login"} className="home-logout-buton">Log In</Link>
                    </section>

                </header>
                    
                
            }
        </>
    );
}