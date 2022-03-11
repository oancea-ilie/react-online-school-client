import React, { useEffect, useState, useContext} from "react";
import Api from "../api"
import { Link, useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import { Context } from "./Context";


export default ()=>{

    const [user,setUser] = useContext(Context);

    let [name, setName] = useState("");

    let [description, setDescription] = useState("");

    let [time, setTime] = useState("");

    let [materials, setMaterials] = useState("");

    let [studentId, setStudentId] = useState(undefined);

    let [students, setStudents] = useState([]);

    let [err, setErr] = useState([]);

    const history = useHistory();

    let api = new Api();

    let check=()=>{
        setErr([]);

        if(name ==""){
            setErr((prev)=>{
                return [...prev, "name required!"];
            });
        }
        if(description ==""){
            setErr((prev)=>{
                return [...prev, "description required!"];
            });
        }
        if(time == ""){
            setErr((prev)=>{
                return [...prev, "time required!"];
            });
        }
        if(materials == ""){
            setErr((prev)=>{
                return [...prev, "materials required!"];
            });
        }
    }

   let onChange=(e)=>{
       e.preventDefault();

       let obj = e.target;

       if(obj.classList.contains("course-title")){
           setName(obj.value);
       }else if(obj.classList.contains("course-description")){
            setDescription(obj.value);
        }else if(obj.classList.contains("course-materials")){
            setMaterials(obj.value);
        }else if(obj.classList.contains("course-time")){
            setTime(obj.value);
        }
   }

   let add = async(e)=>{
       check();

       if(err.length == 0 ){
           let obj = {
               name: name,
               description: description,
               time : time,
               materials : materials,
               created_by: studentId
           };

           let api = new Api();

           let rez = await api.add(obj);

           if(rez =="success"){
                history.push("/");
           }else{
               alert(rez.message);
           }
       }else{
           err.forEach(e=>alert(e));
       }
   }

   let populateStudents= async()=>{

    try{
        let all = await api.getAllStudents();

        if(all !=0){
            setStudents(all);
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

    useEffect(()=>{
        populateStudents();
    },[]);


    useEffect(()=>{
        handleIdStudent();
    },[students])

    useEffect(()=>{
        check();

    },[name, description, time, materials]);

    return (
        <main className="course-create-main">
            <h1>Create Course</h1>

            <section className="course-create-grid" onChange={onChange}>

                <section className="course-create-details">
                    <p>Course Title</p>
                    <input type="text" className="course-title"/>

                    <h5>By Joe Smith</h5>

                    <p>Course Description</p>
                    <textarea cols="30" rows="10" className="course-description"></textarea>
                </section>

                <section className="course-create-time-materials">
                    <p>Estimated Time</p>
                    <input type="text" className="course-time"/>
                    <p>Materials Needed</p>
                    <textarea cols="30" rows="10" className="course-materials"></textarea>
                </section>

                <section className="course-create-buttons">  
                    <a href="#" onClick={add} className="create-course">Create Course</a>
                    <Link to={"/"} className="cancel-course">Cancel</Link>
                </section>
            </section>
        </main>
    );
}