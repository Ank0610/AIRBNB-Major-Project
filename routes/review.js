const express = require("express");
const router = express.Router({mergeParams: true});   
const Review= require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/expressError.js")
const Listing= require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor}= require("../middleware.js");


const reviewController = require("../controllers/reviews.js");
const review= require("../models/review.js");

//------------------------------------------------Create Reviews Route--------------------------------------------
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));


//------------------------------------------------Delete Reviews Route--------------------------------------------
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports = router;




//VALIDATION FOR SCHEMA(MIDDLEWARE)


// const validateReview = (req, res, next) => {
//     let { error } = reviewSchema.validate(req.body); //sechema.js property use here

//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };

// //POST REVIEW ROUTE
// app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();
//     res.redirect(`/listings/${listing._id}`);
    
// }));



// // app.get("/testListing", async (req,res)=>{
// //     let sampleListing=new Listing({
// //         title:"my new villa",
// //         description:"By the beach",
// //         price:6500,
// //         location:"Calangute, Goa",
// //         country: "India",
// //     });
// //     await sampleListing.save();
// //     console.log("sample was saved");
// //     res.send("successful testing");
// // });

// //DELETE REVIEW ROUTE
// app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async (req,res)=>{
//     let {id, reviewId} =  req.params;
//     await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
//     await  Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
// }))