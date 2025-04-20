const asyncHandler= require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
//@ DESC Register a User
//@ POST 
//@ access Public
const registeruser =asyncHandler(async(req,res)=>{
    const{username, email, password}=req.body;
    const hashedPassword= await bcrypt.hash(password,10);
    const user= await userModel.create({
        username,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({message:`User registered ${user}`})
    }else{
        res.status(400);
        throw new Error("failure in adding new user");
    }
    
});

//@ DESC Login a User
//@ POST 
//@ access Public
const loginUser = asyncHandler(async(req,res)=>{
    const{ email, password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Username and Password is required!");
    }
    console.log(req.body);
    const userExists= await userModel.findOne({email});
    console.log(userExists)
    const data= await bcrypt.compare(password,userExists.password);
    console.log(data);
    if(userExists && await bcrypt.compare(password,userExists.password)){
        const token= jwt.sign({
           user:{
            id:userExists._id,
            username:userExists.username,
            email:userExists.email
           }

        },process.env.JWT_SECRET,{expiresIn:"15m"});
        res.status(200).json({message:`User login Successfully!,${token}`})
    }
});

//@ DESC Dashboard a User
//@ GET 
//@ access Private
const dashboardUser = asyncHandler(async(req,res)=>{
   
    res.json({message:"dashboard user", Information:`id: ${req.user.id}, username:${req.user.username},email:${req.user.email}`})
});

module.exports={
    registeruser,
    loginUser,
    dashboardUser
}