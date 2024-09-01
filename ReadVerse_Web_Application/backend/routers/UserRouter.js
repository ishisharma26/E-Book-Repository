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
const CartModel = require('../models/CartModel');
const BookingModel = require('../models/BookingModel');
const ProductModel = require('../models/ProductModel');
const WishListModel = require('../models/WishListModel')





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
    
    router.get('/download-pdf/:productId', async (req, res) => {
      const productId = req.params.productId;
  
      try {
          // Find the product by ID
          const product = await ProductModel.findById(productId);
  
          if (!product) {
              return res.status(404).send('Product not found');
          }
  
          // Ensure the product has a PDF associated with it
          if (!product.pdf) {
              return res.status(404).send('PDF not found for this product');
          }
  
          // Construct the file path to the PDF
          const filePath = path.resolve(__dirname, '..', 'public/images', product.pdf);
  
          // Download the PDF file
          res.download(filePath, `${product.title}.pdf`, (err) => {
              if (err) {
                  console.error('Error downloading PDF:', err);
                  return res.status(500).send('Error downloading PDF');
              }
          });
      } catch (error) {
          console.error('Error downloading PDF:', error);
          res.status(500).send('Error downloading PDF');
      }
  });
  

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
    

    router.post("/signup",upload.single("pic"),async(req,res)=>{
        const pic = req.file ? req.file.filename : null;  
    
       const {fname,lname,email,password,contact}=req.body
    
       UserModel.create({pic,fname,lname,email,password,contact})
       .then((result)=>{
        res.json({message:"User SuccessFully Created",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry User SuccessFully not Created",error})
       })
        
    })
   
    router.post('/login',async(req,res)=>{
        const {email,password} =req.body
         
        UserModel.findOne({email}).
        then((data)=>{
         if(!data){
             return res.json({message:"Sorry User not exit"})
         }
         if(data && data.password!=password){
             return res.json({message:"Sorry your password is wrong !"})
         }
        //  if(data && data.status!="Accept"){
        //    return res.json({message:"User login Unsuccesfully deo to status!"}) 
        //  }
     
         const token = jwt.sign(
             { role : 'user',user:data,id:data._id},
             "jwt-secret-key",
             { expiresIn:"1d" }
          )
     
          res.cookie('Token',token);
          console.log(token)
          res.json({message:"User login Succesfully !",data,token}) 
     
        })
        .catch((error)=>{
          res.json({message:"User login Unsuccesfully !",error}) 
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
      
        UserModel.findById(userId)
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
    

    router.delete('/deleteUser/:id',async(req,res)=>{
      const id=req.params.id
      UserModel.findByIdAndDelete(id)
      .then((result)=>{
        res.json({message:"User SuccesFully Deleted",result})
      })
      .catch((error)=>{
         res.json({message:"User SuccesFully Not Delete",result})
      })

    })
    
    router.get('/getUser',verifyuser,async(req,res)=>{
      
      const id=req.user._id
      UserModel.findById(id)
      .then((result)=>{
        res.json({message:"We get all user",result})
      })
      .catch((error)=>{
         res.json({message:"We can not get all User",error})
      })

    })
    router.get('/getAllUser',async(req,res)=>{
      UserModel.find({})
      .then((result)=>{
        res.json({message:"We get all user",result})
      })
      .catch((error)=>{
         res.json({message:"We can not get all User",error})
      })

    })
   
    router.put("/updateProfile",verifyuser, upload.single("pic"), async (req, res) => {
      const id=req.user._id
  
      // Retrieve the existing destination by ID
      try {
          const user = await UserModel.findById(id);
          if (!user) {
              return res.status(404).json({ message: "user not found" });
          }
  
          // Update picture names only if new ones are provided, else retain the previous ones
          const pic = req.file ? req.file.filename : user.pic;  
  
          // Update other fields
          const {fname,lname,email,password,contact} = req.body;
  
          // Update the destination
          const updatedUser = await UserModel.findByIdAndUpdate(id, {pic,fname,lname,email,password,contact}, { new: true });
  
          res.json({ message: "User successfully updated", user: updatedUser });
      } catch (error) {
          res.status(500).json({ message: "Failed to update User", error });
      }
  });
   
  router.post('/removeProduct/:productId', verifyuser, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id; // Extract user ID from the authenticated user

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid product ID.' });
    }

    try {
        // Find the user's cart
        let cart = await CartModel.findOne({ userId: userId });

        // If cart does not exist, return an error
        if (!cart) {
            return res.status(400).json({ error: 'Cart is not present.' });
        }

        // Check if the product already exists in the cart
        const existingProductIndex = cart.products.findIndex(product => product.productId.equals(productId));

        if (existingProductIndex !== -1) {
            // If the product exists, remove it from the array
            cart.products.splice(existingProductIndex, 1);
        } else {
            return res.status(404).json({ error: 'Product not found in the cart.' });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ status: 'Success', message: 'Product removed successfully.', cart: cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove product from cart.' });
    }
});

  router.post('/removeWishList/:productId', verifyuser, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id; // Extract user ID from the authenticated user

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid product ID.' });
    }

    try {
        // Find the user's cart
        let cart = await WishListModel.findOne({ userId: userId });

        // If cart does not exist, return an error
        if (!cart) {
            return res.status(400).json({ error: 'Cart is not present.' });
        }

        // Check if the product already exists in the cart
        const existingProductIndex = cart.products.findIndex(product => product.productId.equals(productId));

        if (existingProductIndex !== -1) {
            // If the product exists, remove it from the array
            cart.products.splice(existingProductIndex, 1);
        } else {
            return res.status(404).json({ error: 'Product not found in the cart.' });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ status: 'Success', message: 'Product removed successfully.', cart: cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove product from cart.' });
    }
});


  router.post('/decrementQuantity/:productId', verifyuser, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id; // Extract user ID from the authenticated user

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }
  
    try {
      // Find the user's cart
      let cart = await CartModel.findOne({ userId: userId });
  
      // If cart does not exist, create a new one
      if (!cart) {
        return res.status(400).json({ error: 'Card Is Not Presented' });
      }
  
      // Check if the product already exists in the cart
      const existingProduct = cart.products.find(product => product.productId.equals(productId));
  
      if (existingProduct) {
        // If the product exists, increment the quantity
        existingProduct.quantity -= 1;
      } 
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ status: 'Success', message: 'Product Decrement Quantity successfully.', cart: cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add product to cart.' });
    }

  });
  
  router.post('/addToCart/:productId', verifyuser, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id; // Extract user ID from the authenticated user

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }
  
    try {
      // Find the user's cart
      let cart = await CartModel.findOne({ userId: userId });
  
      // If cart does not exist, create a new one
      if (!cart) {
        cart = new CartModel({ userId: userId, products: [] });
      }
  
      // Check if the product already exists in the cart
      const existingProduct = cart.products.find(product => product.productId.equals(productId));
  
      if (existingProduct) {
        // If the product exists, increment the quantity
        existingProduct.quantity += 1;
      } else {
        // If the product does not exist, add it to the cart with quantity 1
        cart.products.push({ productId: productId, quantity: 1 });
      }
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ status: 'Success', message: 'Product added to cart successfully.', cart: cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add product to cart.' });
    }

  });
 
  router.post('/addToWishList/:productId', verifyuser, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id; // Extract user ID from the authenticated user

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }
  
    try {
      // Find the user's cart
      let cart = await WishListModel.findOne({ userId: userId });
  
      // If cart does not exist, create a new one
      if (!cart) {
        cart = new WishListModel({ userId: userId, products: [] });
      }
  
      // Check if the product already exists in the cart
      const existingProduct = cart.products.find(product => product.productId.equals(productId));
  
      if (existingProduct) {
        // If the product exists, increment the quantity
        existingProduct.quantity += 1;
      } else {
        // If the product does not exist, add it to the cart with quantity 1
        cart.products.push({ productId: productId, quantity: 1 });
      }
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ status: 'Success', message: 'Product added to WishList successfully.', cart: cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add product to cart.' });
    }

  });
  
  router.get('/getCart', verifyuser, async (req, res) => {
    const id = req.user._id;
    CartModel.find({ userId: id })
        .populate({
            path: 'products',
            populate: {
                path: 'productId', // Assuming productId refers to the product's ID
                model: 'Product' // Assuming the name of your product model is 'Product'
            }
        })
        .then((result) => {
            res.json({ message: "We get all cart", result });
        })
        .catch((error) => {
            res.json({ message: "We can not get all cart", error });
        });
});

  router.get('/getWishList', verifyuser, async (req, res) => {
    const id = req.user._id;
    WishListModel.findOne({ userId: id })
        .populate({
            path: 'products',
            populate: {
                path: 'productId', // Assuming productId refers to the product's ID
                model: 'Product' // Assuming the name of your product model is 'Product'
            }
        })
        .populate({
          path: 'products',
          populate: {
              path: 'productId', // Assuming productId refers to the product's ID
              populate: {
                  path: 'genreId', // Assuming genreId refers to the genre's ID within the product model
                  model: 'Genre' // Assuming the name of your genre model is 'Genre'
              }
          }
         })
        .then((result) => {
            res.json({ message: "We get all WishList", result });
        })
        .catch((error) => {
            res.json({ message: "We can not get all WishList", error });
        });
});


  router.get('/getUserBoking', verifyuser, async (req, res) => {
    const id = req.user._id;
    BookingModel.find({ userId: id })
        .populate("userId")
        .populate("products.productId")
        .then((result) => {
            res.json({ message: "We get all Booking", result });
        })
        .catch((error) => {
            console.error("Error populating data:", error); // Log the error for debugging
            res.status(500).json({ message: "An error occurred while populating data", error });
        });
});

// router.get('/getAuthorBoking', verifyuser, async (req, res) => {
//   const id = req.user._id;
//   BookingModel.find({ 'products': { $elemMatch: { 'productId': { $elemMatch: { 'authorId': id } } } } })
//       .populate("userId")
//       .populate("products.productId")
//       .then((result) => {
//           res.json({ message: "We get all Booking", result });
//       })
//       .catch((error) => {
//           console.error("Error populating data:", error); // Log the error for debugging
//           res.status(500).json({ message: "An error occurred while populating data", error });
//       });
// });

// router.get('/getAuthorBoking', verifyuser, async (req, res) => {
//   const id = req.user._id;
//   BookingModel.aggregate([
//       {
//           $match: {
//               'products.productId.authorId': mongoose.Types.ObjectId(id)
//           }
//       },
//       {
//           $unwind: '$products'
//       },
//       {
//           $lookup: {
//               from: 'products',
//               localField: 'products.productId',
//               foreignField: '_id',
//               as: 'products.productId'
//           }
//       },
//       {
//           $group: {
//               _id: '$_id',
//               userId: { $first: '$userId' },
//               products: { $push: '$products' },
//               bookingId: { $first: '$bookingId' },
//               date: { $first: '$date' },
//               total: { $first: '$total' },
//               add: { $first: '$add' },
//               status: { $first: '$status' }
//           }
//       }
//   ])
//   .populate("userId")
//   .exec((err, result) => {
//       if (err) {
//           console.error("Error populating data:", err); // Log the error for debugging
//           res.status(500).json({ message: "An error occurred while populating data", error: err });
//       } else {
//           res.json({ message: "We get all Booking", result });
//       }
//   });
// });



router.get('/getBooking/:id',async(req,res)=>{
  const id=req.params.id
  BookingModel.findById(id)
  .populate("userId")
  .populate("products.productId")
  .then((result)=>{
    res.json({message:"We get all Booking",result})
  })
  .catch((error)=>{
     res.json({message:"We can not get all Booking",error})
  })

})

router.delete('/deleteBooking/:id',async(req,res)=>{
  const id=req.params.id
  BookingModel.findByIdAndDelete(id)
  .then((result)=>{
    res.json({message:"Booking SuccesFully Deleted",result})
  })
  .catch((error)=>{
     res.json({message:"Booking SuccesFully Not Delete",result})
  })

})


router.get('/getAllBooking',async(req,res)=>{
  BookingModel.find({})
  .populate("userId")
  .populate("products.productId")
  .then((result)=>{
    res.json({message:"We get all Booking",result})
  })
  .catch((error)=>{
     res.json({message:"We can not get all Booking",error})
  })

})

router.post('/createBooking', async (req, res) => {
  const {add,total,cartId} =req.body

  try {
    const cart = await CartModel.findById(cartId).populate('products');
    console.log(cart)
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    const bookingProducts = cart.products.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const bookingId = crypto.randomBytes(3).toString('hex').toUpperCase(); // Generate bookingId
    const bookingData = {
      bookingId: bookingId,
      userId: cart.userId, 
      products: bookingProducts,
      add:add,
      total:total,
    };

    const newBooking = new BookingModel(bookingData);
    await newBooking.save();

    await CartModel.findByIdAndDelete(cartId);

    res.status(200).json({ status: 'Success', message: 'Booking created successfully.', bookingId: bookingId });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking.' });
  }
});



// router.get('/download-pdf/:productId', async (req, res) => {
//   const productId = req.params.productId;

//   try {
//       // Find the product by ID
//       const product = await ProductModel.findById(productId);

//       if (!product) {
//           return res.status(404).send('Product not found');
//       }

//       // Ensure the product has a PDF associated with it
//       if (!product.pdf) {
//           return res.status(404).send('PDF not found for this product');
//       }

//       // Construct the file path to the PDF
//       const filePath = path.resolve(__dirname, 'pdfs', product.pdf);

//       // Download the PDF file
//       res.download(filePath, `${product.title}.pdf`, (err) => {
//           if (err) {
//               console.error('Error downloading PDF:', err);
//               return res.status(500).send('Error downloading PDF');
//           }
//       });
//   } catch (error) {
//       console.error('Error downloading PDF:', error);
//       res.status(500).send('Error downloading PDF');
//   }
// });

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