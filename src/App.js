import React from "react";
import Home from "./Components/Home"
import Header from "./Components/Header";
import AddCourse from "./Components/AddCourse";
import UpdateCourse from "./Components/UpdateCourse";
import CourseView from "./Components/CourseView";
import Login from "./Components/Login";
import Register from "./Components/Register";

import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

export default ()=>{

  return(
    <Router>
        <Header/>
        <Switch>
            <Route exact path ="/register"><Register/></Route>
            <Route exact path ="/login"><Login/></Route>
            <Route exact path ="/"><Home/></Route>
            <Route exact path ="/add-course"> <AddCourse/> </Route>
            <Route exact path ="/view-course/:id"> <CourseView/> </Route>
            <Route exact path ="/update/:id"> <UpdateCourse/> </Route>
        </Switch>
    </Router>
  )
}