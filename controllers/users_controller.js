module.exports.profile= function(req,res){
    
    
    return res.render('users_profile',{
        title:"Profile"
    });
    
}


//render the sign up page
module.exports.signUp =function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}


//render the sign in page
module.exports.signIn =function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create= function(req,res){

    //to do later
}

//sign in create and session
module.exports.createSession =function(req,res){

    //to do later
}