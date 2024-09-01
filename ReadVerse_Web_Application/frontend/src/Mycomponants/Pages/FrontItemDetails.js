import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
function FrontItemDetails() {
    const location=useLocation()
    const {book}=location.state?location?.state:{book:""}
    const toast = useToast()
    
    const AddToCart=(productId)=>{
        toast({
            title: 'Please Login ',
            description: "If You Want Add This Product in Cart You Should Login",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })  
    }
    const AddToWhisList=(productId)=>{
        toast({
            title: 'Please Login ',
            description: "If You Want Add This Product in Wishlist You Should Login",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })  
    }

  return (
    <div>
        <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Book Details</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Pages</a></li>
                <li class="breadcrumb-item active text-white">Book Details</li>
            </ol>
        </div>
        <div class="container-fluid py-5 mt-5" style={{display:"flex",justifyContent:"center"}}>
            <div class="container py-5"  style={{display:"flex",justifyContent:"center"}} >
                <div class="row g-4 mb-5"  style={{display:"flex",justifyContent:"center",borderWidth:"30px"}} >
                    <div class="col-lg-8 col-xl-9" style={{height:"100%",width:"100%"}}>
                        <div class="row g-4" style={{height:"100%",width:"100%"}}>
                            <div class="col-lg-6">
                                <div class="border rounded">
                                 <img  src={`http://localhost:5000/images/${book?.pic}`}  class="img-fluid rounded" alt="Image" style={{height:"100%",width:"100%"}} />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <h4 class="fw-bold mb-3">{book.title}</h4>
                                <p class="mb-3">Category: {book.genreId?.name}</p>
                                <h5 class="fw-bold mb-3"> ₹ {book.price}</h5>
                                <div class="d-flex mb-4">
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star text-secondary"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <p class="mb-4">{book.dis}</p>
                             
                                {/* <div class="input-group quantity mb-5" >
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-minus rounded-circle bg-light border" >
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control form-control-sm text-center border-0" value="1"/>
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-plus rounded-circle bg-light border">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div> */}
                               
                                <button onClick={()=>AddToCart(book._id)}  class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
                                  <button onClick={()=>AddToWhisList(book._id)}  class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i class="fas fa-heart fa-fw me-2 text-primary"></i> Add to Wishlist</button>
                            </div>
                          
                        </div>
                    </div>
                
                </div>
                
            </div>
        </div>

    </div>
  )
  
}

export default FrontItemDetails