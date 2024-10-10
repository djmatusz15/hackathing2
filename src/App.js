import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { auth } from "../src/firebase";
import { useNavigate } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Dashboard from "./Dashboard";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </Router>
  );
}

export default App;
