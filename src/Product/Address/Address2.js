import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import './Address.scss';
import {Link} from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";

export default function Delivery() {

  const userAddress=useSelector((state)=>state);
  let userCart=[]
  

    const [address, setAddress] = useState({
        "house": "",
        "locality": "",
        "phone": "",
        "city": "",
        "pin":"",
        "state": ""
      });
    
      const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddress({
          ...address,
          [name]: value,
        });
      };
      const order_id=(new Date).getTime().toString();

      useEffect(() => {
        const cart=userAddress.cart;
        const user_id=userAddress.user.id;
        if(cart){
          //  order_id=(new Date).getTime().toString();
          const keys=Object.keys(cart);
          keys.forEach((key,index)=>{
            let product={
              product_id:Number(key),
              product_count:Number(cart[key]),
              order_id:Number(order_id),
              user_id:user_id
            }
            userCart.push(product);
            console.log(userCart);
          
          });

        }

       
        const addToOrderTable= async()=>{
          try{
          const res = await axios.post('http://localhost:8080/order', userCart)
            console.log(res.data);
          }
          catch(e){
            console.log(e);
          }
        }
        addToOrderTable();

        
      }, [])
      
    
      const dispatch = useDispatch();
     
    
      const saveAddress = () => {
        dispatch({
          type: "ADDRESS",
          payload: {
            id: new Date().getTime().toLocaleString(),
            house: address.house,
            locality: address.locality,
            phone: address.phone,
            city: address.city,
            state: address.state,
            pin:address.pin
          },
        });
        
        
      };



  return (
    <>
    <Navbar/>
      <div className="mx-auto gradient-custom mt-5" style={{ maxWidth: '800px', height: '54vh' }}>
        <MDBRow className="pt-3 mx-3">
          <MDBCol md="3">
            <div className="text-center" style={{ marginTop: '50px', marginLeft: '10px' }}>
              <MDBIcon fas icon="shipping-fast text-white" size="3x" />
              <MDBTypography tag="h3" className="text-white">Welcome</MDBTypography>
              <p className="white-text">Delivery will be done within 7 days!</p>
            </div>
            <div className="text-center">
              <Link to="/product"><MDBBtn style={{color:"black"}} rounded className="back-button">Go back</MDBBtn></Link>
            </div>
          </MDBCol>
          <MDBCol md="9" className="justify-content-center">
            <MDBCard className="card-custom pb-4">
              <MDBCardBody className="mt-0 mx-5">
                <div className="text-center mb-3 pb-2 mt-3">
                  <MDBTypography tag="h4" style={{ color: '#495057' }} >Delivery Details</MDBTypography>
                </div>

                <form className="mb-0">
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput label='House no'  type="text" name="house" onChange={handleChange} />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput label='Locality' type="text" name="locality" onChange={handleChange}  />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput label='Phone number' type="phone" name="phone" onChange={handleChange}/>
                    </MDBCol>
                    <MDBCol>
                      <MDBInput label='City' type="text" name="city" onChange={handleChange}  />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                  <MDBCol>
                      <MDBInput label='Pin' type="number" name="pin" onChange={handleChange}  />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput label='State' type="text" name="state" onChange={handleChange}  />
                    </MDBCol>
                  </MDBRow>

                  <div className="float-end">
                    <Link to="/payment" state={{order_id:order_id}}><MDBBtn  onClick={saveAddress} rounded style={{backgroundColor: '#0062CC'}}>Place order</MDBBtn></Link>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
}