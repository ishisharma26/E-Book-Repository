const mongoose= require('mongoose')


const AdminSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String}
})

const AdminModel=mongoose.model('Admin',AdminSchema);
module.exports=AdminModel;