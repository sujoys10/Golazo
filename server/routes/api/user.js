const express = require('express');
const router = express.Router();

const User = require('../../models/user');

User.createIndexes({name : "text"}, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('yo index');
    }
});

router.get('/search/:input', (req, res) => {
    const ureg = new RegExp(req.params.input, 'gi');
    User.find({ name : { $regex: ureg }},{ uid: 1, name: 1, avatar: 1})
        
        .then(users => {
            res.json(users);
            console.log('s',users);
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/a/:fUids', (req, res) => {
    User.find({ uid: { $in : req.params.fUids}},{uid: 1, name: 1, avatar: 1})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/:uid', (req, res) => {
    User.findOne({ uid: req.params.uid})
        .populate({path:"posts",
                   populate: [
                       {path: "author", select: 'uid name avatar uid'},
                       {path: "comments" , populate: {path: "author" ,select : 'uid name avatar uid'}}
                   ]
                })
        .exec()
        .then(user => {
            res.json(user);
        })
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const newUser = new User({
        uid: req.body.uid,
        name: req.body.name,
        avatar: req.body.avatar
    });
    newUser.save()
            .then(user => {
                res.json(user);
                console.log('user',newUser);
            }
            ).
            catch(err => {
                console.log(err);
            })
});

router.post('/:uid/edit', (req, res) => {
    const updatedUser = {
        name : req.body.name,
        avatar : req.body.avatar,
        bio : req.body.bio
    };
    User.findOneAndUpdate({uid: req.params.uid}, {$set: updatedUser},{"new":true})
         .then(user => {
             res.json(user);
            })
         .catch(err => {
             console.log('er',err);
         });
});

router.post('/:id/addFollower', (req, res) => {
        User.findOneAndUpdate({uid:req.params.id}, {$push: {followers: req.body.follower}},{ "new": true})
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.log(err);
            });
});

router.post('/:id/removeFollower', (req, res) => {
    User.findOneAndUpdate({uid:req.params.id}, {$pull: {followers: req.body.follower}}, { "new": true})
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/:id/addFollowing', (req, res) => {
        User.findOneAndUpdate({uid:req.params.id}, {$push: {followings: req.body.following}},{ "new": true})
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.log(err);
            });
});

router.post('/:id/removeFollowing', (req, res) => {
    User.findOneAndUpdate({uid:req.params.id}, {$pull: {followings: req.body.following}}, { "new": true})
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;