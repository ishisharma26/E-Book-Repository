import React from 'react'
import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';


function Category() {
  const [data2, setData2] = useState([]);
  const [record2, setRecord2] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [itemsPerPage2] = useState(6);
  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
  const currentItems2 = record2.slice(indexOfFirstItem2, indexOfLastItem2);

  const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);
  useEffect(()=>{
    axios.get(`http://localhost:5000/admin/getAllGenre`)
    .then((result)=>{
        console.log(result.data.result)
        setData2(result.data.result)
        setRecord2(result.data.result)
    })
    .catch((error)=>{
        console.log(error)
    }) 
   },[])


 
  return (
    <div>
         <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Genre Category</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><Link to="/"> Home </Link></li>
                <li class="breadcrumb-item active text-white">Genre Category</li>
            </ol>
        </div>
         <div class="container-fluid fruite py-5">
            <div class="container py-5">
               <center>  <h1 style={{paddingBottom:"10vh"}} class="mb-4">All Genre</h1> </center>
                <div class="row g-4">
                    <div class="col-lg-12">
                                <div class="row g-4 justify-content-center">
                                    {
                                       currentItems2.map((r)=>(
                                        <div key={r._id}  class="col-md-6 col-lg-6 col-xl-4">
                                        <div style={{height:"200px",borderWidth:"10px" ,backgroundColor:"orange",borderBlockColor:"red"}} class="rounded position-relative fruite-item">
                                        <center> 
                                        <div style={{height:"180px"}} class="fruite-img p-4 border border-secondary border-top-0 rounded-bottom">
                                       <h4 style={{color:"black",marginTop:"7vh"}} >{r?.name?.toUpperCase()}</h4> 
                                         </div>
                                         </center>
                                        </div>
                                    </div>
                                       )) 
                                    }
                                   <div class="col-12">
                                 <div class="pagination d-flex justify-content-center mt-5">
                             <a href="#" class="rounded" onClick={() => paginate2(currentPage2 - 1)}>&laquo;</a>
                              {record2.length > 0 &&
                                 Array.from({ length: Math.ceil(record2.length / itemsPerPage2) }, (_, index) => (
                                   <a href="#" class={`rounded ${currentPage2 === index + 1 ? 'active' : ''}`} key={index} onClick={() => paginate2(index + 1)}>{index + 1}</a>
                                    ))}
                                   <a href="#" class="rounded" onClick={() => paginate2(currentPage2 + 1)}>&raquo;</a>
                                    </div>
                                     </div>

                                </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Category