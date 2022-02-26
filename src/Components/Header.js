import React from "react";
import Api from "../api"

import { Link } from "react-router-dom";


export default ()=>{

    return (
        <header>
            <Link to={"/"} className="brand">Courses</Link>
            <section className="logsection">
                <p>Hi, Name</p>
                <Link to={"/"} className="home-logout-buton">Log Out</Link>
            </section>
        </header>
    );
}