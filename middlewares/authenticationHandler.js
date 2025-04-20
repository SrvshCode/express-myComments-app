const jwt = require("jsonwebtoken");
const asyncHandler=require("express-async-handler")
const authenticateUser = asyncHandler(async(req,res,next)=>{
    const accessToken = req.headers.Authorization || req.headers.authorization;
    if(!accessToken){
        res.status(403);
        throw new Error("Token is required!");
    }
        const token = accessToken.split(" ")[1];
       jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            res.status(401);
            throw new Error("User is not Authenticated");   
        }
        req.user= decoded.user;
        next();
       });  
});

module.exports = authenticateUser;