import React, { useEffect, useState } from "react";
import Api from "../api"
import { Link } from "react-router-dom";


export default ()=>{

    let [courses, setCourses] = useState([]);

    let api = new Api();

    let allCourses = async()=>{
        let rez = await api.getAll();

        if(rez != 0){
            setCourses(rez);
        }
    }

    useEffect(()=>{
        allCourses();
    },[]);


    return (
        <main className="home-main">
            {
                courses.map(e=>{ 
                    return<Link key={e.id} to={`/view-course/${e.id}`} className="home-card">
                        <p className="home-course">Course</p>
                        <h3 className="courseName">{e.name}</h3>
                    </Link>
                })
            }
            <Link to={"/add-course"} className="home-card-add">
                <i className="fas fa-plus"></i>
                <p className="new-course">New Course</p>
            </Link>
        </main>
    );
}