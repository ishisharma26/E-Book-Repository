const express = require('express')
const app = express();
const router=express.Router();
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto= require('crypto')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const UserModel = require('../models/UserModel');
const AuthorModel = require('../models/AuthorModel');
const ProductModel = require('../models/ProductModel');






app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
    }));


    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, 'public/images')
      },
      filename: (req, file, cb) => {
          cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
      }
    })

    
    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
          if (file.fieldname === 'pdf') {
              if (!file.originalname.match(/\.(pdf)$/)) {
                  return cb(new Error('Please upload a PDF file'));
              }
          }
          cb(null, true);
        }
     })
  
    
    const verifyuser= async (req,res,next)=>{
        // console.log(req.cookies)
        const token=req.cookies.Token;
        // console.log(token)
        if(!token){
           return res.json({Error:"The token was not available"})
        }else{
         jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
        if(err){
         console.error(err)
         return res.json({Error:"Token is  wrong"})
        }
        // console.log(decoded);
        req.role=decoded.role;
        req.user=decoded.user
        req.id=decoded.id
        next()
    
       })
    
        }
    }
    
    router.post("/createProduct", verifyuser,upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async(req, res) => {
       const pic = req.files['pic'] ? req.files['pic'][0].filename : null;
      const pdf = req.files['pdf'] ? req.files['pdf'][0].filename : null;
      const authorId=req.user._id
  
      const { genreId, price, title ,dis} = req.body;
  
      ProductModel.create({ pic, pdf, genreId, authorId, price, title ,dis })
          .then((result) => {
              res.json({ message: "Product Successfully Created", result });
          })
          .catch((error) => {
              res.json({ message: "Sorry Product not Created", error });
          });
  });

    router.post("/signup",upload.single("pic"),async(req,res)=>{
        const pic = req.file ? req.file.filename : null;  
    
       const {fname,lname,email,password,contact}=req.body
    
       AuthorModel.create({pic,fname,lname,email,password,contact})
       .then((result)=>{
        res.json({message:"Author SuccessFully Created",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry Author SuccessFully not Created",error})
       })
        
    })
   
    router.post('/login',async(req,res)=>{
        const {email,password} =req.body
         
        AuthorModel.findOne({email:email}).
        then((data)=>{
         if(!data){
             return res.json({message:"Sorry Author not exit"})
         }
         if(data && data.password!=password){
             return res.json({message:"Sorry your password is wrong !"})
         }
         if(data && data.status!="Accept"){
           return res.json({message:"Author login Unsuccesfully deo to status!"}) 
         }
     
         const token = jwt.sign(
             { role : 'author',user:data,id:data._id},
             "jwt-secret-key",
             { expiresIn:"1d" }
          )
     
          res.cookie('Token',token);
          console.log(token)
          res.json({message:"Author login Succesfully !",data,token}) 
     
        })
        .catch((error)=>{
          res.json({message:"Author login Unsuccesfully !",error}) 
        })
     
     
     
     })

    router.get('/logout',async(req,res)=>{
        res.clearCookie('Token');
        console.log(res.cookies)
        return res.json( {Status: 'Logout successful'});
    
    }) 

    router.get('/home',verifyuser,(req,res)=>{
        return res.json({Status:"Success" , role:req.role , user:req.user,})
    })
    
    router.put('/changePassword', verifyuser, async(req, res) => {
        const userId = req.id;
        console.log("userId", userId)
        const { currentPassword, newPassword } = req.body;
       
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid user ID.' });
        }
      
        AuthorModel.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(200).json({ message: 'Author not found.' });
            }
            // Compare the provided current password with the stored password
            if (currentPassword != user.password) {
              return res.status(200).json({ message: 'Current password is incorrect.' });
            }
      
            // Update the user's password with the new password
            user.password = newPassword;
            user.save()
              .then(() => {
                // Password changed successfully
                res.status(200).json({ message: 'Password changed successfully' });
              })
              .catch((saveErr) => {
                console.error(saveErr);
                res.status(500).json({ message: 'Author update failed.' });
              });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Password change failed.' });
          });
      });
    

    router.delete('/deleteUser/:id',async(req,res)=>{
      const id=req.params.id
      AuthorModel.findByIdAndDelete(id)
      .then((result)=>{
        res.json({message:"Author SuccesFully Deleted",result})
      })
      .catch((error)=>{
         res.json({message:"Author SuccesFully Not Delete",result})
      })
    });

    router.delete('/deleteBook/:id',async(req,res)=>{
      const id=req.params.id
      ProductModel.findByIdAndDelete(id)
      .then((result)=>{
        res.json({message:"Product SuccesFully Deleted",result})
      })
      .catch((error)=>{
         res.json({message:"Product SuccesFully Not Delete",result})
      })
    });

    router.delete('/deleteAuthor/:id',async(req,res)=>{
      const id=req.params.id
      AuthorModel.findByIdAndDelete(id)
      .then((result)=>{
        res.json({message:"Author SuccesFully Deleted",result})
      })
      .catch((error)=>{
         res.json({message:"Author SuccesFully Not Delete",result})
      }) 
    });

    

    router.put('/UpdateStatus/:id',async(req,res)=>{
      const id=req.params.id
      const {status} = req.body
      AuthorModel.findByIdAndUpdate(id,{status:status})
      .then((result)=>{
        res.json({message:"Author SuccesFully Update",result})
      })
      .catch((error)=>{
         res.json({message:"Author SuccesFully Not Update",result})
      })

    })
    
    router.get('/getAuthor',verifyuser,async(req,res)=>{
      const id=req.user._id
      AuthorModel.findById(id)
      .then((result)=>{
        res.json({message:"We get all Author",result})
      })
      .catch((error)=>{
         res.json({message:"We can not get all Author",error})
      })

    })

    router.get('/getAllAuthor',async(req,res)=>{
      AuthorModel.find({})
      .then((result)=>{
        res.json({message:"We get all Author",result})
      })
      .catch((error)=>{
         res.json({message:"We can not get all Author",error})
      })

    })

    router.get('/getAuthorBook',verifyuser,async(req,res)=>{
      const id=req.user._id
      ProductModel.find({authorId:id})
      .populate("genreId")
      .then((result)=>{
        res.json({message:"We get all Author",result})
      })
      .catch((error)=>{
         res.json({message:"We can not get all Author",error})
      })

    })

    router.get('/getRequestedAuthor',async(req,res)=>{
      AuthorModel.find({status:"Pending"})
      .then((result)=>{
        res.json({message:"We get all Author",result})
      })
      .catch((error)=>{
         res.json({message:"We can not get all Author",error})
      })

    })
   
    router.put("/updateProfile",verifyuser, upload.single("pic"), async (req, res) => {
      const id=req.user._id
  
      // Retrieve the existing destination by ID
      try {
          const user = await AuthorModel.findById(id);
          if (!user) {
              return res.status(404).json({ message: "Author not found" });
          }
  
          // Update picture names only if new ones are provided, else retain the previous ones
          const pic = req.file ? req.file.filename : user.pic;  
  
          // Update other fields
          const {fname,lname,email,password,contact} = req.body;
  
          // Update the destination
          const updatedUser = await AuthorModel.findByIdAndUpdate(id, {pic,fname,lname,email,password,contact}, { new: true });
  
          res.json({ message: "Author successfully updated", user: updatedUser });
      } catch (error) {
          res.status(500).json({ message: "Failed to update Author", error });
      }
  });

    router.put("/updateBook/:id", upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
      const id=req.params.id
  
      // Retrieve the existing destination by ID
      try {
          const product = await ProductModel.findById(id);
          if (!product) {
              return res.status(404).json({ message: "Product not found" });
          }
  
          // Update picture names only if new ones are provided, else retain the previous ones

          const pic = req.files['pic'] ? req.files['pic'][0].filename : product.pic;
          const pdf = req.files['pdf'] ? req.files['pdf'][0].filename : product.pdf; 
  
          // Update other fields
          const { genreId, price, title,dis } = req.body;
  
          // Update the destination
          const updatedproduct = await ProductModel.findByIdAndUpdate(id, {pic,dis,pdf,genreId, price, title }, { new: true });
  
          res.json({ message: "Product successfully updated", user: updatedproduct });
      } catch (error) {
          res.status(500).json({ message: "Failed to update Product", error });
      }
  });


   
//   router.post("/createContact",async(req,res)=>{
//     const {fname,email,subject,message}=req.body
 
//     ContactModel.create({fname,email,subject,message})
//     .then((result)=>{
//      res.json({message:"Contact SuccessFully Created",result})
//     })
//     .catch((error)=>{
//      res.json({message:"Sorry Contact SuccessFully not Created",error})
//     })
     
//  })
 
//  router.get('/searchFlight', async (req, res) => {
//   let { destinationCity, fromCity } = req.query;

//   // Convert destinationCity and fromCity to lowercase
//   destinationCity = destinationCity.toLowerCase();
//   fromCity = fromCity.toLowerCase();

//   // Use case-insensitive regex for search
//   FlightModel.find({
//     destinationCity: { $regex: new RegExp(destinationCity, 'i') },
//     fromCity: { $regex: new RegExp(fromCity, 'i') }
//   })
//     .then((result) => {
//       res.json({ message: "We get all Flight", result });
//     })
//     .catch((error) => {
//       res.json({ message: "We can not get all Flight", error });
//     });
// });
 
// router.post("/createBooking",verifyuser,async(req,res)=>{
     
//     const userId = req.user._id    
//     const bookingId = crypto.randomBytes(3).toString('hex').toUpperCase();
 
//     const {passengers,total,flightId} =req.body
 
//     BookingModel.create({passengers,total,flightId,userId,bookingId})
//     .then((result)=>{
//      res.json({message:"Booking SuccessFully Created",result})
//     })
//     .catch((error)=>{
//      res.json({message:"Sorry Booking SuccessFully not Created",error})
//     })
     

//  })  
//  router.get('/getUserBoking',verifyuser,async(req,res)=>{
      
//   const id=req.user._id
//   BookingModel.find({userId:id})
//   .populate('userId')
//   .populate('flightId')
//   .then((result)=>{
//     res.json({message:"We get all Booking",result})
//   })
//   .catch((error)=>{
//      res.json({message:"We can not get all Booking",error})
//   })

// })
// router.get('/getAllContact',async(req,res)=>{
//   ContactModel.find({})
//   .then((result)=>{
//     res.json({message:"We get all Contact",result})
//   })
//   .catch((error)=>{
//      res.json({message:"We can not get all Contact",error})
//   })

// })
// router.get('/getAllBooking',async(req,res)=>{
//   BookingModel.find({})
//   .populate('userId')
//   .populate('flightId')
//   .then((result)=>{
//     res.json({message:"We get all Booking",result})
//   })
//   .catch((error)=>{
//      res.json({message:"We can not get all Booking",error})
//   })

// })

// router.delete('/deleteBooking/:id',async(req,res)=>{
//   const id=req.params.id
//   BookingModel.findByIdAndDelete(id)
//   .then((result)=>{
//     res.json({message:"Booking SuccesFully Deleted",result})
//   })
//   .catch((error)=>{
//      res.json({message:"Booking SuccesFully Not Delete",result})
//   })

// })
// router.delete('/deleteContact/:id',async(req,res)=>{
//   const id=req.params.id
//   ContactModel.findByIdAndDelete(id)
//   .then((result)=>{
//     res.json({message:"Contact SuccesFully Deleted",result})
//   })
//   .catch((error)=>{
//      res.json({message:"Contact SuccesFully Not Delete",result})
//   })

// })



    module.exports=router;