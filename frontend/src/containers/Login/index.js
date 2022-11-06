
import "./login.style.css";
import axios from "axios";
import React, {  useState, useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const login=()=>{
  axios.post("http://localhost:5000/login", {
    email,
    password,
  }).then().catch()
}
  return (<>
  <div >
    <p>login</p>
    <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            
          />
              <button
            onClick={(e) => {
             
            }}
          >
            Login
          </button>
  </div>
  </>)
};

export default Login;
