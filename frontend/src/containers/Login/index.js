import "./login.style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserId, setUserType } from "../../redux/reducers/auth";
import { getIsLoggedIn } from "../../redux/selectors/auth.selectors";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';





const Login = () => {

  const clientId="646674207004-f5s33oa3mbvsq5rnhthd67bnmjj439pg.apps.googleusercontent.com"
 
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: clientId,
          scope: 'email',
        });
      }
  
      gapi.load('client:auth2', start);
    }, []);
  
    const onSuccess = response => {
      console.log('SUCCESS', response);
      console.log(response.googleId);
      dispatch(setLogin(response.tokenId));
      dispatch(setUserId(response.googleId));
      dispatch(setUserType(1));
   
        navigate("/");
 

    };
    const onFailure = response => {
      console.log('FAILED', response);
    };
    const onLogoutSuccess = () => {
      console.log('SUCESS LOG OUT');
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
        <div>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
        
      </div>
    </>
  );
};

export default Login;
