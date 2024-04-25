const express = require("express");
const router = express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
// const { saveRedirectUrl,isLoggedIn,isProfileOwner,validateUser,varifyEmail,varifyUserEmail } = require("../middleware.js");

const userController = require("../controllers/users.js")

// const multer  = require('multer')            //install multer package in npm || multipart/form-data type receive and paras
// // const upload = multer({ dest: 'uploads/' })  //uploads folder me save karega
// const {storage} = require("../cloudConfig.js")
// const upload = multer({ storage });

// Router.route-----------------------
// router.route("/signup")
//     .get(userController.renderSignupForm)               //signup-----------
//     .post(varifyEmail,validateUser,wrapAsync(userController.signUser))

router.get("/signup",userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.signup));

router.get("/login", userController.renderLoginForm);

router.post("/login",saveRedirectUrl, passport.authenticate ("local", {  failureRedirect: "/login", failureFlash:true,}),
    userController.loginUser
);

router.get("/logout", userController.logoutUser);




module.exports = router;                            //export---app.js---------------

