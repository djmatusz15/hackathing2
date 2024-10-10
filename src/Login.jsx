import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../src/firebase";
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/dashboard");
      })
      .catch((error) => {
        setError("Wrong input, try again.");
      });
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="email"
          placeholder="Type Email Here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Type Password Here"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

        {error && <span className={styles.errorMessage}>{error}</span>}
      </form>
    </div>
  );
};

export default Login;
