import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const submit = () => {
    if (user && pass) {
      localStorage.setItem("loggedIn", "true");
      nav("/dashboard");
    } else {
      alert("Enter credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>

        <input
          className="login-input"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="login-button" onClick={submit}>
          Login
        </button>
      </div>
    </div>
  );
}
