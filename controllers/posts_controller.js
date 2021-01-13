const Post =require('../models/post');
const Comment =require('../models/comment');


module.exports.create =function(req,res){

    Post.create({
        content:req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){console.log('error in creating a post'); return;}
        
        return res.redirect('back');
    });
}

module.exports.destroy =function(req,res){
    Post.findById(req.params.id ,function(err,post){
        //.id means converting the object id to string
        if(post.user ==req.user.id){   //authentication if person who created the post and person who clicked on delete are same then only allowed to delete
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){

                return res.redirect('back');

            });
        }
        else{
            return res.redirect('back'); //if not authenticated then not allowed to delte
        }
    })
    };
