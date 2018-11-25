const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const postSchema = new Schema({
    category : {
        type: String
    },
    content: {
        type: String
    },
    caption: {
        type: String
    },
    tags: [{
        type: String
    }],
    createdAt: {
        type: Number,
        required: true
    },
    postedBy: {
            type: String,
            required: true
    },
    likes:[{
        type:String
    }],
 
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

},
{
    toObject: {virtuals:true},
    toJSON: {virtuals:true} 
});

postSchema.virtual('author', {
    ref: 'User',
    localField: 'postedBy',
    foreignField: 'uid',
    justOne: true,
});

module.exports = mongoose.model('Post', postSchema);

