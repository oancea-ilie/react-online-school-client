import React from "react";
import Home from "./Components/Home"
import Header from "./Components/Header";
import AddCourse from "./Components/AddCourse";
import UpdateCourse from "./Components/UpdateCourse";
import CourseView from "./Components/CourseView";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Errors from "./Components/Errors";

import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import UserProvider from "./Components/Context";
import SignOut from "./Components/SignOut";


export default ()=>{

  return(
    <Router>
      <UserProvider>
        <Header/>
        <Switch>
            <Route exact path ="/register"><Register/></Route>
            <Route exact path ="/login"><Login/></Route>
            <Route exact path ="/"><Home/></Route>
            <Route exact path ="/add-course"> <AddCourse/> </Route>
            <Route exact path ="/view-course/:id"> <CourseView/> </Route>
            <Route exact path ="/update/:id"> <UpdateCourse/> </Route>
            <Route exact path = "/errors"> <Errors/> </Route>     
            <Route path="/sign-out"><SignOut></SignOut></Route>
        </Switch>
      </UserProvider>
    </Router>
  )
}