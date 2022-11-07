import "./login.style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserId, setUserType } from "../../redux/reducers/auth";
import { getIsLoggedIn } from "../../redux/selectors/auth.selectors";
import  GoogleLogin  from "react-google-login";

/*
to add google login 
first install npm i react-google-login
2nd 
import { GoogleLogin } from "react-google-login";
3rd
declare clientId="1078773011571-4b9avs3roskdsl5oo7k5s9pt7o7tta8m.apps.googleusercontent.com"
 */
const Login = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
  const clientId="646674207004-f5s33oa3mbvsq5rnhthd67bnmjj439pg.apps.googleusercontent.com"
  const onSuccess=(res)=>{
    console.log('login success currentUser:',res.profileObj);

  }
  const onFailure =(err)=>{
    console.log('login failed res:',err);
  }
  const handleLogin = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  const state = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        console.log(result);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setUserType(result.data.role));
        if (result.data.role == 1) {
          navigate("/");
        } else if (result.data.role == 2) {
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="login">
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
        <br />
        <button
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
        {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={clientId}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          )}
      </div>
    </>
  );
};

export default Login;
