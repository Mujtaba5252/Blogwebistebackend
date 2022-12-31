const express = require("express");
const BlogRouter = express.Router();
const BlogController=require("../controllers/BlogController");

BlogRouter.get("/",BlogController.getAllBlogs);
BlogRouter.post("/add",BlogController.addBlog);
BlogRouter.put("/update/:id",BlogController.updateBlog);
BlogRouter.get("/:id",BlogController.getBlogById);
BlogRouter.delete("/:id",BlogController.deleteBlog);
BlogRouter.get("/user/:id",BlogController.getBlogsByUserId);

module.exports = BlogRouter;