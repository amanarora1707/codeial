const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');


module.exports.create = async function (req, res) {
    try {

        let post = await Post.findById(req.body.post);//before creating a comment we will check id of post

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id

            });
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        };
    }
    catch (err) {
        console.log('Error', err);
        return;


    }
};

module.exports.destroy = async function (req, res) {

    try{

    let comment = await Comment.findById(req.params.id)
                        .populate('post');
    //finding comment by id
    if ((comment.user == req.user.id) || (comment.post.user == req.user.id)) {  //if user is same as who created that comment or user whose post is this

        let postId = comment.post; //save postid of comment

        comment.remove(); //removing comment

      let post= await  Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id }} )  //finding comment in array in post comment and deleting
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }

    }

    catch(err) {
        console.log('Error',err);
        return;
    }

}


