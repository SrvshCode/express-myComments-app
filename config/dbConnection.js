const mongoose= require("mongoose");

const connectDb=async()=>{
    const response= await mongoose.connect(process.env.DB_CONNECTION_STRING);
    try{
        if(response){
            console.log("MongoDB connected");
            console.log(`DB host:${response.connection.host}, DB Name: ${response.connection.name}`)
        }
    }catch(err){
        console.log("Database Connection failiure!",err);
        process.exit(1);
    }
};

module.exports =connectDb;