const Hotel = require("../models/hotel.model");

const createHotel = async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const hotelExists = await Hotel.findOne({ name });
    if(hotelExists) {
          return res.status(400).json({ message: "Hotel Already Exists"});
    }  
    const hotel = new Hotel({ name, location, description });
    await hotel.save();
    res.status(201).json({ success: true, message: "Hotel Created", data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating hotel" });
  }
};

const updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const updateData = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updateData, { new: true });

    if (!updatedHotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    res.status(200).json({ success: true, data: updatedHotel });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating hotel" });
  }
};

const getHotelById = async (req, res) => {
  try {
    const hotelId = req.params.id;

    const hotel = await Hotel.findById(hotelId).populate('rooms');

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error('Error fetching hotel:', error.message);
    res.status(500).json({ message: 'Server error while fetching hotel' });
  }
};

const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({ success: true, message: "All Hotels Data fetched", data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching hotels" });
  }
};

const deleteHotel = async (req, res) => {
    const hotelId = req.params.id;

  try {
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json({ success: true, message: "Hotel deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting hotel" });
  }
};

module.exports = { createHotel, getHotelById, updateHotel,  getAllHotels, deleteHotel };
