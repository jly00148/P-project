const Router = require('express').Router;
const router = Router();
const UserModel = require('../models/user.js');


router.post('/users',(req,res)=>{
    const { username,password,role } = req.body;
    
})

module.exports = router;