const mongoose= require("mongoose");
const schema= mongoose.Schema;

const commentSchema = new schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"User Id of the user is mandatory!"]
    },
    body:{
        type:String,
        required:[true,"Comment body is mandatory!"]
    },
    type:{
        type:String,
        required:[true,"Comment type is mandatory!"]
    }
},{
    timestamps:true
});

const commentModel= mongoose.model("comments",commentSchema);

module.exports=commentModel;