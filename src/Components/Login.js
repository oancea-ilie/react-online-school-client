import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../api";

export default ()=>{

    let api = new Api();

    return (
        <>
            <header>
                <a href="#" className="brand">Courses</a>
            </header>
            <main className="signin-main">
                <h1>Log In</h1>
                <p className="eror"></p>
                <p>Email Address:</p>
                <input type="text" className="singin-email"/>
                <p>Password:</p>
                <input type="password" className="singin-password"/>
                <section className="signin-buttons">
                    <a href="#" className="singin-singin">Log In</a>
                    <a href="#" className="singin-singup">Sign Up</a>
                </section>
            </main>
       </>
    );
}