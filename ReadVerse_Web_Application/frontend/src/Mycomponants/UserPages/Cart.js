import React , {useEffect, useState}from 'react'
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
    const [data,setData] =useState([])
    const [cart,setCart]=useState({})
    const navigate=useNavigate()
    let Total=0;
    data?.map((d)=>(
     Total+=d?.productId?.price*d?.quantity
    ))

    useEffect (()=>{
        axios.get(`http://localhost:5000/user/getCart`)
        .then((result)=>{
            console.log(result.data.result[0].products)
            setData(result.data.result[0].products)
            setCart(result.data.result[0])
        })
        .catch((error)=>{
            console.log(error)
        }) 

       },[data])
    
       const AddToCart=(productId)=>{
        const confirmed=window.confirm(
            "Are you sure you want Increment Quantity of This Product ?"
           );
         
       if(confirmed){
        if(!productId){
            alert("Please Fill All filds")
            return
        }
    
        axios.post(`http://localhost:5000/user/addToCart/${productId}`)
        .then((result)=>{
          console.log(result.data)
           if(result.data.message==='Product added to cart successfully.'){
            // alert("Product added to cart successfully");
           }
           else{
            alert("Product Not Incremet  Quantity of the Cart Successfully");
           }
        })
        .catch((error)=>{
         console.log(error)
         alert("Product Not added to cart successfully Due To Backend!");
        })
    
       }
       
        }

       const AddToCart3=(productId)=>{
        const confirmed=window.confirm(
            "Are you sure you want Remove of This Product ?"
           );
         
       if(confirmed){
        if(!productId){
            alert("Please Fill All filds")
            return
        }
    
        axios.post(`http://localhost:5000/user/removeProduct/${productId}`)
        .then((result)=>{
          console.log(result.data)
           if(result.data.message==='Product removed successfully.'){
            setData(data.filter((p)=> p?.productId?._id!==productId )); 
           }
           else{
            alert("Product Not removed successfully.");
           }
        })
        .catch((error)=>{
         console.log(error)
         alert("Product Not Removed Successfully Due To Backend!");
        })
    
       }
       
        }



       const AddToCart2=(productId ,q )=>{
        if(q<2){
           return alert("Sorry You Cant Not Decrement The Quantity of This Product !")
        }

        const confirmed=window.confirm(
            "Are you sure you want Decrement Quantity of This Product ?"
           );
         
       if(confirmed){
        if(!productId){
            alert("Please Fill All filds")
            return
        }
    
        axios.post(`http://localhost:5000/user/decrementQuantity/${productId}`)
        .then((result)=>{
          console.log(result.data)
           if(result.data.message ==='Product Decrement Quantity successfully.'){
            // alert("Product added to cart successfully");
           }
           else{
            alert("The Quantity of the Product Not  Decrement  Successfully");
           }
        })
        .catch((error)=>{
         console.log(error)
         alert("The  Quantity of the Product Not  Decrement  Successfully Due To Backend!");
        })
    
          }
       
        }

       const HandleSubmit=()=>{
        navigate("/paymentPage",{state:{cart:cart}})
       }


  return (
    <div>
        <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Cart</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><Link to="/viewShops">Home</Link></li>
                <li class="breadcrumb-item active text-white">Cart</li>
            </ol>
        </div>
        <div class="container-fluid py-5">
            <div class="container py-5">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Products</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Handle</th>
                          </tr>
                        </thead>
                        <tbody>
                         { data ?data?.map((d)=>(
                               <tr key={d} >
                               <th scope="row">
                                   <div class="d-flex align-items-center">
                                       <img src={`http://localhost:5000/images/${d?.productId?.pic}`} class="img-fluid me-5 rounded-circle" style={{width: "80px", height: "80px"}} alt="" />
                                   </div>
                               </th>
                               <td>
                                   <p class="mb-0 mt-4">{d?.productId?.title}</p>
                               </td>
                               <td>
                                   <p class="mb-0 mt-4"> {d?.productId?.price}</p>
                               </td>
                               <td>
                                   <div class="input-group quantity mt-4" style={{width: "100px"}}>
                                       <div class="input-group-btn">
                                           <button onClick={()=>AddToCart2(d?.productId?._id,d?.quantity)} class="btn btn-sm btn-minus rounded-circle bg-light border" >
                                           <i class="fa fa-minus"></i>
                                           </button>
                                       </div>
                                       <input type="text" class="form-control form-control-sm text-center border-0" value={d?.quantity}/>
                                       <div class="input-group-btn">
                                           <button onClick={()=>AddToCart(d?.productId?._id)} class="btn btn-sm btn-plus rounded-circle bg-light border">
                                               <i class="fa fa-plus"></i>
                                           </button>
                                       </div>
                                   </div>
                               </td>
                               <td>
                                   <p class="mb-0 mt-4">{d?.productId?.price*d?.quantity}</p>
                               </td>
                               <td>
                                   <button  onClick={()=>AddToCart3(d?.productId?._id)} class="btn btn-md rounded-circle bg-light border mt-4" >
                                       <i class="fa fa-times text-danger"></i>
                                   </button>
                               </td>
                           
                           </tr>
                         )):<>No Product Available </>
                               
                         }
                           
                        </tbody>
                    </table>
                </div>
            
                <div class="row g-4 justify-content-end">
                    <div class="col-8"></div>
                    <div class="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                        <div class="bg-light rounded">
                            <div class="p-4">
                                <h1 class="display-6 mb-4">Cart <span class="fw-normal">Total</span></h1>
                                <div class="d-flex justify-content-between mb-4">
                                    <h5 class="mb-0 me-4">Subtotal:</h5>
                                    <p class="mb-0"> ₹ {Total}</p>
                                </div>
                          
                            </div>
                            <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                <h5 class="mb-0 ps-4 me-4">Total</h5>
                                <p class="mb-0 pe-4"> ₹ {Total}</p>
                            </div>
                            <button onClick={HandleSubmit} class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
