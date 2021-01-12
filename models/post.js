const mongoose=require('mongoose');

const postSchema =new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,  //connecting post with user with userid
        ref:'User'  //reffering to user schema
    }
},{
    timestamps:true
});

const Post =mongoose.model('Post',postSchema);
module.exports =Post;