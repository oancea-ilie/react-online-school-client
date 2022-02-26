import React from "react";
import { Link } from "react-router-dom";

export default ()=>{

    return (
        <>
            <header>
                <a href="#" className="brand">Courses</a>
            </header>
            <main className="signup-main">
                <h1>Sign Up</h1>
                <section className="erors">
                    <p className="success"></p>
                    <p className="eror-firstName"></p>
                    <p className="eror-lastName"></p>
                    <p className="eror-email"></p>
                    <p className="eror-pass"></p>
                </section>

                <p>First Name:</p>
                <input type="text" className="signup-first-name"/>
                <p>Last Name:</p>
                <input type="text" className="signup-last-name"/>
                <p>Email Address:</p>
                <input type="text" className="signup-email"/>
                <p>Password:</p>
                <input type="password" className="signup-password"/>
                <section className="signup-buttons">
                    <a href="#" className="signup-singup">Sing Up</a>
                    <a href="#" className="signup-singin">Log In</a>
                </section>
            </main>
       </>
    );
}