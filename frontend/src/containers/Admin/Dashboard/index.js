import axios from "axios";
import React, { useEffect, useState } from "react";
import "./dashboard.style.css";
import { getToken } from "../../../redux/selectors/auth.selectors";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [usersTotal, setUsersTotal] = useState(0);
  const [gamesTotal, setGamesTotal] = useState(0);
  const [ordersTotal, setOrdersTotal] = useState(0);
  const [orderTotalAmount, setOrderTotalAmount] = useState([]);
  const token = useSelector(getToken);

  const grandTotal = (arr) => {
    return arr.reduce((sum, i) => {
      return sum + i.total;
    }, 0);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/webstatus/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsersTotal(res.data.usersTotal);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/webstatus/games", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGamesTotal(res.data.gamesTotal);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/webstatus/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrdersTotal(res.data.ordersTotal);
        setOrderTotalAmount(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div>
            <div className="total-text">Live Users</div>
            <div className="total-number">{usersTotal}</div>
          </div>
          <img
            className="dashboard-card-image"
            src="../assets/images/polling.png"
            alt=""
          />
        </div>
        <div className="dashboard-card">
          <div>
            <div className="total-text">Products Total</div>
            <div className="total-number">{gamesTotal}</div>
          </div>
          <img
            className="dashboard-card-image"
            src="../assets/images/deal.png"
            alt=""
          />
        </div>
        <div className="dashboard-card">
          <div>
            <div className="total-text">Orders Total</div>
            <div className="total-number">{ordersTotal}</div>
          </div>
          <img
            className="dashboard-card-image"
            src="../assets/images/growth.png"
            alt=""
          />
        </div>
        <div className="dashboard-card">
          <div>
            <div className="total-text">Total Sales profit</div>
            <div className="total-number">
              ${Math.ceil(grandTotal(orderTotalAmount))}
            </div>
          </div>
          <img
            className="dashboard-card-image"
            src="../assets/images/money-tree.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
