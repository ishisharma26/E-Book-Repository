const mongoose=require('mongoose')

const AuthorSchema=mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    pic:{type:String},
    contact:{type:String},
    status:{type:String,default:"Pending"}
})

const AuthorModel=mongoose.model("Author",AuthorSchema);

module.exports=AuthorModel
