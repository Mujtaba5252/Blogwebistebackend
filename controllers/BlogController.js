const express = require("express");
const Blog=require("../models/Blog");
const User=require("../models/User");
const mongoose=require("mongoose");
const {MongoClient}=require("mongodb");



const getAllBlogs = async (req, res) => {
    let blogs;
    try{
        blogs=await Blog.find().populate("user");


    }
    catch(err)
    {
        console.log(err);
    }
    if(!blogs)
    {
        return res.status(404).json({message:"No Blogs Found"});
    }
    return res.status(200).json({blogs})
}

const addBlog = async (req, res) => {
    const {title,description,image,user}=req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }
    catch(err)
    {
        console.log(err);
    }
    if(!existingUser)
    {
        return res.status(404).json({message:"User Not Found"});
    }
   
    const blog=new Blog({
        title:title,
        description:description,
        image:image,
        user:user
    });
    try{
        const session=await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:err});
    }
    if( !blog)
    {
        return res.status(404).json({message:"Blog Not Added"});
    }
    return res.status(200).json({blog})
}

const updateBlog = async (req, res) => {

    const blogId=req.params.id;
    const {title,description}=req.body;
    let blog;
    try{
        blog=await Blog.findByIdAndUpdate(blogId,{
            title:title,
            description:description,
            
        })
    }
    catch(err)
    {
        console.log(err);
    }
    if(!blog)
    {
        return res.status(500).json({message:"Unable to update the blog"});
    }
    return res.status(200).json({blog});
     

}
const getBlogById = async (req, res) => {
    const blogId=req.params.id;
    let blog;
    try{
        blog=await Blog.findById(blogId);  
    }
    catch(err)  
    {
        console.log(err);
    }
    if(!blog)
    {
        return res.status(404).json({message:"No Blog Found"});
    }
    return res.status(200).json({blog});
}

const deleteBlog = async (req, res) => {
    const blogId=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndRemove(blogId).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err)
    {
        console.log(err);
    }
    if(!blog)
    {
        return res.status(500).json({message:"Unable to Delete"});
    }
    return res.status(200).json({message:"Blog Deleted Successfully"});
}

const getBlogsByUserId = async (req, res) => {
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");
    }
    catch(err)
    {
        console.log(err);
    }
    if(!userBlogs)
    {
        return res.status(404).json({message:"No User Found"});
    }
    return res.status(200).json({user:userBlogs});
}

module.exports = {getAllBlogs,addBlog,updateBlog,getBlogById,deleteBlog,getBlogsByUserId};