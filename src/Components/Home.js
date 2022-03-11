import React, { useEffect, useState, useContext} from "react";
import Api from "../api"
import { Link } from "react-router-dom";
import Loader from "./Spinner";
import Errors from "./Errors";
import Card from "./Card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";
import { Context } from "./Context";
import { Redirect } from "react-router-dom";

export default ()=>{
    const [user,setUser] = useContext(Context);

    let [courses, setCourses] = useState([]);

    let api = new Api();

    let populateCourses = async()=>{

        try{
            let rez = await api.getAll();

            if(rez != 0){
                setCourses(rez);
            }
        }catch(e){
            console.log(e);
        }
       
    }
    
    useEffect(()=>{
        populateCourses();
    },[]);

    useEffect(()=>{
        if(user){
            Cookies.set("authentificatedUser",JSON.stringify(user));
        }
    },[user]);

    return (
        <>
            {
                user?<main className="home-main">
                    {
                        courses.map(e=>{ 
                            return <Card key={e.id} obj={[e.id, e.name, e.description, e.materials, e.time, e.created_by]}/> 
                        })
                    }

                    <Link to={"/add-course"} className="home-card-add">
                        <i className="fas fa-plus"></i>
                        <p className="new-course">New Course</p>
                    </Link>
                </main>
                : <h1 className="user-not">Trebuie sa fii logat prima data !</h1>
            }
        </>
    );
}