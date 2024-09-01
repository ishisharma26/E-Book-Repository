
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    border-radius: 5px;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
`;

const InputBox = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
`;

const Input = styled.input`
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;

  &:focus, &:valid {
    border-color: #9b59b6;
  }
`;

const GenderDetails = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Category = styled.div`
  display: flex;
  width: 80%;
  margin: 14px 0;
  justify-content: space-between;
`;



const PaymentPage = () => {

  axios.defaults.withCredentials = true;
  const locatoion=useLocation()
  const {cart}=locatoion.state?locatoion.state:{data:""}
  const [data]=useState(locatoion.state?locatoion.state.cart.products:{data:""})
  const [cartId,setcartId]=useState(cart._id)
  const [add,setadd]=useState()
  const [currentPassword,setCurrentPassword]=useState()
  const [newPassword,setNewPassword]=useState()
  const [confirmPassword,setConfirmPassword]=useState()
  const [confirmPassword2,setConfirmPassword2]=useState()
  const navigate=useNavigate()
  let total = 0;

  data?.forEach((d) => {
      total += d?.quantity * d?.productId?.price;
  });




  const HendleSubmit=()=>{
    setcartId(cart._id)
    if(!confirmPassword || !newPassword || !currentPassword || !confirmPassword2 || !cartId  || !total){
        return alert("Please Fill All filds")
    }

 axios.post(`http://localhost:5000/user/createBooking`,{cartId,total})
    .then((result)=>{
      console.log(result.data)
       if(result.data.message==='Booking created successfully.'){
        alert("Booking SuccessFully Created");
       }
       else{
        alert("Booking SuccessFully Not Created");
       }
    })
    .catch((error)=>{
     console.log(error)
     alert("Booking SuccessFully Not Created successfully Due To Backend!");
    })


  }



  return (
    <div style={{display:"flex",justifyContent:"center" ,paddingTop:"15vh" ,backgroundColor:"gray"}} >
       <Container style={{margin:"20vh"}} >
      <Title> Payment Page </Title>
      <div className="content">
        <form >
          <UserDetails>
          <InputBox style={{width:"100%"}} >
              <span className="details">Account Holder Name</span>
              <Input type="text" placeholder="Enter Account Holder Name" onChange={(e)=>setNewPassword(e.target.value)} required />
            </InputBox>
            <InputBox style={{width:"100%"}}>
              <span className="details">Card Number </span>
              <Input type="text" placeholder="Ex.8899/9999/8888" onChange={(e)=>setCurrentPassword(e.target.value)} required />
            </InputBox>
            <InputBox style={{width:"100%"}} >
              <span className="details">Expiry Date</span>
              <Input type="text" placeholder="MM/YY" onChange={(e)=>setConfirmPassword(e.target.value)} required />
            </InputBox>
            <InputBox style={{width:"100%"}} >
              <span className="details">CVC Number</span>
              <Input type="password" placeholder="CVC" onChange={(e)=>setConfirmPassword2(e.target.value)} required />
            </InputBox>
            {/* <InputBox style={{width:"100%"}} >
              <span className="details">Delevery Address</span>
              <Input type="text" placeholder="Delevery Address" onChange={(e)=>setadd(e.target.value)} required />
            </InputBox> */}
            <InputBox style={{width:"100%"}} >
              <span className="details">Total Account</span>
              <Input type="text" value={total}  required />
            </InputBox>
          </UserDetails>
          <div  style={{ display:"flex" , justifyContent:"center"}} >
           <button style={{backgroundColor:"GrayText",margin:'20px',height:"40px",width:"50%"  }} 
           onClick={HendleSubmit}
           type='button'
           >
               Submit
           </button>

          </div>
        </form>
      </div>
    </Container>
    </div>
  );

}
export default PaymentPage;
