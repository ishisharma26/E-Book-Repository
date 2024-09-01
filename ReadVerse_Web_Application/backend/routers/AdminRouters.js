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
const AdminModel = require('../models/AdminModel');
const GenreModel = require('../models/GenreModel');
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
          storage: storage
      })    

    
    const verifyuser= async (req,res,next)=>{
        console.log(req.cookies)
        const token=req.cookies.Token;
        console.log(token)
        if(!token){
           return res.json({Error:"The token was not available"})
        }else{
         jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
        if(err){
         console.error(err)
         return res.json({Error:"Token is  wrong"})
        }
        console.log(decoded);
        req.role=decoded.role;
        req.user=decoded.user
        req.id=decoded.id
        next()
    
       })
    
        }
    }
    
    router.post('/login',async(req,res)=>{
       const {username,password} =req.body
        
       AdminModel.findOne({username:username}).
       then((data)=>{
        if(!data){
            return res.json({message:"Sorry admin not exit"})
        }
        if(data && data.password!=password){
            return res.json({message:"Sorry your password is wrong !"})
        }
    
        const token = jwt.sign(
            { role : 'admin',id:data._id, user:data },
            "jwt-secret-key",
            { expiresIn:"1d" }
         )
    
         res.cookie('Token',token);
         console.log(token)
         res.json({message:"Admin login Succesfully !",data,token}) 
    
       })
       .catch((error)=>{
         res.json({message:"Admin login Unsuccesfully !",error}) 
       })
    
    
    
    })  

    router.get('/logout',async(req,res)=>{
        res.clearCookie('Token');
        console.log(res.cookies)
        return res.json( {Status: 'Logout successful'});
    
    })

    router.put('/changePassword', verifyuser, async(req, res) => {
        const userId = req.id;
        console.log("userId", userId)
        const { currentPassword, newPassword } = req.body;
       
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid user ID.' });
        }
      
        AdminModel.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(200).json({ message: 'User not found.' });
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
                res.status(500).json({ message: 'User update failed.' });
              });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Password change failed.' });
          });
      });


    router.post("/createGenre",async(req,res)=>{
       const {name} =req.body
       GenreModel.create({name})
       .then((result)=>{
        res.json({message:"Genre SuccessFully Created",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry Genre SuccessFully not Created",error})
       })
    })  
    router.put("/updateGenre/:id",async(req,res)=>{
      const id=req.params.id
       const {name} =req.body
       GenreModel.findByIdAndUpdate(id,{name})
       .then((result)=>{
        res.json({message:"Genre SuccessFully Updated",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry Genre SuccessFully not Updated",error})
       })
    })  
    router.delete("/deleteGenre/:id",async(req,res)=>{
      const id=req.params.id
      
       GenreModel.findByIdAndDelete(id)
       .then((result)=>{
        res.json({message:"Genre SuccessFully Deleted",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry Genre SuccessFully not Deleted",error})
       })
    })  

    router.get("/getAllGenre",async(req,res)=>{
       GenreModel.find({})
       .then((result)=>{
        res.json({message:"We Get All Genre",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry We Cont Not Get All Genre",error})
       })
    })  
    router.get("/getAllBook",async(req,res)=>{
       ProductModel.find({})
       .populate("genreId")
       .populate("authorId")
       .then((result)=>{
        res.json({message:"We Get All Genre",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry We Cont Not Get All Genre",error})
       })
    })  

//     router.put("/updateFlight/:id",verifyuser, upload.single("pic"), async (req, res) => {
//       const id=req.params.id
  
//       // Retrieve the existing destination by ID
//       try {
//           const flight = await FlightModel.findById(id);
//           if (!flight) {
//               return res.status(404).json({ message: "Flight not found" });
//           }
  
//           // Update picture names only if new ones are provided, else retain the previous ones
//           const pic = req.file ? req.file.filename : flight.pic;  
  
//           // Update other fields
//           const {economicSeatFare,economicSeats,businessSeatFare,businessSeats,days,
//             destinationCityDTime,destinationCityATime,fromCityDTime,fromCityATime,
//             destinationCity,fromCity,airportName,flightNumber,flightName,companyName
//             } =req.body
  
//           // Update the destination
//           const updatedflight = await FlightModel.findByIdAndUpdate(id, {pic,economicSeatFare,economicSeats,businessSeatFare,businessSeats,days,
//             destinationCityDTime,destinationCityATime,fromCityDTime,fromCityATime,
//             destinationCity,fromCity,airportName,flightNumber,flightName,companyName
//             }, { new: true });
  
//           res.json({ message:"Flight successfully updated", flight: updatedflight });
//       } catch (error) {
//           res.status(500).json({ message: "Failed to update Flight", error });
//       }
//   });
   
//     router.get('/getAllFlight',async(req,res)=>{
//       FlightModel.find({})
//       .then((result)=>{
//         res.json({message:"We get all Flight",result})
//       })
//       .catch((error)=>{
//          res.json({message:"We can not get all Flight",error})
//       })

//     })
   
//     router.delete('/deleteFlight/:id',async(req,res)=>{
//       const id=req.params.id
//       FlightModel.findByIdAndDelete(id)
//       .then((result)=>{
//         res.json({message:"Flight SuccesFully Deleted",result})
//       })
//       .catch((error)=>{
//          res.json({message:"Flight SuccesFully Not Delete",result})
//       })

//     })

//     router.get('/getFlight/:id',async(req,res)=>{
//       const id=req.params.id
//       FlightModel.findById(id)
//       .then((result)=>{
//         res.json({message:"Flight SuccesFully Get",result})
//       })
//       .catch((error)=>{
//          res.json({message:"Flight SuccesFully Not Get",result})
//       })

//     })
   
//     router.post("/createDestination",upload.single("pic"),async(req,res)=>{
//       const pic = req.file ? req.file.filename : null;  
   
//       const {cityName,airportName,countryName} =req.body
   
//       DestinationModel.create({cityName,airportName,countryName,pic})
//       .then((result)=>{
//        res.json({message:"Destination SuccessFully Created",result})
//       })
//       .catch((error)=>{
//        res.json({message:"Sorry Destination SuccessFully not Created",error})
//       })
       

//    })  
  
//    router.get('/getAllDestination',async(req,res)=>{
//     DestinationModel.find({})
//     .then((result)=>{
//       res.json({message:"We get all Destination",result})
//     })
//     .catch((error)=>{
//        res.json({message:"We can not get all Destination",error})
//     })

//   })

//   router.delete('/deleteDestination/:id',async(req,res)=>{
//     const id=req.params.id
//     DestinationModel.findByIdAndDelete(id)
//     .then((result)=>{
//       res.json({message:"Destination SuccesFully Deleted",result})
//     })
//     .catch((error)=>{
//        res.json({message:"Destination SuccesFully Not Delete",result})
//     })

//   })

//   router.put("/updateDestination/:id", upload.single("pic"), async (req, res) => {
//     const id=req.params.id

//     // Retrieve the existing destination by ID
//     try {
//         const destination = await DestinationModel.findById(id);
//         if (!destination) {
//             return res.status(404).json({ message: "Destination not found" });
//         }

//         // Update picture names only if new ones are provided, else retain the previous ones
//         const pic = req.file ? req.file.filename : destination.pic;  

//         // Update other fields
//         const  {cityName,airportName,countryName} =req.body

//         // Update the destination
//         const updateddestination = await DestinationModel.findByIdAndUpdate(id, {cityName,airportName,countryName,pic}, { new: true });

//         res.json({ message:"Destination successfully updated", destination: updateddestination });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to update Destination", error });
//     }
// });
  

module.exports=router;
 