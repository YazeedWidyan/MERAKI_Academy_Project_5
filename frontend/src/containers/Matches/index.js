import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./matches.style.css";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/match")
      .then((res) => {
        setMatches(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="matches-contanier">
        <div className="page-title">Matches</div>
        <div className="matches-grid">
          {matches.map((match, i) => {
            return (
              <div className="match-card" key={i}>
                <div className="match-title">{match.title}</div>
                <img
                  className="match-img"
                  src="../assets/images/match.jpg"
                  alt="match"
                />
                <div className="match-deatils">
                  <div>{match.place}</div>
                  <div>{match.dates}</div>
                  <div>{match.ticketprice}JD</div>
                  <div>{match.timeduration}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Matches;
