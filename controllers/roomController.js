const Room = require("../models/room.model");
const Hotel = require("../models/hotel.model");

const createRoom = async (req, res) => {
  try {
    const { hotel, roomType, price, available } = req.body;

    if (!hotel || !roomType || !price) {
      return res.status(400).json({ success: false, message: "Hotel, roomType, and price are required." });
    }

    const existingHotel = await Hotel.findById(hotel);
    if (!existingHotel) {
      return res.status(404).json({ success: false, message: "Hotel not found." });
    }

    const room = await Room.create({
      hotel,
      roomType,
      price,
      available: available ?? true, 
    });

    res.status(201).json({ success: true, data: room });

  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ success: false, message: "Server error. Could not create room." });
  }
};

const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const updateData = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(roomId, updateData, { new: true });

    if (!updatedRoom) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.status(200).json({ success: true, data: updatedRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating Room" });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hotel");
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching rooms" });
  }
};

const getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await Room.find({ hotel: req.params.hotelId });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting room" });
  }
};

module.exports = { createRoom, updateRoom, getRoomsByHotel, getAllRooms, deleteRoom };
