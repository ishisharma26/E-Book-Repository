import { Button, Image, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ViewAllGenre() {
    const [data,setData] =useState([])
    const [record,setRecord] =useState([])
    const navigate=useNavigate()
    let index=1;
    const columns = [
     
        {
            name: 'S.N.',
            selector: row => index++,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Tital Name',
            selector: row => row.name,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
   
        {
            name: 'Action',
            cell: (row) => (
                <div>
                  <span style={{margin:"10px"}} onClick={()=>HendleClick(row.name,row._id)} ><FontAwesomeIcon icon={faPenToSquare} /></span>       
                <span style={{margin:"10px"}}  onClick={()=>DeleteItem(row._id)} ><FontAwesomeIcon icon={faTrash} /></span>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    
   useEffect(()=>{
    axios.get(`http://localhost:5000/admin/getAllGenre`)
    .then((result)=>{
        console.log(result.data.result)
        setData(result.data.result)
        setRecord(result.data.result)
    })
    .catch((error)=>{
        console.log(error)
    }) 
   },[])
    
   const DeleteItem =(id)=>{
    const confirmed=window.confirm(
        "Are you sure you want to delete this Genre ?"
       );
     
       if(confirmed){
        axios.delete(`http://localhost:5000/admin/deleteGenre/${id}`)
        .then((result)=>{
            console.log(result.data.message)
            if(result.data.message==="Genre SuccessFully Deleted"){
              setRecord(record.filter((p)=> p._id!==id )); 
              setData(record)
            }
            else{
              alert("User not delete");
            }
        })
        .catch((error)=>{
          console.log(error)
        })
       }
       
}

const [showNumber, setShowNumber] = useState({});


const toggleNumberVisibility = (id) => {
    setShowNumber((prevState) => ({
    ...prevState,
    [id]: !prevState[id],
  }));
};
const [showUsername, setShowUsername] = useState({});

const toggleUsernameVisibility = (id) => {
        setShowUsername((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
};
  
const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const newdata = data.filter(row => {
        const firstNameMatch = row.name.toLowerCase().includes(searchTerm);

        return firstNameMatch   ;
    });
    setRecord(newdata);
 } 

 const HendleClick=(name,id)=>{
    navigate("/updateGenre",{state:{name:name,id:id}})
 }



  return (
     
      <div  style={{paddingTop:"30vh" ,backgroundColor:"gray" ,minHeight:"100vh"}} > 
         <div  >
         <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-5">View All Genre</h1>
                    <Input style={{backgroundColor:"white",width:"25%",marginBottom:"10px",marginRight:"-70%" }} placeholder='Search' onChange={handleFilter}  /> 
        </div>  
         <DataTable columns={columns} data={record} style={{padding:"30vh" }} pagination
		   />
         </div>
      </div>


  )
}

export default ViewAllGenre