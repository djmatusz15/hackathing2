import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../hackathing2/src/firebase";

const Login = () => {
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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
