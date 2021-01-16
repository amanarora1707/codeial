const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email',    //unique thing in our schema for every user
     passReqToCallback:true
},
function(req,email,password,done){      //done is function that can take two arguments

              //find a user and establish the identity
              User.findOne({email:email} ,function(err,user){   //1st email is property we are looking at and 2nd one is value that is passed on that we have to check
                  if(err){
                     req.flash('error',err);
                      return done(err);
                  }

                  if(!user || user.password !=password){ //if username and password doesn't match or user not found
                     req.flash('error','Invalid Username/Password');
                      return done(null,false);

                  }

                  return done(null,user);
              });
}
));

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserializing the user from key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user -->Passport');
            return done(err);
        }

        return done(null,user);
    });
});

 //check if user is authenticated
 passport.checkAuthentication =function(req,res,next){ //middleware

    //if the user is signed in then pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
 }

 passport.setAuthenticatedUser =function(req,res,next){  //middleware

    if(req.isAuthenticated()){
        //req.user contain current signed in user from the session cookie and we are just sending this to locals for the views
        res.locals.user=req.user;

    }
    next();
 }
 
module.exports=passport;