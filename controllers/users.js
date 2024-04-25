const User = require("../models/user");
const Listing = require("../models/listing");
const Review = require("../models/review")

module.exports.renderSignupForm = (req, res) => {
	res.render("users/signup");
};

module.exports.signup=async (req,res)=>{
    try{
        let {fName,lName,username, email, password}= req.body;
        const newUser=new User ({ username ,lName,fName, email});
        const registeredUser= await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser ,(err)=>{
            if(err) {
                return next(err);
            }
            
        req.flash("success ", " Welcome to Wanderlust");
        res.redirect ("/listings");
        });
        } 
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
        }
    };

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

module.exports.loginUser = async (req, res, next) => {
	req.flash("success", "Welcome back to Wanderlust! ");
	let redirectUrl = res.locals.redirectUrl || "/listings";
	res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		req.flash("success", "You are logged out!");
		res.redirect("/listings");
	});
};