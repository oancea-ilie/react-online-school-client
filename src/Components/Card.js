import React, { useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom";
import Api from "../api"
import Cookies from "js-cookie";
import { Context } from "./Context";
import { useHistory } from "react-router-dom";

export default ({obj})=>{
    let id= obj[0];

    let name = obj[1];
    let created_by = obj[5];

    const [user,setUser] = useContext(Context);

    let [ students, setStudents] = useState([]);

    let [enrolments, setEnrolments] = useState([]);

    let [countCursanti, setCountCursanti] = useState(0);

    let [studentId, setStudentId] = useState(0);

    let [status, setStatus] = useState("");

    let api = new Api();

    let history = useHistory();

    let populateStudents= async()=>{

        try{
            if(user){
                let all = await api.getAllStudents(user);
                if(all.message){
                    history.push("/login")
                }
                if(all !=0){
                    setStudents(all);
                }   
            }else{
                history.push("login");
            }
        }catch(e){
            console.log(e);
        }

    }

    let populateEnrolments = async()=>{
        try{
            if(user){
                let rez = await api.getAllEnrolments(user);
                if(rez.message){
                    history.push("/login");
                }
                if(rez !=0){
                    setEnrolments(rez);
                }
            }else{
                history.push("/login");
            }
        }catch(e){
            console.log(e);
        }
    }

    let handleIdStudent=()=>{
        if(students && user){
            students.forEach((e)=>{
                if(e.email == user.email){
                    setStudentId(e.id);
                }
            });
        }
    }
    
    let handleStudentStatus=()=>{
        if(studentId){
            if(created_by == studentId){
                setStatus('owner');
            }
            else 
                if(enrolments.length>0){
                    let ok = 0;
                    enrolments.forEach((e)=>{
                        if(e.student_id == studentId && e.course_id == id){
                            ok = 1;
                            setStatus("in");
                        }
                    })
                    if(ok == 0){
                        setStatus('out');

                    }
                }
        }
    }


    let handleCursanti=()=>{
        if(enrolments){
            enrolments.forEach((e)=>{
               if(e.course_id == id){
                   setCountCursanti((prev)=>prev+1);
               } 
            });
        }
    }
    useEffect(()=>{
        populateStudents();
        populateEnrolments();
    },[]);


    useEffect(()=>{
        handleCursanti();
    },[enrolments]);

    useEffect(()=>{
        handleIdStudent();
    },[students]);

    useEffect(()=>{
        if(user){
            Cookies.set("authentificatedUser",JSON.stringify(user));
        }
    },[user]);

    useEffect(()=>{
        handleStudentStatus();
    },[studentId, enrolments])



    return(
        <>
            {
                
                 status =="owner"?<Link to={{pathname:`/view-course/${id}`, search:`${status}`}} className="home-card owner-card">
                        <div className="owner-div"> <p>Owner</p> </div>
                        <p className="home-course">Course</p>
                        {
                            countCursanti == 0?<p className="nr-cursanti-red">{countCursanti} Cursanti</p>
                            :<p className="nr-cursanti">{countCursanti} Cursanti</p>
                        }
                        <h3 className="courseName">{name}</h3>
                    </Link>
                :status =="in"?<Link to={{pathname:`/view-course/${id}`, search:`${status}`}} className="home-card in">
                        <div className="in-div"></div>
                        <p className="home-course">Course</p>
                        {
                            countCursanti == 0?<p className="nr-cursanti-red">{countCursanti} Cursanti</p>
                            :<p className="nr-cursanti">{countCursanti} Cursanti</p>
                        }
                        <h3 className="courseName">{name}</h3>
                    </Link>
                :status =="out"?<Link to={{pathname:`/view-course/${id}`, search:`${status}`}}className="home-card not-yet">
                        <div className="not-yet-div"></div>
                        <p className="home-course">Course</p>
                        {
                            countCursanti == 0?<p className="nr-cursanti-red">{countCursanti} Cursanti</p>
                            :<p className="nr-cursanti">{countCursanti} Cursanti</p>
                        }
                        <h3 className="courseName">{name}</h3>
                    </Link>: ''
            }
        </>
    )
}