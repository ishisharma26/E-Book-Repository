import React, { useState } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


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

const AuthorLogin = () => {
  axios.defaults.withCredentials = true;
  const [email,setUsername]=useState()
  const [password,setPassword]=useState()
  const navigate=useNavigate()

  const HendleSubmit=(e)=>{
    e.preventDefault();

    if(!password || !email){
       return alert("Please Fill All filds")
    }

    axios.post(`http://localhost:5000/author/login`,{email,password})
    .then((result)=>{
       console.log(result)
       if(result.data.message==="Author login Succesfully !"){
        alert("Author login Succesfully !");
        navigate('/authorDashBoard')
       }
       else if(result.data.message==="Sorry your password is wrong !"){
        alert("Sorry Your Password is Wrong !");
       }
       else if(result.data.message==="Author login Unsuccesfully deo to status!"){
        alert("Sorry You Cant Not Login, Your Status Not Accepted !");
       }
       else{
        alert("Author login Un Succesfully !");
       }
    })
    .catch((error)=>{
     console.log(error)
     alert("Author login UnSuccesfully Due To Backend!");
    })

}


  return (
    <div style={{display:"flex",justifyContent:"center" ,paddingTop:"15vh" ,backgroundColor:"gray"}} >
         <Container style={{margin:"20vh"}} >
      <Title> Author Login</Title>
      <div className="content">
        <form >
          <UserDetails>
            <InputBox>
              <span className="details">Username</span>
              <Input type="text" placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Password</span>
              <Input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required />
            </InputBox>
          </UserDetails>
          <div  style={{ display:"flex" , justifyContent:"center"}} >

           <button style={{backgroundColor:"GrayText",margin:'20px',height:"40px",width:"50%"  }} 
           onClick={HendleSubmit}
           type='button'
           >
               Login
           </button>

          </div>
        </form>
      </div>
    </Container>
    </div>
  );
}

export default AuthorLogin;
