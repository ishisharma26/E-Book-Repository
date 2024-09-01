const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    pic:{type:String},
    contact:{type:String},
    status:{type:String,default:"Pending"}
})

const UserModel=mongoose.model("User",UserSchema);

module.exports=UserModel
