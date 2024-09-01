import { Button, Image, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ViewMyBook() {
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
            name: 'Tital Name',
            selector: row => row.title,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Genre Category',
            selector: row => row.genreId?.name,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <div>
                  <span style={{margin:"10px"}} onClick={()=>HendleClick(row,row._id)} ><FontAwesomeIcon icon={faPenToSquare} /></span>       
                <span style={{margin:"10px"}}  onClick={()=>DeleteItem(row._id)} ><FontAwesomeIcon icon={faTrash} /></span>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    
   useEffect(()=>{
    axios.get(`http://localhost:5000/author/getAuthorBook`)
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
        "Are you sure you want to delete this Book ?"
       );
     
       if(confirmed){
        axios.delete(`http://localhost:5000/author/deleteBook/${id}`)
        .then((result)=>{
            console.log(result.data.message)
            if(result.data.message==="Product SuccesFully Deleted"){
              setRecord(record.filter((p)=> p._id!==id )); 
              setData(record)
            }
            else{
              alert("Product not delete");
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
        const firstNameMatch = row.title.toLowerCase().includes(searchTerm);
        const firstNameMatch2 = row.genreId?.name.toLowerCase().includes(searchTerm);
        const firstNameMatch3 = row.price.toLowerCase().includes(searchTerm);

        return firstNameMatch || firstNameMatch2 || firstNameMatch3  ;
    });
    setRecord(newdata);
 } 

 const HendleClick=(name,id)=>{
    navigate("/updateBook",{state:{book:name,id:id}})
 }



  return (
     
      <div  style={{paddingTop:"30vh" ,backgroundColor:"gray" ,minHeight:"100vh"}} > 
         <div  >
         <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-5">View My Uploaded Book</h1>
                    <Input style={{backgroundColor:"white",width:"25%",marginBottom:"10px",marginRight:"-70%" }} placeholder='Search' onChange={handleFilter}  /> 
        </div>  
         <DataTable columns={columns} data={record} style={{padding:"30vh" }} pagination
		   />
         </div>
      </div>


  )
}

export default ViewMyBook