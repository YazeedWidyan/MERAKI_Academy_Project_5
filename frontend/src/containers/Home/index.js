import axios from "axios";
import React, { useEffect } from "react";
import "./home.style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getMenProducts,
  getWomenProducts,
  getKidsProducts
} from "../../redux/selectors/products.selectors";
import {
  setMenProducts,
  setWomenProducts,
  setKidsProducts
} from "../../redux/reducers/products";
const Home = () => {
  // const [products, setProducts] = useState([]);

  const menProducts = useSelector(getMenProducts);
  const womenProducts = useSelector(getWomenProducts);
  const kidsProducts = useSelector(getKidsProducts)
  const dispatch = useDispatch();

  const getMenItems = () => {
    axios
      .get(`http://localhost:5000/product/catgory/1`)
      .then((data) => {
        dispatch(setMenProducts(data.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWomenItems = () => {
    axios
      .get(`http://localhost:5000/product/catgory/2`)
      .then((data) => {
        dispatch(setWomenProducts(data.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getKidsItems = () => {
    axios
      .get(`http://localhost:5000/product/catgory/3`)
      .then((data)=>{
dispatch(setKidsProducts(data.data.result))
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  useEffect(() => {
    getMenItems();
    getWomenItems();
    getKidsItems()
  }, []);
  return (
    <div>
      Home
      <div className="categroy-container">
        {menProducts.map((product, i) => {
          return (
            <div key={i}>
              <h3>Men</h3>
              <h4>{product.title}</h4>
              <h5>image {product.img}</h5>
            </div>
          );
        })}
      </div>
      <div className="categroy-container">
        {womenProducts.map((product, i) => {
          return (
            <div key={i}>
              <h3>Women</h3>
              <h4>{product.title}</h4>
              <h5>image {product.img}</h5>
            </div>
          );
        })}
      </div>
      <div className="categroy-container">
        {kidsProducts.map((product, i) => {
          return (
            <div key={i}>
              <h3>Kids</h3>
              <h4>{product.title}</h4>
              <h5>image {product.img}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
