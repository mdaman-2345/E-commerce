import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Summary.scss";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Summary = () => {
  const user = useSelector((state) => state);
  const location = useLocation();
  const { order_no } = location.state;
  const cart = user.cart;
  const [userCart, setUserCart] = useState([]);
  // let userCart=[]

  useEffect(() => {
    const keys = Object.keys(cart);
    const productDetail = (id) => {
     
        axios.get(`http://localhost:8080/product/${id}`).then((res) => {
          setUserCart((userCart) => ([...userCart, res.data]));
        }).catch((error) => console.log('error', error));
     
    };
    keys.forEach((key, index) => {
      productDetail(key);
    });
  }, []);

  // console.log(userCart);

  const address = useSelector((state) => state.address);
  return (
    <>
      <Navbar />
      <div className="summary-page">
        <div className="user-detail">
          <h1>
            Thankyou {user.user.name}, for placing order worth{" "}
            <span style={{ color: "#d88e8e" }}> Rs {user.price}</span>
          </h1>
        </div>
        <div className="address">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Detail</h5>
            </div>
            <ul className="list-group list-group-flush">
              {userCart.map((product) => {
                return (
                  <li key={product.id} className="list-group-item my-list">
                    <ul>
                      <li className="mylist-item">
                        <span className="title">Name: </span>
                        {product.name}
                      </li>
                      <li className="mylist-item">
                        <span className="title">Count: </span>
                        {cart[product.id]}
                      </li>
                      <li className="mylist-item">
                        <span className="title">Price: </span>Rs {product.price}
                      </li>
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Shipping Address</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {" "}
                <span className="address-title">House No: </span>
                {address.house}
              </li>
              <li className="list-group-item">
                <span className="address-title">Locality: </span>
                {address.locality}
              </li>
              <li className="list-group-item">
                <span className="address-title">City: </span>
                {address.city}
              </li>
              <li className="list-group-item">
                <span className="address-title">Pin Code: </span>
                {address.pin}
              </li>
              <li className="list-group-item">
                <span className="address-title">State: </span>
                {address.state}
              </li>
              <li className="list-group-item">
                <span className="address-title"> Phone: </span>
                {address.phone}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
