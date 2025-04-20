const express = require("express");
const dotenv= require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
//const router = ;
dotenv.config();

//connecting mongo database
connectDb();

const app= express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/comments",require("./routes/commentRoutes"));
app.use("/api/v1/users",require("./routes/userRoutes"));

//using Errorhandler service
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`application is running on ${process.env.PORT}`);
})