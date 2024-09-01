
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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



const AddGenres = () => {
  axios.defaults.withCredentials = true;
  const [name,setName]=useState()

  const navigate=useNavigate()


  const HendleSubmit=(e)=>{
    e.preventDefault();
  

    axios.post(`http://localhost:5000/admin/createGenre`,{name})
    .then((result)=>{
       if(result.data.message==="Genre SuccessFully Created"){
        alert("Genre SuccessFully Created");
        navigate("/viewAllGenre")
       }
       else{
        alert("Genre SuccessFully Not Created");
       }
    })
    .catch((error)=>{
     console.log(error)
     alert("Genre SuccessFully Created Due To Backend!");
    })
  }

  return (
    <div style={{display:"flex",justifyContent:"center" ,paddingTop:"15vh" ,backgroundColor:"gray",minHeight:"100vh"}} >
       <Container style={{margin:"20vh"}} >
      <Title>Add Genre</Title>
      <div className="content">
        <form >
          <UserDetails>
            <InputBox style={{width:"100%"}}>
              <span className="details">Tital Name </span>
              <Input type="text" placeholder="Enter tital name" onChange={(e)=>setName(e.target.value)} required />
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
export default AddGenres;
