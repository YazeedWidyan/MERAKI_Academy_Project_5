import "./register.style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector , useDispatch} from "react-redux";
import { setLogin, setUserId, setUserType } from "../../redux/reducers/auth";
import { getIsLoggedIn } from "../../redux/selectors/auth.selectors";
import React, { useState } from "react";
import { setCart } from "../../redux/reducers/cart";
import { setWishlist } from "../../redux/reducers/wishlist";
const Register = () => {
  const navigate=useNavigate()
   const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setrepass] = useState("");
  const role_id = 1;
  const [message, setmessage] = useState("");
  const state = useSelector(getIsLoggedIn);
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
        getToken()
        setmessage(result.data.massage);
      })
      .catch((err) => {
        console.log(err.message);
        setmessage(err.message);
      });
  };
  ////////////////////////////////////
const getToken=()=>{
  axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setUserType(result.data.role));

        axios
          .get("http://localhost:5000/cart", {
            headers: {
              Authorization: `Bearer ${result.data.token}`,
            },
          })
          .then((res) => {
            console.log("ssss");
            dispatch(setCart(res.data.result));
          })
          .catch((err) => {
            console.log(err);
          });

        axios
          .get("http://localhost:5000/wishlist", {
            headers: {
              Authorization: `Bearer ${result.data.token}`,
            },
          })
          .then((res) => {
            dispatch(setWishlist(res.data.result));
          })
          .catch((err) => {
            console.log(err);
          });

        if (result.data.role == 1) {
          navigate("/");
        } else if (result.data.role == 2) {
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmessage(err.response.data.message);
      });
 };


  return (
    <>
      <div className="register-container">
        {!state.getIsLoggedIn ? (
          <>
            <p>Register</p>
            <input
              className="auth-input"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              placeholder="firstName"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              placeholder="lastName"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="number"
              placeholder="age"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              type="text"
              placeholder="country"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="email"
            />
            <input
              className="auth-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Re-password"
              onChange={(e) => {
                setrepass(e.target.value);
              }}
            />
            {password == "" && repass == "" ? (
              <p></p>
            ) : (
              <div>
                {" "}
                {password == repass ? (
                  <p className="succes-msg">password matched</p>
                ) : (
                  <p className="error-msg">wrong password</p>
                )}
              </div>
            )}

            <button
              className="register-btn"
              onClick={() => {
                addNewUser();
                
              }}
            >
              Register
            </button>
            <p>{message}</p>
          </>
        ) : (
          <>
            <p>Logout First</p>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
