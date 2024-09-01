import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Box, Button, Radio, RadioGroup, Stack } from '@chakra-ui/react'
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



const AddBook = () => {
   

    const [title,settitle]=useState()
    const [price,setprice]=useState()
    const [dis,setdis]=useState()
   
    const [genreId,setgenreId]=useState()
    const [pic,setPic]=useState([])
    const [pdf,setPdf]=useState([])
    const [genre,setgenre]=useState([])
    const navigate=useNavigate()
  
    // Function to handle form submission
      const handleSubmit = async (event) => {
          event.preventDefault();
             console.log(pic)
             console.log(pdf)
             console.log(title)
             console.log(genreId) 
             console.log(price)
          if(!pic || !pdf|| !title ||  !genreId ||  !price || !dis){
            alert("Please fill all filds");
            return
          }
        
          const formData = new FormData();
          formData.append('title', title);
          formData.append('genreId', genreId);
          formData.append('pic', pic); // Pass the file object directly
          formData.append('pdf', pdf);
          formData.append('price', price);
          formData.append('dis', dis);
      


          console.log(formData);
        
          axios.post(`http://localhost:5000/author/createProduct`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          .then((result) => {
              console.log(result.data.message);
              if (result.data.message==="Product Successfully Created") {
                  navigate("/viewMyBook");
                  alert("Product Successfully Created");
              } else {
                  alert("Something error");
              }
          })
          .catch((err) => {
              console.error(err);
              alert("Something went wrong");
          });
        }
  
  
      const handleImageChange = (event) => {
          const file = event.target.files[0];
          setPic(file);
      };
      const handlePdfChange = (event) => {
          const file = event.target.files[0];
          setPdf(file);
      };
      
    //   const hendlClick2 = (e) => {
    //     setGender(e.target.value);
    // }
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/getAllGenre`)
        .then((result)=>{
            console.log(result.data.result)
            setgenre(result.data.result)
     
        })
        .catch((error)=>{
            console.log(error)
        }) 
       },[])


  return (
    <div style={{display:"flex",justifyContent:"center" ,paddingTop:"15vh" ,backgroundColor:"gray"}} >
         <Container style={{margin:"20vh"}} >
      <Title>Add Book</Title>
      <div className="content">
        <form action="#">
          <UserDetails>
            <InputBox>
              <span className="details">Book Title</span>
              <Input type="text" placeholder="Enter your book title" onChange={(e)=>settitle(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Book Price</span>
              <Input type="text" placeholder="Enter your book Price" onChange={(e)=>setprice(e.target.value)} required />
            </InputBox>
    
            <InputBox>
              <span className="details">Image</span>
              <Input type="file" placeholder="Enter your password" onChange={handleImageChange} required />
            </InputBox>
            <InputBox>
              <span className="details">Pdf file</span>
              <Input type="file" placeholder="Enter your password" onChange={handlePdfChange} required />
            </InputBox>

            <InputBox>
              <span className="details">Genre Category</span>
              <select style={{  padding:"5px", width:"100%", borderWidth:"5px"}} onChange={(e)=>setgenreId(e.target.value)} > 
                <option>Select Option </option>
               { genre.map((g)=>(
                 <option key={g._id} value={g._id}>{g.name}</option>
               )) }

              </select>
            </InputBox>
            <InputBox>
              <span className="details">Book Description</span>
              <Input type="text" placeholder="Enter your book Description" onChange={(e)=>setdis(e.target.value)} required />
            </InputBox>
          </UserDetails>
  
        </form>
        <div  style={{ display:"flex" , justifyContent:"center"}} >

    <button style={{backgroundColor:"GrayText",margin:'20px',height:"40px",width:"50%"  }}  
    onClick={handleSubmit}
    type='button'
      >
    Submit
</button>

</div>
      </div>
    </Container>
    </div>
  );
}
export default AddBook;
