import './App.css';
import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Discussion from "./components/Discussion";
import Home from "./components/Home"
import PublisherHome from "./components/PublisherHome";
import PostCreate from "./components/PostCreate";
import SignUp from "./components/SignUp";


window.addEventListener('scroll',() =>{
    const header = document.querySelector('header')
    header.classList.toggle('shadow', window.scrollY > 0)
})

function App() {
  return (
      <div className="App">
          <Router>
            <Header/>
            <Routes>
                <Route exact path="/home/" element={<Home/>} />
                <Route exact path="/home/:page" element={<Home/>} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/sign-up" element={<SignUp />} />
                <Route exact path="/discussion/:id" element={<Discussion/>} />
                <Route exact path="/publisher/:id" element={<PublisherHome/>} />
                <Route exact path="/publisher/:id/post" element={<PostCreate/>}></Route>
                <Route path={"*"} element={<Navigate to={"/home"} />} />
            </Routes>
            <Footer/>
          </Router>
      </div>
  );
}

export default App;
