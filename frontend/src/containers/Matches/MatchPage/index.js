import axios from "axios";
import React from "react";
import { useEffect } from "react";
import "./matchpage.style.css";
const MatchPage = () => {
  useEffect(() => {
    axios.get("https/localhost:5000");
  }, []);

  return <div>MatchPage</div>;
};

export default MatchPage;
