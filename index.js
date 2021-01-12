const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port =8000;
const expressLayouts= require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session-cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal= require('./config/passport-local-strategy');

const MongoStore= require('connect-mongo')(session);
const sassMiddleware =require('node-sass-middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
const { urlencoded } = require('express');

//encoding url 
app.use(urlencoded());

//cookie parser
app.use(cookieParser());

 
//use express router
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));



//set up view engine

app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the session cookie in db
app.use(session({  //session is for encoding cookies
    name:'codeial', //name of cookie
    //TODO change the secret before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },

    store: new MongoStore(   //this is for if server restart client should not be logout
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); //this middleware in passport local strategy in config it is basically as when app is initialised 
                            //passport get initialised and it will check if session cookie is present



//use express router
app.use('/', require('./routes'));
app.listen( port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }

    console.log(`Server is running on port:${port}`);
});