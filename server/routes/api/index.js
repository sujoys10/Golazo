const express = require('express');
const router = express.Router();

const Post = require('../../models/Post');

router.get('/', (req, res) => {
    console.log('tag');
    Post.find()
        .populate("author", 'uid name avatar')
        .populate({ path :"comments",populate: {path :"author",select : 'uid name avatar uid'}})
        .sort({date : -1})
        .exec()
        .then(posts => res.json(posts));
});    
   

router.get('/trending', (req, res) => {
    console.log('tagss');
    Post.aggregate( [ { $unwind: "$tags" }, { $sortByCount: "$tags" } ] )
        .exec()
        .then(post => {
            res.json(post);
            console.log(post);
        })
});

router.get('/tag', (req, res) => {
    console.log(req.query.hashtag);
   Post.find({ tags : { $in : `#${req.query.hashtag}` }})
        .populate("author", 'uid name avatar')
        .populate({ path :"comments",populate: {path :"author",select : 'uid name avatar uid'}})
        .sort({date : -1})
        .exec()
        .then(posts => {
          res.json(posts);
          console.log(posts);
       })
       .catch(err => console.log('hi',err));
});

module.exports = router;