import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,Avatar,} from '@chakra-ui/react'
import axios from 'axios';

function AdminPanel() {
    axios.defaults.withCredentials = true;
    const navigate=useNavigate()
    const [user,setUser]=useState()


    const handleLogout=(e)=>{
        e.preventDefault();
        axios.get(`http://localhost:5000/admin/logout`)
        .then((result)=>{
          if(result.data.Status ==='Logout successful'){
            alert("Admin Logout Successfull")
            navigate("/")
          }
          else{
            alert("Admin not Logout Successfull")
          }
        })
        .catch(()=>{
          alert("Admin Not  Logout Successfull deo to backend error")
        })
  
      }
  
    useEffect(()=>{
        axios.get(`http://localhost:5000/user/home`)
        .then((result)=>{
          if(result.data.Status==="Success"){
            console.log(result.data.user)
            setUser(result.data.user)
          }else{
            navigate('/')
          }

        }).catch((error)=>{
          console.log(error)
          navigate('/')
        })
      },[])



  return (
    <div>
        <div className="container-fluid fixed-top">
         <div className="container topbar bg-primary d-none d-lg-block">
            <div className="d-flex justify-content-between">
                <div className="top-info ps-2">
                    <small className="me-3 text-white">
                        <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                        <a href="#" className="text-white">123 Street, New York</a>
                    </small>
                    <small className="me-3 text-white">
                        <i className="fas fa-envelope me-2 text-secondary"></i>
                        <a href="#" className="text-white">Email@Example.com</a>
                    </small>
                </div>
                <div className="top-link pe-2">
                    <a href="#" className="text-white">
                        <small className="text-white mx-2">Privacy Policy</small>
                    </a>
                    /
                    <a href="#" className="text-white">
                        <small className="text-white mx-2">Terms of Use</small>
                    </a>
                    /
                    <a href="#" className="text-white">
                        <small className="text-white ms-2">Sales and Refunds</small>
                    </a>
                </div>
            </div>
        </div>
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
        <Link to="adminDashBoard" className="navbar-brand"><h1 className="text-primary display-6">ReadVerse</h1></Link>
        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars text-primary"></span>
        </button>
        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
          <div className="navbar-nav mx-auto">
          
            <Link to="adminDashBoard" className="nav-item nav-link">DashBoard</Link>
            <Link to="viewAllUser" className="nav-item nav-link">View User</Link>
           
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Author</a>
              <div className="dropdown-menu m-0 bg-secondary rounded-0">
                <Link to="viewAllAthors" className="dropdown-item">View All Author</Link>
                <Link to="viewAllRquestedAuthor" className="dropdown-item">View Requested Author</Link>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Genres</a>
              <div className="dropdown-menu m-0 bg-secondary rounded-0">
                <Link to="addGenres" className="dropdown-item">Add Genres</Link>
                <Link to="viewAllGenre" className="dropdown-item">View All Genres</Link>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Book</a>
              <div className="dropdown-menu m-0 bg-secondary rounded-0">
                <Link to="viewAllBook" className="dropdown-item">View All Book</Link>
                <Link to="viewAllGenre" className="dropdown-item">View All Genres</Link>
              </div>
            </div>
            <Link to="viewAllBooking" className="nav-item nav-link">View All Booking</Link>
          </div>
          <div className="d-flex m-3 me-0">
         
            <a href="#" className="my-auto">
              {/* <i className="fas fa-user fa-2x"></i> */}
              <Menu  className="nav-menu" >
                                <MenuButton className="menu-has-children">
                                <Avatar size={'sm'} cursor={'pointer'} name={user?.name}  src={`http://localhost:5000/images/${user?.pic}`} />
                                </MenuButton>
                                <MenuList >
                                <MenuItem style={{backgroundColor:"#81c408" ,color:"white"}} onClick={handleLogout} > Logout</MenuItem>
                                <MenuDivider />
                                <MenuItem style={{backgroundColor:"#81c408",color:"white"}} >  <Link to={'adminChangePassword'} > Change Password  </Link> </MenuItem>
                                </MenuList>
             </Menu>
            </a>
          </div>
        </div>
         </nav>
        </div>

        <Outlet/>


    </div>
  )
}

export default AdminPanel