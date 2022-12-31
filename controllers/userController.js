const User=require("../models/User.js");
const bcrypt=require("bcryptjs")
 const getAlluser=async(req,resp,next)=>{

    let users;

    try{
          users=await User.find();
    }catch(err)
    {
        console.log(err);
    }
    if(!users)
    {
        return resp.status(404).json({message:"No User Found"});
    }
    return resp.status(200).json({users})
};

const signup=async(req,resp,next)=>{
 const {firstName,lastName,email,password}=req.body;
 let existingUser;
    try{
        existingUser=await User.findOne({email})
    }
    catch(err)
    {
        console.log(err)
    }

    if(existingUser)
    {
        return resp.send(400).json({message:"User Already Registered ! Login Instead"})
    }
    const hashedPassword=bcrypt.hashSync(password);
    
    const newUser= new User({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword,
        blogs:[]
    });

    try{
        newUser.save();
    }
    catch(err)
    {
       return console.log(err);
    }

    return resp.status(201).json({newUser});

};

const login=async(req,resp,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne ({email})
    }
    catch(err)
    {
        console.log(err)
    }
    if(!existingUser)
    {   
        return resp.status(404).json({message:"User Not Found ! Please Signup"})
    }
    const isValidPassword=bcrypt.compareSync(password,existingUser.password);
    if(!isValidPassword)
    {
        return resp.status(400).json({message:"Invalid Credentials ! Please Try Again"})
    }
    return resp.status(200).json({message:"Login Successful !"})
}


module.exports={getAlluser,signup,login};