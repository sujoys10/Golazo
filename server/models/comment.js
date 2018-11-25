const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    commentedBy : {
        type:String,
        required:true
    }, 
    text : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
},
{
    toObject: {virtuals:true},
    toJSON: {virtuals:true} 
}
);
commentSchema.virtual('author', {
    ref: 'User',
    localField: 'commentedBy',
    foreignField: 'uid',
    justOne: true,
});

module.exports = mongoose.model('Comment', commentSchema);
