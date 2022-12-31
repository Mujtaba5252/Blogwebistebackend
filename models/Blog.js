const mongose=require("mongoose");
const Schema=mongose.Schema;

const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{  
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports=mongose.model("Blog",blogSchema);