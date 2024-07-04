const db = require('../models');
const Comment = db.Comment;

// create and save Comment
const createComment = async( req, res ) => {
    try{
        const { commentId, issueId, userId, commentText } = req.body;
        const comment = {
            commentId, 
            issueId, 
            userId, 
            commentText
        };

        // Save Comment
        const Comments = await Comment.create(comment);
        return res.status(200).json({
            comments: Comments,
            message: 'Comments stored successfully'
        });
    } catch (err){
        res.status(500).json({
            message: err.message || "Some error occurred while storing Comments."
        });
    }
};


module.exports = { createComment };