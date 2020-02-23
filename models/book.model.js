var mongoose=require("mongoose")
var category=require("./category.model")

var bookSchema =mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true    
    },
    stock:{
        type:Number,
        require:true
    },
    created:{
        type:Date,
        default:()=>{return new Date()}
    },
    categoryBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    picture:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model("book",bookSchema);