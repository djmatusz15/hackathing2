import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../hackathing2/src/firebase";
import { AuthContext } from "../src/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // dispatch({ type: "LOGIN", payload: user });
        console.log(user);
        navigate("/user");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
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

        {error && <span>Wrong input, try again.</span>}
      </form>
    </div>
  );
};

export default Login;
