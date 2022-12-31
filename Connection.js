const mongoose=require("mongoose");

const DbConnection=async ()=>{
    await mongoose.connect('mongodb+srv://admin:sppPF5WOZTtUMIgI@cluster0.wpxym6c.mongodb.net/Blog?retryWrites=true&w=majority');
}

module.exports=DbConnection();
// mongodb+srv://admin:sppPF5WOZTtUMIgI@cluster0.wpxym6c.mongodb.net/Blog?retryWrites=true&w=majority
//mongodb://127.0.0.1:27017/Blog