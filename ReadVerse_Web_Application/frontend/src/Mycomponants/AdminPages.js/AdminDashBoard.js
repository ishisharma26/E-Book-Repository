import { AbsoluteCenter, Center } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function AdminDashBoard() {
  const [data,setData]=useState([])
  const [user,setUser]=useState([])
  const [book,setBook]=useState([])
  const [author,setAuthor]=useState([])

  useEffect(()=>{
    axios.get(`http://localhost:5000/user/getAllBooking`)
    .then((result)=>{
        console.log(result.data)
        setData(result.data.result)
    
    })
    .catch((error)=>{
        console.log(error)
    }) 
   },[])

   useEffect(()=>{
    axios.get(`http://localhost:5000/user/getAllUser`)
    .then((result)=>{
        console.log(result.data.result)
        setUser(result.data.result)
       
    })
    .catch((error)=>{
        console.log(error)
    }) 
   },[])
   
   useEffect(()=>{
    axios.get(`http://localhost:5000/admin/getAllBook`)
    .then((result)=>{
        console.log(result.data.result)
        setBook(result.data.result)
    
    })
    .catch((error)=>{
        console.log(error)
    }) 
   },[])
    
   useEffect(()=>{
    axios.get(`http://localhost:5000/author/getAllAuthor`)
    .then((result)=>{
        console.log(result.data.result)
        setAuthor(result.data.result)
   
    })
    .catch((error)=>{
        console.log(error)
    }) 
   },[])
 
 
 
   return (
    <div>
      <div style={{ paddingTop: "20vh", backgroundColor:"#3399FF", minHeight: "100vh" }}>
  <div style={{ width: "100%", marginBottom: "1vh" }}>
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
      <div class="col-xl-3 col-sm-6 py-2" style={{ width: "25%", height: "30vh", backgroundColor: "#FF5733", transition: "background-color 0.3s", margin: "30px" }}>
        <Link to={'/viewAllUser'}>
          <div class="card bg-danger text-white h-100" style={{ backgroundColor: "#FF5733", transition: "background-color 0.3s" }}>
            <div class="card-body bg-danger" style={{ backgroundColor: "#FF5733", transition: "background-color 0.3s" }}>
              <div class="rotate">
                <i class="fa fa-users fa-4x"></i>
              </div>
              <Center><h6 class="text-uppercase">Users</h6></Center>
              <Center><h1 class="display-4">{user?.length}</h1></Center>
            </div>
          </div>
        </Link>
      </div>

      <div class="col-xl-3 col-sm-6 py-2" style={{ width: "25%", height: "30vh", backgroundColor: "#65CC71", margin: "30px" }}>
        <Link to={'/viewAllBooking'}>
          <div class="card text-white bg-success h-100" style={{ backgroundColor: "#65CC71", transition: "background-color 0.3s" }}>
            <div class="card-body bg-success" style={{ backgroundColor: "#65CC71", transition: "background-color 0.3s" }}>
              <div class="rotate">
                <i class="fa fa-book fa-4x"></i>
              </div>
              <Center><h6 class="text-uppercase">Bookings</h6></Center>
              <Center><h1 class="display-4">{data?.length}</h1></Center>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
  <div style={{ width: "100%" }}>
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
      <div class="col-xl-3 col-sm-6 py-2" style={{ width: "25%", height: "30vh", backgroundColor: "#3399FF", transition: "background-color 0.3s", margin: "30px" }}>
        <Link to={'/viewAllBook'}>
          <div class="card bg-info text-white h-100" style={{ backgroundColor: "#3399FF", transition: "background-color 0.3s" }}>
            <div class="card-body bg-info" style={{ backgroundColor: "#3399FF", transition: "background-color 0.3s" }}>
              <div class="rotate">
              <i class="fa fa-book-open fa-4x"></i>
              </div>
              <Center><h6 class="text-uppercase">Books</h6></Center>
              <Center><h1 class="display-4">{book.length}</h1></Center>
            </div>
          </div>
        </Link>
      </div>
      <div class="col-xl-3 col-sm-6 py-2" style={{ width: "25%", height: "30vh", backgroundColor: "#FFD700", margin: "30px" }}>
        <Link to={'/viewAllAthors'}>
          <div class="card text-white bg-warning h-100" style={{ backgroundColor: "#FFD700", transition: "background-color 0.3s" }}>
            <div class="card-body bg-warning" style={{ backgroundColor: "#FFD700", transition: "background-color 0.3s" }}>
              <div class="rotate">
              <i class="fa fa-users fa-4x"></i>
              </div>
              <Center><h6 class="text-uppercase">Author</h6></Center>
              <Center><h1 class="display-4">{author.length}</h1></Center>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
</div>


    </div>
  )
}
