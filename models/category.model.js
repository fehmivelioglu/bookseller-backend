var mongoose=require("mongoose");

var schema=mongoose.Schema;

var categorySchema=new schema({
    name:{
        type:String,
        require:true
    },
    created: {
        type:Date,
        default:()=>{
            return new Date()
        }
    }
})
module.exports=mongoose.model("category",categorySchema)