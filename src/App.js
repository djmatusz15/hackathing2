import { useState } from "react";
import Login from "./Login";
import { auth } from "../../hack-a-thing2/src/firebase";
import { useNavigate } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function App() {
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // navigate("/user");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return <Login />;
}

export default App;
