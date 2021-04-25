const Hotel = require("../../models/Hotel")

/**
 @description: function used to add hotel 
 */
const addHotel = async (req, res) => {
    try{
        let requestData = new Hotel(req.body);

        let saveHotelData = await requestData.save();

        return okResponse(res, saveHotelData, "Hotel created successfully !");
    } catch(error){
        console.log(error)
    }
}

/**
 @description: function used to update hotel 
 */
const updateHotel = async (req, res) => {
    try {
        let requestData = req.body
        if (!requestData._id) throw badRequestError(res, "id required");

        let hotelExist = await Hotel.findById({ _id: requestData._id });

        if (hotelExist == null)
          throw badRequestError(res, "hotel id not exist");

        let updateHotelData = await Hotel.updateOne(requestData);

        return okResponse(res, updateHotelData, "Hotel updated successfully !");
    } catch (error) {
        console.log(error)
    }
}

/**
 @description: function used to delete hotel 
 */
const deleteHotel = async (req, res) => {
    try {
        if (!req.query.id) throw badRequestError(res, "id required");

        let hotelExist = await Hotel.findById({ _id: req.query.id });

        if(hotelExist == null) throw badRequestError(res, "hotel id not exist");

        let hotelDelete = await Hotel.deleteOne({ _id: req.query.id });

        return okResponse(res, hotelDelete, "Hotel deleted successfully !");
    } catch (error) {
        console.log(error)
    }
}

/**
 @description: function used to fetch hotels
 */
const allHotels = async (req, res) => {
    try {
        let allHotels = await Hotel.find()

        return okResponse(res, allHotels, "Hotels fetched successfully !");
    } catch (error) {
        console.log(error)
    }
}

/**
 @description: function used to fetch hotel details 
 */
const hotelDetails = async (req, res) => {
    try {
        if (!req.query.id) throw badRequestError(res, "id required");

        let hotelExist = await Hotel.findById({ _id: req.query.id });

        if (hotelExist == null)
          throw badRequestError(res, "hotel id not exist");

        let hotelDetails = await Hotel.findById({ _id: req.query.id })

        return okResponse(res, hotelDetails, "Hotel Details fetched successfully !");
    } catch (error) {
        console.log(error)
    }
}


/**
 @description: function used to fetch hotel according to user's location 
 */
const ListOfHotelsAccordingToUserLocation = async (req, res) => {
    try {
        
        let listHotels = await Hotel.find({ location: req.user.location })

        return okResponse(res, listHotels, "Hotel Details fetched successfully !");
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  addHotel,
  updateHotel,
  deleteHotel,
  allHotels,
  hotelDetails,
  ListOfHotelsAccordingToUserLocation,
};