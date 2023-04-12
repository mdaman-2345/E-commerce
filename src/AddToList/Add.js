import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import './Add.scss';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "./Add.scss";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



const Add = () => {
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   
const [list, setList] = useState({
    "name":"",
    "price":"",
    "url":""
})
const dispatch=useDispatch()

const addtolist=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setList({
        ...list,
        [name]:value
    })
    
}

const addintolist=async ()=>{


  try {
    const res = await axios.post('http://localhost:8080/product',({
      name:list.name,
      price:list.price,
      src:list.url
    }))
    console.log(res.data)
  } catch (e) {
    console.log(e);
  }

    dispatch({
        type:"ADD",
        payload:{
            id: (new Date).getTime().toLocaleString(),
            name:list.name,
            price:list.price,
            src:list.url
        }
    })
    setList({
      "name":"",
    "price":"",
    "url":""
    })
    handleClose();
}



  return (
    <>
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h1 className='addornot'>Want to Add?</h1>
        <div className="confirm-product-card">
              <div className="product-image">
                <img
                  className="images"
                  src={list.url}
                />
              </div>
              <div className="detail product-name">
                Product Name: <span className="answer">{list.name}</span>
              </div>
              <div className="detail product-price">
                Product Price:{" "}
                <span className="answer">Rs {list.price}</span>
              </div>
              <div className="product-buttons">
                <input
                  type="button"
                  className="mybtng mybtn"
                  onClick={()=>addintolist()}
                  value="Add"
                />
                <input
                  type="button"
                  className="mybtn"
                  onClick={handleClose}
                  value="Cancel"
                />
              </div>
            </div> 
        </Box>
      </Modal>
    </div>
    
    <div className='add-box'>
    <div className='form'>
  <div className="mb-3">
    <label  className="form-label">Enter Product Name</label>
    <input type="text" name="name" value={list.name}  onChange={addtolist} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Enter Product Price</label>
    <input type="text" name="price" value={list.price} onChange={addtolist} className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter Product Url</label>
    <input type="text" name="url" value={list.url} onChange={addtolist}  className="form-control" id="exampleInputPassword1"/>
  </div>

  <button type="submit" style={{height:"13%"}} onClick={handleOpen} className="btn btn-primary">Submit</button>
</div>
    </div>
    </>
  )
}

export default Add

 