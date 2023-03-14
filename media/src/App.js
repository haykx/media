import './App.css';
import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Post from "./components/Post";
import Home from "./components/Home"
import PublisherHome from "./components/PublisherHome";
import PostCreate from "./components/PostCreate";


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
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/post/:id" element={<Post/>} />
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
