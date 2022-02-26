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
    
    let setCourse = async(id)=>{
        let course = await api.getById(id);

        setName(course.name);
        setDescription(course.description);
        setMaterials(course.materials);
        setTime(course.time);
    }

    useEffect(()=>{
        setCourse(id);
    },[]);

    let deleteCourse = async()=>{
        let rez = await api.delete(id);

        if(rez == "delete success"){
            setName("");
            setDescription("");
            setMaterials("");
            setTime("");
            history.push("/");
        }else{
            alert(rez.message);
        }
    }

    return(
    <>
            <section className="course-actions">
                <Link to={`/update/${id}`} className="update-course">Update Course</Link>
                <a href="#" onClick={deleteCourse} className="delete-course">Delete Course</a>
                <Link to={"/"} className="return">Return to List</Link>
            </section>

            <section className="course-details-main">
                <h1>Course Detail</h1>

                <section className="course-details">
                    <h3>COURSE</h3>
                    <hr/>
                    <h1 className="title">{name}</h1>

                    <h5 className="by">By $Joe Smith</h5>

                    <p className="description">{description}</p>
                </section>

                <section className="course-time-materials">
                    <h3>ESTIMATED TIME</h3>
                    <hr/>
                    <p className="time">{time}</p>
                    <h3>MATERIALS NEEDED</h3>
                    <hr/>
                    <ul>
                        <li className="materials">{materials}</li>
                    </ul>
                </section>
            </section>
    </>
    );
}