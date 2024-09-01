const express = require('express')
const app = express();
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto= require('crypto')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const AdminModel = require('./models/AdminModel');
const AdminRouter=require("./routers/AdminRouters");
const UserRouter=require("./routers/UserRouter");
const AuthorRouter=require("./routers/AuthorRouter");
const AuthorModel = require('./models/AuthorModel');
const GenreModel = require('./models/GenreModel');
const ProductModel = require('./models/ProductModel');
const CartModel = require('./models/CartModel');
const WishListModel = require('./models/WishListModel');


app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
    }));
 
mongoose.connect('mongodb://localhost:27017/Readverse_Web_Application')

app.use('/admin',AdminRouter)
app.use('/user',UserRouter)
app.use('/author',AuthorRouter)


app.get("/",async(req,res)=>{
    res.json("Priyanshu server startted")
})

const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`Server start at PORT ${PORT}`);
});
