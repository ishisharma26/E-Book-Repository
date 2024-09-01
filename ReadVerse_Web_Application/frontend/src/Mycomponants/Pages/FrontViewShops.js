import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate ,Link  } from 'react-router-dom';
import { useToast} from '@chakra-ui/react'

function FrontViewShops() {

    const [data, setData] = useState([]);
    const [record, setRecord] = useState([]);
    const [genre, setGenre] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Adjust items per page as needed
    const navigate=useNavigate()
    const toast = useToast()

    useEffect(() => {
        axios.get(`http://localhost:5000/admin/getAllBook`)
            .then((result) => {
                setData(result.data.result);
                setRecord(result.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/admin/getAllGenre`)
            .then((result) => {
                setGenre(result.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // const handleFilter = (e) => {
    //     const searchTerm = e.target.value.toLowerCase();
    //     const newdata = data.filter(row => {
    //         const firstNameMatch = row.title.toLowerCase().includes(searchTerm);
    //         const firstNameMatch2 = row.genreId?.name.toLowerCase().includes(searchTerm);
    //         const firstNameMatch3 = row.price.toLowerCase().includes(searchTerm);
    //         return firstNameMatch || firstNameMatch2 || firstNameMatch3;
    //     });
    //     setRecord(newdata);
    // };
    const [priceRange, setPriceRange] = useState(0); // Add this state variable

    const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const newPriceRange = parseInt(e.target.value); // Update priceRange state
        setPriceRange(newPriceRange);
    
        const newdata = data.filter(row => {
            const firstNameMatch = row.title.toLowerCase().includes(searchTerm);
            const firstNameMatch2 = row.genreId?.name.toLowerCase().includes(searchTerm);
            const firstNameMatch3 = row.price >= 0 && row.price <= newPriceRange; // Filter by updated price range
            return firstNameMatch || firstNameMatch2 || firstNameMatch3;
        });
        setRecord(newdata);
    };
    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = record.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const getRangeInputStyle = () => {
        // Define your dynamic styles here
        let thumbColor;
        if (priceRange < 1000) {
            thumbColor = 'green';
        } else if (priceRange < 5000) {
            thumbColor = 'yellow';
        } else {
            thumbColor = 'red';
        }

        return {
            width: '20px',
            height: '20px',
            backgroundColor: thumbColor,
            borderRadius: '50%',
            cursor: 'pointer',
            marginTop: '-8px'
        };
    };
    
    const handleFilter2 = (searchTerm) => {
        const searchTermLowercase = searchTerm.toLowerCase();
        const newdata = data.filter(row => {
            const firstNameMatch = row.title.toLowerCase().includes(searchTermLowercase);
            const firstNameMatch2 = row.genreId?.name.toLowerCase().includes(searchTermLowercase);
            const firstNameMatch3 = row.price >= 0 && row.price <= priceRange;
            return firstNameMatch || firstNameMatch2 || firstNameMatch3;
        });
        setRecord(newdata);
    };

    const HendleClick=(row)=>{
        navigate("/frontItemDetails",{state:{book:row}});
    }

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
            <h1 class="text-center text-white display-6">Shop</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><Link to="/"> Home </Link ></li>
                <li class="breadcrumb-item active text-white">Shop</li>
            </ol>
        </div>
        <div class="container-fluid fruite py-5">
            <div class="container py-5">
            <center>  <h1 style={{paddingBottom:"10vh"}} class="mb-4">Book Shop</h1> </center>
                <div class="row g-4">
                    <div class="col-lg-12">
                        <div class="row g-4">
                            <div class="col-xl-3">
                                <div class="input-group w-100 mx-auto d-flex">
                                    <input onChange={handleFilter} type="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1"/>
                                    <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                                </div>
                            </div>
                            <div class="col-6">

                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col-lg-3">
                                <div class="row g-4">
                                    <div class="col-lg-12">
                                        <div class="mb-3">
                                            <h4>Categories</h4>
                                            <ul class="list-unstyled fruite-categorie">
                                               {genre.map((g)=>(
                                                 <li key={g._id}>
                                                <div class="d-flex justify-content-between fruite-name">
                                                 <a href="#" onClick={() => handleFilter2(g.name)}>
                                                  <i class="fas fa-apple-alt me-2"></i>
                                                   {g.name}
                                                      </a>
                                                  </div>
                                             </li>
                                               ))}
                                           
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
    <div class="mb-3">
        <h4 class="mb-2">Price</h4>
        <input 
                    type="range" 
                    className="form-range w-100" 
                    id="rangeInput" 
                    name="rangeInput" 
                    min="0" 
                    max="50000" 
                    value={priceRange} 
                    onInput={handleFilter} 
                    style={getRangeInputStyle()} // Apply dynamic style here
                />
        <output id="amount" name="amount" min="0"  max="50000" for="rangeInput"> 0 to {priceRange}</output>
    </div>
</div>
                                 
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="row g-4 justify-content-center">
                                    {
                                       currentItems.map((r)=>(
                                        <div key={r._id}  class="col-md-6 col-lg-6 col-xl-4">
                                        <div   class="rounded position-relative fruite-item">
                                            <div onClick={() => HendleClick(r)} class="fruite-img">
                                                <img style={{height:"200px"}}  src={`http://localhost:5000/images/${r.pic}`} class="img-fluid w-100 rounded-top" alt=""/>
                                            </div>
                                            <div onClick={() => HendleClick(r)} class="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: "10px", left: "10px"}}>
                                          {r.genreId?.name}
                                          </div>

                             <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                     <h4>{r.title.toUpperCase()}</h4>
                                      <div style={{height:"50px",width:"100%", overflow: "hidden"}}>
                                         <p style={{height: "100%", overflow: "hidden"}}>{r.dis}  </p>
                                        </div>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold mb-0"> ₹ {r.price}</p>
                                     <button  onClick={()=>AddToCart(r._id)} class="btn border border-secondary rounded-pill px-3 text-primary">
                                     <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                             </button>
                                             <button style={{margin:"10px"}} onClick={()=>AddToWhisList(r._id)}  class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i class="fas fa-heart fa-fw me-2 text-primary"></i> Add to Wishlist</button> 

                                         </div>
                                         
                                          </div>
                                        
                                        </div>
                                    </div>
                                       )) 
                                    }
                                   <div class="col-12">
                                 <div class="pagination d-flex justify-content-center mt-5">
                             <a href="#" class="rounded" onClick={() => paginate(currentPage - 1)}>&laquo;</a>
                              {record.length > 0 &&
                                 Array.from({ length: Math.ceil(record.length / itemsPerPage) }, (_, index) => (
                                   <a href="#" class={`rounded ${currentPage === index + 1 ? 'active' : ''}`} key={index} onClick={() => paginate(index + 1)}>{index + 1}</a>
                                    ))}
                                   <a href="#" class="rounded" onClick={() => paginate(currentPage + 1)}>&raquo;</a>
                                    </div>
                                     </div>

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

export default FrontViewShops