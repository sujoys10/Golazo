const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid:{
        type: String,
        required:true
    },
    name:{
        type: String,
        index: true,
        text:true,
        required: true
    },
    avatar:{
        type:String
    },
    bio:{
        type: String
    },
    followers:[
        {
            type: String 
        }
    ],
    followings:[
        {
            type: String
        }
    ],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

module.exports = mongoose.model('User', userSchema);
