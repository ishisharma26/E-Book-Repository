import { Button, Image, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ViewAllBooking() {
    const [data,setData] =useState([])
    const [record,setRecord] =useState([])
    const navigate=useNavigate()
    let index=1;

    
    const columns = [
        {
            name: 'S.No',
            selector:(row )=> ( index++),
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Booking Id',
            selector: row => row?.bookingId,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Total Fare',
            selector: row => row?.total,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Booking Date',
            selector: row => row?.date,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        // {
        //     name: 'Status',
        //     selector: row => row?.status,
        //     sortable:true,
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        // },
        {
            name: 'View Details',
            cell: (row) => (
                <div>
                <Button style={{padding:"10px"}} onClick={()=>handleSubmit2(row?._id)}> Detail  </Button>
            </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Cancel Booking',
            cell: (row) => (
                <div>
                <span style={{padding:"10px"}} onClick={()=>DeleteItem(row?._id)} ><FontAwesomeIcon icon={faTrash} /></span>
            </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    
   useEffect(()=>{
    axios.get(`http://localhost:5000/user/getAllBooking`)
    .then((result)=>{
        console.log(result.data)
        setData(result.data.result)
        setRecord(result.data.result)
    })
    .catch((error)=>{
        console.log(error)
    }) 
   },[])
    
   const DeleteItem =(id)=>{
    const confirmed=window.confirm(
        "Are you sure you want to delete this Booking?"
       );
     
       if(confirmed){
        axios.delete(`http://localhost:5000/user/deleteBooking/${id}`)
        .then((result)=>{
            console.log(result.data.message)
            if(result.data.message==="Booking SuccesFully Deleted"){
              setRecord(record.filter((p)=> p._id!==id )); 
              setData(record)
            }
            else{
              alert("Booking not delete");
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
        const firstNameMatch = row.bookingId.toLowerCase().includes(searchTerm);
        const lastNameMatch = row.status.toLowerCase().includes(searchTerm);
        const lastNameMatch2 = row.total.toLowerCase().includes(searchTerm);
    
        
        return firstNameMatch || lastNameMatch || lastNameMatch2  ;
    });
    setRecord(newdata);
 } 

 const handleSubmit2=(bookId)=>{
    navigate("/adminBookingDetails",{state:{bookId:bookId}})
 }

  return (
     
      <div  style={{paddingTop:"30vh" ,backgroundColor:"gray" ,minHeight:"100vh"}} > 
         <div  >
         <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-5">View All Bookings</h1>
                    <Input style={{backgroundColor:"white",width:"25%",marginBottom:"10px",marginRight:"-70%" }} placeholder='Search By Booking Id , Status & Total Price' onChange={handleFilter}  /> 
        </div>  
         <DataTable columns={columns} data={record} style={{padding:"30vh" }} pagination
		   />
         </div>
      </div>


  )
}

export default ViewAllBooking