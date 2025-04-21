const express= require("express");
const { getComments, getComment, createComment, editComment, deleteComment } = require("../controllers/commentController");
const authenticateUser = require("../middlewares/authenticationHandler");
const router= express.Router();

router.route("/")
    .get(authenticateUser,getComments)
    .post(authenticateUser,createComment);

router.route("/:id")
    .get(authenticateUser,getComment)
    .put(authenticateUser,editComment)
    .delete(authenticateUser,deleteComment);


module.exports = router;
