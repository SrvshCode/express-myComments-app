const mongo= require("mongoose");
const schema= mongo.Schema;

const userSchema= new schema({
    username:{
        type:String,
        require:[true,"username is required!"]
    },
    email:{
        type:String, 
        required:[true,"email is required!"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
},
{
    timestamps:true
});

const userModel= mongo.model("users",userSchema);

module.exports=userModel;