import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./matchpage.style.css";
const MatchPage = () => {
  const [match, setMatch] = useState({});

  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/match/number/${location.state}`)
      .then((res) => {
        setMatch(res.data.result[0]);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>MatchPage</div>;
};

export default MatchPage;
