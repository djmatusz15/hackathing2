import { useState } from "react";
import Login from "./Login";
import User from "./User";
import { auth } from "../../hackathing2/src/firebase";
import { useNavigate } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // return <Login />;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="user" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
