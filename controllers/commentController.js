const asyncHandler= require("express-async-handler");
const commentModel = require("../models/commentModel");


//@ desc get all comments
//@ GET request
//@ private access
const getComments=asyncHandler(async(req,res)=>{
    const userId= req.user.id;
    const comments=await commentModel.find({userId});
    if(comments.length !==0){
        res.status(200).json({comments});
    }else {
        res.status(404);
        throw new Error("Comments are not available");
    }

});

//@ desc get comments wrt :id
//@ GET request
//@ private access
const getComment=asyncHandler(async(req,res)=>{
    const commentId= req.params.id;
    console.log(commentId)
    const userId =req.user.id;
    console.log(userId);
    const comment = await commentModel.findById(commentId);
    console.log(comment);
    if(!comment){
        res.status(404);
        throw new Error(`Comment is not available for Id:${commentId}`);
    }
    if(userId !== comment.userId.toString()){
        res.status(403);
        throw new Error("Users are not allowed to view other users comments!");
    }
    if(comment){
        res.status(200).json({message: `Get Comment for Id:${commentId}: ${comment}`});
    }else{
        res.status(500);
        throw new Error(`Problem getting comment for Id:${commentId}`);
    }
});

//@ desc Create a comment
//@ POST request
//@ private access
const createComment=asyncHandler(async(req,res)=>{
    const{body,type}=req.body;
    if(!body ||!type){
        res.status(400);
        throw new Error("Body and Type of the comments are mandatory!")
    }
    
    const newComment= await commentModel.create({
        body, 
        type,
        userId:req.user.id
    })
    if(newComment){
        res.status(201).json({message: `New Comment created Successfully! Id:${newComment.id}, text: ${newComment.body}`});
    }else{
        res.status(500);
        throw new Error("failure in adding new comment");
    }
    
});

//@ desc edit comments wrt :id
//@ PUT request
//@ private access
const editComment=asyncHandler(async(req,res)=>{
    const commentId= req.params.id;
    const{body,type="user"}=req.body;
    const findComment= await commentModel.findById(commentId);
    if(!findComment){
        res.status(404);
        throw new Error(`Comment is not available for Id:${commentId}`);
    }
    if(req.user.id !== findComment.userId.toString()){
        res.status(403);
        throw new Error("Users are not allowed to edit other users comments!");
    }
    const editedComment = await commentModel.findByIdAndUpdate(
        commentId, 
        {body,type},
        {new:true}

    )
    if(editedComment){
        res.status(200).json({message:`Comment with ID:${commentId} edited, new Comment:${editedComment}`});
    }else{
        res.status(500);
        throw new Error(`Problem editing comment with Id:${commentId}`);
    }
  
});

//@ desc delete comments wrt :id
//@ DELETE request
//@ private access
const deleteComment=asyncHandler(async(req,res)=>{
    const commentId=req.params.id;
    console.log(commentId);
    console.log(req.user.id)
    
    const findComment = await commentModel.findById(commentId);
    console.log(findComment)
        if(!findComment){
            res.status(404);
            throw new Error(`Comment is not available for Id:${commentId}`);
        }
        if(req.user.id !== findComment.userId.toString()){
            res.status(403);
            throw new Error("Users are not allowed to delete other users comments!")
        }

    const deletedComment = await commentModel.findByIdAndDelete(commentId);
    console.log(deleteComment);
    if(deletedComment){
      res.status(200).json({message:`Comment with ID:${commentId} deleted, deleted Comment:${deletedComment}`});
    }else{
        res.status(500);
        throw new Error(`Problem deleting comment with  Id:${commentId}`);
    }
});

module.exports={
    getComment,
    getComments,
    createComment,
    editComment,
    deleteComment
}


