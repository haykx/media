import './App.css';
import Home from "./components/Home";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Post from "./components/Post";

function App() {
  return (
      <div className="App">
          <Router>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/post/:id" element={<Post/>} />
            </Routes>
            <Footer/>
          </Router>
      </div>
  );
}

export default App;
