const express=require("express")
const userController=require('../controllers/userController')


const router=express.Router();

router.get('/',userController.getAlluser);
router.post('/signup',userController.signup);
router.post('/login',userController.login);

module.exports=router;

