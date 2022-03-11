import React, { useEffect, useState } from "react";
import Api from "../api"
import { Link, useHistory} from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "./Spinner";
import Errors from "./Errors";
import { useLocation } from "react-router-dom";

export default ()=>{

    const search = useLocation().search.slice(1);
    
    let [name, setName] = useState("");

    let [description, setDescription] = useState("");

    let [time, setTime] = useState("");

    let [materials, setMaterials] = useState("");

    let [createdBy, setCreatedBy] = useState("");

    let [err, setErr] = useState([]);

    let {id} = useParams();

    const history = useHistory();

    let api = new Api();

    let [errors ,setErrors] = useState("");

    let [loading,setLoading] = useState(true);

    let getCourse = async(id)=>{

        let course = await api.getById(id);

        if(course.message == null){
            setName(course.name);
            setDescription(course.description);
            setMaterials(course.materials);
            setTime(course.time);

            setLoading(false);
        }else{
            setErrors(course.message);
        }
    }


    useEffect(()=>{
        getCourse(id);
    },[]);

    useEffect(()=>{
        check();
    },[name, description, time, materials, createdBy]);

    let check=()=>{
        setErr([]);

       if(name == ""){
            setErr((prev=>{
               return [...prev,"name is required" ];
          }));
       }

       if(description == ""){
            setErr((prev=>{
               return [...prev, "description is required"];
           }));
       }
       if(materials == ""){
            setErr((prev=>{
               return [...prev, "materials is required"];
           }));
       }
       if(time == ""){
            setErr((prev=>{
            return [...prev, "time is required"];
            }));
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

    let update = async()=>{
        check();

        if(err.length == 0){
            let obj = {
                name: name,
                description: description,
                time :time,
                materials: materials
            }

            let rez = await api.update(obj, id);
            if(rez == 'update success'){
                history.push('/');
            }

        }else{
            err.forEach(e=>alert(e));
        }
    }

    return(
        <>
            {
                loading
                ?<Loader/>
                :errors?<Errors message={errors}/>
                :<main className="course-create-main">
                    <h1>Update Course</h1>
        
                    <section className="course-create-grid" onChange={onChange}>
        
                        <section className="course-create-details">
                            <p>Course Title</p>
                            <input type="text" defaultValue={name} className="course-title"/>
        
                            <h5>By: {search}</h5>
        
                            <p>Course Description</p>
                            <textarea cols="30" rows="10" className="course-description" defaultValue={description}></textarea>
                        </section>
        
                        <section className="course-create-time-materials">
                            <p>Estimated Time</p>
                            <input type="text" className="course-time" defaultValue={time}/>
                            <p>Materials Needed</p>
                            <textarea cols="30" rows="10" className="course-materials" defaultValue={materials}></textarea>
                        </section>
        
                        <section className="course-create-buttons">  
                            <a href="#" onClick={update} className="create-course">Update Course</a>
                            <Link to={{pathname: `/view-course/${id}`, search: "owner"}} className="cancel-course">Cancel</Link>
                        </section>
                    </section>
                </main>
            }
        </>
    );
}