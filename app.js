const express=require("express");
const DbConnection=require('./Connection');
const app=express();
const router=require("./routes/userRoutes")
const BlogRouter=require("./routes/BlogRoutes")

app.use(express.json());
app.use('/users',router);
app.use('/blog',BlogRouter);


DbConnection.then(()=>app.listen(4001))
.then(()=>console.log("Connected to Database Successfully"))
.catch((err)=>console.log(err));



