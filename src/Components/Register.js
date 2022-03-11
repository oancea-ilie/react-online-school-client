import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Api from "../api"
import { Context } from "./Context";

export default ()=>{

    let api = new Api();

    let [firstName, setFirstName] = useState("");

    let [lastName, setLastName] = useState("");

    let [email, setEmail] = useState("");
    
    let [password, setPassword] = useState("");

    let [err, setErr] = useState("");

    const [user,setUser] = useContext(Context);

    const history = useHistory();

    let onChange=(e)=>{
        let obj= e.target;

        if(obj.classList.contains("signup-first-name")){
            setFirstName(obj.value);
        }
        if(obj.classList.contains("signup-last-name")){
            setLastName(obj.value);
        }
        if(obj.classList.contains("signup-email")){
            setEmail(obj.value);
        }
        if(obj.classList.contains("signup-password")){
            setPassword(obj.value);
        }
    }

    let check=()=>{
        setErr([]);

        if(firstName == ""){
            setErr((prev=>{
               return [...prev, "FirstName is required"];
           }));
        }

       if(lastName == ""){
            setErr((prev=>{
                return [...prev, "LastName is required"];
            }));
        }

       if(email == ""){
            setErr((prev=>{
               return [...prev,"Email is required" ];
          }));
       }

       if(password == ""){
            setErr((prev=>{
               return [...prev, "Password is required"];
           }));
       }
       
    }

    let registerHandle= async()=>{
        check();

        try{

            if(err == ''){

                let obj = {
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    password : password
                }
    
                let rez = await api.addStudent(obj);
    
                if(rez == 'success'){
                    setUser({email : email, password : password});
                    history.push("/");
                }
                
            }else{
                err.forEach((e)=>alert(e));
            }

        }catch(e){
            alert(e);
        }
    }

    return (
        <>
            <main className="signup-main" onChange={onChange}>
                <h1>Sign Up</h1>

                <p>First Name:</p>
                <input type="text" className="signup-first-name"/>
                <p>Last Name:</p>
                <input type="text" className="signup-last-name"/>
                <p>Email Address:</p>
                <input type="email" className="signup-email"/>
                <p>Password:</p>
                <input type="password" className="signup-password"/>
                <section className="signup-buttons">
                    <a href="#" className="signup-singup" onClick={registerHandle}>Sing Up</a>
                    <Link to={"/login"} className="signup-singin">Log In</Link>
                </section>
            </main>
       </>
    );
}