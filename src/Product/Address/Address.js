import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Address = () => {
  const [address, setAddress] = useState({
    "house": "",
    "locality": "",
    "phone": "",
    "city": "",
    "state": "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const userAddress=useSelector((state)=>state);
  console.log(userAddress);
 

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
      },
    });
    
    
  };

  return (
    <div className="address">
      <div className="address-form">
        <div className="field">
          <div className="label">House no</div>
          <input type="text" name="house" onChange={handleChange} />
        </div>
        <div className="field">
          <div className="label">loaclity</div>
          <input type="text" name="locality" onChange={handleChange} />
        </div>
        <div className="field">
          <div className="label">Phone number</div>
          <input type="phone" name="phone" onChange={handleChange} />
        </div>
        <div className="field">
          <div className="label">city</div>
          <input type="text" name="city" onChange={handleChange} />
        </div>
        <div className="field">
          <div className="label">state</div>
          <input type="text" name="state" onChange={handleChange} />
        </div>
        <div className="button">
          <button className="btn" onClick={saveAddress}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Address;
