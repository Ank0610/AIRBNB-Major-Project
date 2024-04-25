const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/expressError.js")
const {listingSchema} = require("../schema.js")
const {isLoggedIn, isOwner ,validateListing} =require("../middleware.js");
//const { index } = require("../controllers/listings.js");


const listingController = require("../controllers/listings.js")                             //all backend code--------

const multer  = require('multer')            //install multer package in npm || multipart/form-data type receive and paras
// const upload = multer({ dest: 'uploads/' })  //uploads folder me save karega
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});

//----------------------------------------------Index Route----------------------------------------------
//router.get("/",wrapAsync(listingController.index));
router.route("/")
    .get(wrapAsync(listingController.index))                                                //Index Route----------
    .post(isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );           //CREATE (New & Create Route)-----------

//----------------------------------------------CREATE (New & Create Route)----------------------------------------------
router.get("/new", isLoggedIn,listingController.renderNewForm);

//Create Route
//router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));

//------Show listing---------------------------------------READ (Show Route)----------------------------------------------
//router.get("/:id",wrapAsync(listingController.showListing));
router.route("/:id")
    .get(wrapAsync(listingController.showListing))                                          //READ (Show Route)------------
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))     //UPDATE (Edit & Update Route)-----------------
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))
//----------------------------------------------UPDATE (Edit & Update Route)----------------------------------------------
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm));

//update Route
//router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing));

//----------------------------------------------DELETE (Delete Route)----------------------------------------------
//router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//export----------------
module.exports = router;





















//  //Index Route
// app.get("/listings", wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
// }));

// //New Route
// app.get("/listings/new", (req, res) => {
//     res.render("listings/new.ejs");
// });

// //Show Route
// app.get("/listings/:id", wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs", { listing });
// }));



// //Create Route
// app.post("/listings", validateListing, wrapAsync(async (req, res) => {

//     const newListing = new Listing(req.body.listing);

//     // if(!req.body.listing){
//     //     throw new ExpressError(400,"send valid data for listing");
//     // }
//     // if(!newListing.description){
//     //     throw new ExpressError(400,"Description is missing");
//     // }
//     // if(!newListing.title){
//     //     throw new ExpressError(400,"Title is missing");
//     // }
//     // if(!newListing.location){
//     //     throw new ExpressError(400,"Location is missing");
//     // }

//     await newListing.save();
//     res.redirect("/listings");

// }));

// //Edit Route
// app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", { listing });
// }));

// //Update Route
// app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
// }));

// //Delete Route
// app.delete("/listings/:id", wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
// }));


// const validateListing = (req, res, next) => {
//     let { error } = listingSchema.validate(req.body); //sechema.js property use here

//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };