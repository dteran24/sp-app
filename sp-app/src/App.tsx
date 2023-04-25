import React from 'react';
import './App.css';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Search from './pages/Search';
import ViewAll from './pages/ViewAll';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="signup" element={<Signup/>} />
        <Route path="search" element={<Search/>} />
        <Route path="viewall" element={<ViewAll />} />
      
    </Routes>
 
  );
}

export default App;

