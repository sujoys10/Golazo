const express = require('express');
const router = express.Router();

const Post = require('../../models/Post');
const Comment = require('../../models/comment');


router.post('/:id/comments', (req,res) => {
    Comment.create({
        text: req.body.text,
        commentedBy: req.body.author
    }, (err, comment) => {
        if(err){
            console.log(err);
        }else{
            Post
                .findOneAndUpdate({_id:req.params.id}, {$push:{ comments : comment}}, {new : true})
                .then(() => res.json(comment))
                .catch(err => {
                    console.log(err);
                });      
                }
    })
});

module.exports = router;