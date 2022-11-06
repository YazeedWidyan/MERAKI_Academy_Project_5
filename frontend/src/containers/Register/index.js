import "./register.style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role_id = 1;
  const addNewUser = () => {
    axios
      .post("http://localhost:5000/user", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        role_id,
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container2">
        <p>Register</p>
        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder="firstName"
        />
        <input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          placeholder="lastName"
        />
        <input
          onChange={(e) => {
            setAge(e.target.value);
          }}
          type="number"
          placeholder="age"
        />
        <input
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          type="text"
          placeholder="country"
        />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password"
        />
        <input type="password" placeholder="Re-password" />
        <button
          onClick={() => {
            addNewUser();
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Register;
