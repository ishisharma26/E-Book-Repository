const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    title:{type:String},
    price:{type:String},
    pdf:{type:String},
    pic:{type:String},
    dis:{type:String},
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    genreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    },
    status:{type:String,default:"Pending"}
})

const ProductModel=mongoose.model("Product",ProductSchema);

module.exports=ProductModel
