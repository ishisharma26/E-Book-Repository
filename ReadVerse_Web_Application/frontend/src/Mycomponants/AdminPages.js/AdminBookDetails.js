import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import {  useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Center, Image, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from 'axios';
import styled from 'styled-components';

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



const AdminBookingDetails = () => {
    const location=useLocation()
    const { bookId } = location.state?location.state:{ bookId:" " }
    const [booking,setBooking] =useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/getBooking/${bookId}`)
        .then((result)=>{
            console.log(result.data.result)
            setBooking(result.data.result)
           
        })
        .catch((error)=>{
            console.log(error)
        }) 
       },[])
  


    const navigate=useNavigate()
      const handleSubmit = async (event) => {
          event.preventDefault();
          navigate("/viewAllBooking")

        }
  
        const [showUsername, setShowUsername] = useState(false);

        const toggleUsernameVisibility = () => {
         setShowUsername(!showUsername)
        };
        const [showNumber, setShowNumber] = useState(false);
       
        const toggleNumberVisibility = () => {
            setShowNumber(!showNumber);
        };
        const [adharNumber, setAdharShowNumber] = useState(false);
       
        const toggleAdharNumberVisibility = () => {
         setAdharShowNumber(!adharNumber);
        };
       


  return (
    <div style={{display:"flex",justifyContent:"center" ,paddingTop:"15vh" ,backgroundColor:"gray"}} >
         <Container style={{margin:"20vh"}} >
     <Center style={{padding:"20px"}} > <Title>Booking Details</Title></Center>
      <div className="content">
        <form action="#">
          <UserDetails>
            <InputBox>
              <span className="details"> <h3>User First Name <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{booking?.userId?.fname}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>User Last Name  <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{booking?.userId?.lname}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Booking Date  <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{booking?.date}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Booking id <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{booking?.bookingId}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Total Price<span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{booking?.total}  </h5>
                    </span>
            </InputBox>

             <InputBox>
              <span className="details"> <h3>Product Details  <span className="details">  : </span> </h3></span>
            </InputBox>
          
            <div style={{ width:"100%"}}>
      <table style={{ width:"100%"}} >
        <thead>
          <tr>
            <th>Image</th>
            <th>Book Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {booking?.products?.map((p, index) => (
            <tr key={index}>
              <td > <InputBox>
              <span className="details"> <Image
                             borderRadius='full'
                             boxSize='100px'
                             src={`http://localhost:5000/images/${p?.productId?.pic}`}
                            //  alt={flight?.fname}
                             />
             </span>
            </InputBox></td>
              <td >{p?.productId?.title}</td>
              <td >{p?.productId?.price}</td>
              <td >{p?.quantity}</td>
              <td >{p?.quantity*p?.productId?.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            



          </UserDetails>

        </form>
        <div  style={{ display:"flex" , justifyContent:"center"}} >

    <button style={{backgroundColor:"GrayText",margin:'20px',height:"40px",width:"50%"  }}  
    onClick={handleSubmit}
    type='button'
      >
    Back 
</button>

</div>
      </div>
    </Container>
    </div>
  );
}
export default AdminBookingDetails;
