import { Button, Image, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ViewAllAthors() {
    const [data,setData] =useState([])
    const [record,setRecord] =useState([])
    const columns = [
        {
            name: 'Image',
            selector:(row )=> (
            <>
                <Image
                    borderRadius='full'
                    boxSize='100px'
                    src={`http://localhost:5000/images/${row.pic}`}
                    alt={row.fname}
                    style={{padding:'5px'}}
                />
            </>
       ),
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'First Name',
            selector: row => row.fname,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lname,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
      
        {
            name: 'Email',
            selector: (row )=> (
              
                     <>
                {showUsername[row._id] ? row.email : "****"}
                    <FontAwesomeIcon
                      icon={showUsername[row._id] ? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleUsernameVisibility(row._id)}
                      style={{margin:'10px'}}
                    />
                     </>
           
            ),
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Mobile Number',
            selector: row => (
                <>
                {showNumber[row._id] ? row.contact : "****"}
                    <FontAwesomeIcon
                      icon={showNumber[row._id] ? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleNumberVisibility(row._id)}
                      style={{margin:'10px'}}
                    />
                </>
            ),
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable:true,
          
        },
        {
            name: 'Action',
            cell: (row) => (
                <div>
                <span onClick={()=>DeleteItem(row._id)} ><FontAwesomeIcon icon={faTrash} /></span>
            </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    
   useEffect(()=>{
    axios.get(`http://localhost:5000/author/getAllAuthor`)
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
        "Are you sure you want to delete this Author ?"
       );
     
       if(confirmed){
        axios.delete(`http://localhost:5000/author/deleteAuthor/${id}`)
        .then((result)=>{
            console.log(result.data.message)
            if(result.data.message==="Author SuccesFully Deleted"){
              setRecord(record.filter((p)=> p._id!==id )); 
              setData(record)
            }
            else{
              alert("Author not delete");
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
        const firstNameMatch = row.fname.toLowerCase().includes(searchTerm);
        const lastNameMatch = row.lname.toLowerCase().includes(searchTerm);
        const emailMatch = row.email.toLowerCase().includes(searchTerm);
   
        return firstNameMatch || lastNameMatch || emailMatch  ;
    });
    setRecord(newdata);
 } 

  return (
     
      <div  style={{paddingTop:"30vh" ,backgroundColor:"gray" ,minHeight:"100vh"}} > 
         <div  >
         <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-5">View All Author</h1>
                    <Input style={{backgroundColor:"white",width:"25%",marginBottom:"10px",marginRight:"-70%" }} placeholder='Search' onChange={handleFilter}  /> 
        </div>  
         <DataTable columns={columns} data={record} style={{padding:"30vh" }} pagination
		   />
         </div>
      </div>


  )
}

export default ViewAllAthors