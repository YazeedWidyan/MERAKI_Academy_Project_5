import axios from 'axios';
import React, {useEffect, useState} from 'react';
import  './store.style.css'

const Store = () => {
 const [categories, setCategories] = useState([]);
  const getCategories = () => {
    axios
      .get(`http://localhost:5000/category`)
      .then((data) => {
       setCategories(data.data.result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductsByCategory = (id) =>{

  }
  useEffect(() => {
    getCategories()
  }, []);
 

    return (
        <div>
           
            {/* <div className="categroy-container">
        {menProducts.map((product, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                goToDetails(product.id);
              }}
            >
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
            <div
              key={i}
              onClick={() => {
                goToDetails(product.id);
              }}
            >
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
            <div
              key={i}
              onClick={() => {
                goToDetails(product.id);
              }}
            >
              <h3>Kids</h3>
              <h4>{product.title}</h4>
              <h5>image {product.img}</h5>
            </div>
          );
        })}
      </div> */}
        </div>
    );
}

export default Store;