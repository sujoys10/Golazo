const express = require('express');
const router = express.Router();


const Post = require('../../models/Post');
const User = require('../../models/user');

 router.post('/:uid', (req, res) => {
    Post.create({
        category : req.body.category,
        content : req.body.content,
        caption : req.body.caption,
        tags : req.body.tags,
        createdAt: req.body.createdAt,
        postedBy: req.body.author.uid
    }, (err, post) => {
            if(err){
                console.log(err);
            }else{
                User
                    .findOneAndUpdate({uid:req.params.uid}, {$push:{ posts :post}}, { "new": true})
                    .then(() => {
                        res.json(post);
                    })
                    .catch(err => {
                        console.log(err);
                    });      
                }
    }); 
}); 

 router.get('/p/:id', (req, res) => {
    console.log(req.params.id);
    Post.find({'_id': req.params.id})
        .populate("author", 'uid name avatar')
        .populate({ path :"comments",populate: {path :"author",select : 'uid name avatar uid'}})
        .exec()
        .then(post => {
            console.log(post);
            res.json(post);
        }).catch(err => {
            console.log(err);
        });
}); 


router.post('/:id/edit', (req, res) => {
    const updatedPost = {
        category : req.body.category,
        content : req.body.content,
        caption : req.body.caption,
        tags : req.body.tags
    };
    Post.findOneAndUpdate({ _id: req.params.id}, {$set: updatedPost},{new:true})
         .then(post => {
            res.json(post);
            console.log(post);
           })
         .catch(err => {
             console.log(err);
         });

});

router.delete('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => post.remove()
           .then(() => res.json({success: true}))
        )
        .catch(err => {
            console.log(err);
        });
});


router.post('/:id/like', (req, res) => {
        Post.findOneAndUpdate({_id:req.params.id}, {$push: {likes: req.body.uid}},{ "new": true})
            .then(post => {
                res.json(post);
            })
            .catch(err => {
                console.log(err);
            });
});

router.post('/:id/unlike', (req, res) => {
    Post.findOneAndUpdate({_id:req.params.id}, {$pull: {likes: req.body.uid}}, { "new": true})
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            console.log(err);
        });
});


module.exports = router;