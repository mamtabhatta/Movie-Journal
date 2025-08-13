import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import Lottie from "lottie-react";
import CuteAnimal from "../../assets/cuteAnimal.json";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Try again");
    }
  };

  return (
    <div className="container">
      <div className="lottie-wrapper">
        <Lottie animationData={CuteAnimal} loop={true} />
      </div>
      <h2>Signup</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <p style={{ marginTop: "15px" }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
{/* // key kina rakheko ? */ }
{/* //key is like a name tag for each movie it helps react remember which movie is which */ }