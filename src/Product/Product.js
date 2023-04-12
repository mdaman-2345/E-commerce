import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import List from "./List";
import "./List.scss";
import { useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


const Product = () => {
  const isloggedin = useSelector((state) => state.user);

  const [price, setPrice] = useState();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const oldprice=useSelector((state) => state.price);
  const cart=useSelector((state)=>state.cart);


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/product");
        console.log(res.data);
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    
    setPrice(oldprice);
    fetchData();
  }, []);

  

  const changeCartPrice = (changingPrice,id) => {
    if(changingPrice>0){
    const newPrice=price+changingPrice;
    setPrice(newPrice);
    buy(newPrice);
    addToCart(id);
    }
    else{
        const newPrice=price+changingPrice;
    setPrice(newPrice);
    buy(newPrice);
        removeFromCart(id);
    }
      
   
  };

  const buy = (newPrice) => {
    
    dispatch({
      type: "PRICE",
      payload: {
        price: newPrice,
      },
    });
  };

  const removeFromCart=(id)=>{
    dispatch({
      type:"REMOVEFROMCART",
      payload:{
        id:id
      }
    })
  }

  const addToCart=(id)=>{
    dispatch({
      type:"ADDTOCART",
      payload:{
        id:id
      }
    })
  }


  return (
    <>
      <Navbar />
      <div className="my--header">
        <h1 className="total-price">Your cart price is {price}</h1>
        <div className="Final-buy">
          <Link to={isloggedin ? "/address" : "/login"}>
            <button className="Final-buy-btn" >
              {" "}
              Proceed to buy{" "}
            </button>
          </Link>
        </div>
      </div>
      <div className="my-card">
        {products.map((product) => {
          return (
            
            <div className="product-card">
            {/* <Link style={{textDecoration:'none', color:'black'}} to={`/product/${product.id}`} state={{ id: product.id}}> */}
              <div className="product-image">
                <img
                  className="images"
                  src={product.src ? product.src : product.url}
                />
              </div>
              <div className="detail product-name">
                Product Name: <span className="answer">{product.name}</span>
              </div>
              <div className="detail product-price">
                Product Price:{" "}
                <span className="answer">Rs {product.price}</span>
              </div>
              <div className="product-buttons">
              <button
                  type="button"
                  disabled={cart[product.id]>0? false:true}
                  className="mybtn"
                  onClick={()=>changeCartPrice(-product.price,product.id)}>
                  <RemoveCircleOutlineIcon className="icon"/>
                  </button>
                  <h2>{cart[product.id] ? cart[product.id]:0}</h2>
                <button
                  type="button"
                  id="removebtn"
                  className="mybtng mybtn"
                  onClick={()=>changeCartPrice(product.price,product.id)}
                  value="add to cart"
                ><AddCircleOutlineIcon className="icon"/></button>
                
                
              </div>
              {/* </Link> */}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Product;
