import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Api from "../api";

import { useHistory } from "react-router-dom";

import { Context } from "./Context";
export default ()=>{

    let api = new Api();

    let [email, setEmail] = useState("");
    
    let [pass, setPass] = useState("");

    let [err, setErr] = useState("");

    const [user,setUser] = useContext(Context);

    const history = useHistory();


    let onChange=(e)=>{
        let obj= e.target;

        if(obj.classList.contains("singin-email")){
            setEmail(obj.value);
        }
        if(obj.classList.contains("singin-password")){
            setPass(obj.value);
        }
    }

    let check=()=>{
        setErr([]);

       if(email == ""){
            setErr((prev=>{
               return [...prev,"Email is required" ];
          }));
       }

       if(pass == ""){
            setErr((prev=>{
               return [...prev, "Password is required"];
           }));
       }
       
    }

    let loginHandle= async()=>{
        check();

        if(err == ''){
            let allStudents = await api.getAllStudents();
            let ok = 0;
            allStudents.forEach((e)=>{
                if(e.email == email && e.password == pass){
                    setUser({email:email,password:pass});
                    history.push("/");
                    ok = 1;
                }
            });

            if(ok == 0){
                alert('Nume sau parola gresita!');
            }

        }else{
            err.forEach((e)=>alert(e));
        }
    }

    useEffect(()=>{
        check();
    },[email, pass]);

    return (
        <>
            <main className="signin-main" onChange={onChange}>
                <h1>Log In</h1>
                <p className="eror"></p>
                <p>Email Address:</p>
                <input type="text" className="singin-email"/>
                <p>Password:</p>
                <input type="password" className="singin-password"/>
                <section className="signin-buttons">
                    <a href="#" className="singin-singin" onClick={loginHandle}>Log In</a>
                    <Link to={'/register'} className="singin-singup">Sign Up</Link>
                </section>
            </main>
       </>
    );
}