import axios from "axios";
import React, {useEffect} from "react";
import "./home.style.css";
const Home = () => {

  const getMenItems =  () =>{
   axios.get(`http://localhost:5000/product/catgory/1`)
   .then((data)=>{
    console.log(data);
   })
   .catch((err)=>{
    console.log(err);
   })
  }

  useEffect(() => {
   getMenItems()
  }, []);
  return <div>Home</div>;
};

export default Home;
