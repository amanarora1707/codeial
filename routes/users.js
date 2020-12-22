const express=require('express');

const router=express.Router();

const usersController =require('../controllers/users_controller');  //  ../means one step up

//console.log("router loaded");
//console.log("profile");

router.get('/profile',usersController.profile);

module.exports =router;