const Post =require('../models/post');
const Comment =require('../models/comment');


module.exports.create = async function(req,res){

    try{
    await Post.create({
        content:req.body.content,
        user: req.user._id
    });
        req.flash('success','Post published');//adding flash message with help of middleware
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');//adding flash message with help of middleware
    }
}

module.exports.destroy =async function(req,res){

    try{
             let post= await Post.findById(req.params.id);
        //.id means converting the object id to string
        if(post.user ==req.user.id){   //authentication if person who created the post and person who clicked on delete are same then only allowed to delete
            post.remove();

           await Comment.deleteMany({post: req.params.id});
           req.flash('success','Post Deleted');      //adding flash message with help of middleware
                return res.redirect('back');
            }
            else{
                req.flash('error','You cannot delete this post');         //adding flash message with help of middleware
                return res.redirect('back');
            }
        }
        
        catch(err){
            req.flash('error',err);
            return res.redirect('back'); //if not authenticated then not allowed to delte
        }
    }