import React, { useEffect, useState } from "react";
import Api from "../api"
import { Link, useHistory} from "react-router-dom";
import { useParams } from "react-router-dom";

export default ()=>{
    let [name, setName] = useState("");

    let [description, setDescription] = useState("");

    let [time, setTime] = useState("");

    let [materials, setMaterials] = useState("");

    let [err, setErr] = useState([]);

    let {id} = useParams();

    const history = useHistory();
    let api = new Api();

    let getCourse = async(id)=>{
        let course = await api.getById(id);

        setName(course.name);
        setDescription(course.description);
        setMaterials(course.materials);
        setTime(course.time);
    }


    useEffect(()=>{
        check();
    },[name, description, time, materials]);

    useEffect(()=>{
        getCourse(id);
    },[]);
    
    let check=()=>{
        setErr([]);
        
        let arr = [];

        if(name ==""){
            arr.push("name required!");
        }
        if(description ==""){
           arr.push("description required!");
        }
        if(time == ""){
            arr.push("time required!");
        }
        if(materials == ""){
            arr.push("materials required!");
        }
        
        setErr(arr);
        console.log(err);
    }

    let onChange=(e)=>{
        e.preventDefault();
 
        let obj = e.target;
 
        if(obj.classList.contains("course-title")){
            setName("");
            setName(obj.value);
        }else if(obj.classList.contains("course-description")){
             setDescription("");
             setDescription(obj.value);
         }else if(obj.classList.contains("course-materials")){
             setMaterials("");
             setMaterials(obj.value);
         }else if(obj.classList.contains("course-time")){
             setTime("");
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

            await api.update(obj, id);

            history.push(`/view-course/${id}`);
        }else{
            err.forEach(e=>alert(e));
        }
    }

    return(
        <main className="course-create-main">
            <h1>Update Course</h1>

            <section className="course-create-grid" onChange={onChange}>

                <section className="course-create-details">
                    <p>Course Title</p>
                    <input type="text" defaultValue={name} className="course-title"/>

                    <h5>By $Name</h5>

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
                    <Link to={`/view-course/${id}`} className="cancel-course">Cancel</Link>
                </section>
            </section>
        </main>
    );
}