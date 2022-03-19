import React, { useEffect, useState, useContext} from "react";
import Api from "../api"
import { Link, useHistory} from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Context } from "./Context";
import { useLocation } from "react-router-dom";

export default ()=>{

    const search = useLocation().search.slice(1);

    const [user,setUser] = useContext(Context);

    let [name, setName] = useState("");

    let [description, setDescription] = useState("");

    let [time, setTime] = useState("");

    let [materials, setMaterials] = useState("");

    let [createdBy, setCreatedBy] = useState("");

    let {id} = useParams();

    let [studentName, setStudentName] = useState("");

    let [studentId, setStudentId] = useState(undefined);

    let [students, setStudents] = useState([]);

    let [enrolments, setEnrolments] = useState([]);

    const history = useHistory();

    let api = new Api();
    
    let populateStudents= async()=>{

        try{

            if(user){
                let all = await api.getAllStudents(user);

                if(all.message){
                    history.push("/login");
                }
                if(all !=0){
                    setStudents(all);
                }
            }else{
                history.push("/login");
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
                history.push("/login")
            }
        }catch(e){
            console.log(e);
        }
    }

    let handleStudentName =()=>{
        if(createdBy && students){
            students.forEach(e=>{
                if(e.id == createdBy){
                    setStudentName(e.email);
                }
            })
        }
    }

    let setCourse = async(id)=>{
        if(user){
            let course = await api.getByIdAuth(id,user);

            if(course.message){
                history.push("/login");
            }
            
            setName(course.name);
            setDescription(course.description);
            setMaterials(course.materials);
            setTime(course.time);
            setCreatedBy(course.created_by);
        }else{
            history.push("/login");
        }
    }

    let deleteCourse = async()=>{
        let rez = await api.delete(id);

        if(rez == "delete success"){
            setName("");
            setDescription("");
            setMaterials("");
            setTime("");
            setCreatedBy("");
            history.push("/");
        }else{
            alert(rez.message);
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

    let handleLeaveCourse = ()=>{
        if(studentId && enrolments){

            enrolments.forEach(async(e)=>{
                if(e.course_id == id && e.student_id == studentId){
                    let rez = await api.deleteEnrolment(e.id);
                    
                    if(rez == "delete success"){
                        history.push("/");
                    }
                }
            })
        }
    }

    let handleParticipa = async()=>{
        if(studentId){
            let obj = {
                student_id : studentId,
                course_id : id
            }

            let rez = await api.addEnrolment(obj);

            if(rez == 'success'){
                history.push("/");
            }
        }
    }

    useEffect(()=>{
        setCourse(id);
        populateStudents();
        populateEnrolments();
    },[]);

    useEffect(()=>{
        handleIdStudent();
    },[students])

    useEffect(()=>{
        handleStudentName();
    },[students, createdBy])

    return(
    <>
            <section className="course-actions">
                {
                    user && search=="owner"?<>
                            <Link to={{pathname: `/update/${id}`, search:`${studentName}`}} className="update-course">Update Course</Link>
                            <a href="#" onClick={deleteCourse} className="delete-course">Delete Course</a>
                            <Link to={"/"} className="return">Return to List</Link>
                        </>
                        : user && search == "in"?<>
                            <a href="#" onClick={handleLeaveCourse} className="leave">Leave Course</a>
                            <Link to={"/"} className="return">Return to List</Link>
                          </>
                        :<>
                            <a href="#" onClick={handleParticipa} className="participa">Join to Course</a>
                            <Link to={"/"} className="return">Return to List</Link>
                        </>
                }
            </section>

            <section className="course-details-main">
                <h1>Course Detail</h1>

                <section className="course-details">
                    <h3>COURSE</h3>
                    <hr/>
                    <h1 className="title">{name}</h1>

                    <h5 className="by">By {studentName}</h5>

                    <p>Course Description:</p>
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