const promiseRouter = require("express-promise-router");
const router = promiseRouter();
/*------Using Passport For Authentication ------*/
const passport = require("passport")
require("../../middlewares/passport");

//-----------Importing MiddleWare---------------
const checkUserStatus = require("../../middlewares/checkUserStatus");

const hotelManagement = require("../../controllers/mainController").HotelManagement;


router.post("/addHotel", passport.authenticate('jwt', { session: false }), hotelManagement.addHotel);
router.patch("/updateHotel", passport.authenticate('jwt', { session: false }), hotelManagement.updateHotel);
router.delete("/deleteHotel", passport.authenticate('jwt', { session: false }), hotelManagement.deleteHotel);
router.get("/allHotels", passport.authenticate('jwt', { session: false }), hotelManagement.allHotels);
router.get("/hotelDetail", passport.authenticate('jwt', { session: false }), hotelManagement.hotelDetails);
router.get("/hotelsNearToUser", passport.authenticate('jwt', { session: false }), hotelManagement.ListOfHotelsAccordingToUserLocation);

/**
  * @description - {Export the router}
*/
module.exports = router;