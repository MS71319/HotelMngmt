const Booking = require('../models/booking.model');
const Room = require('../models/room.model');

const createBooking = async(req, res) => {
    try {
        const{ room, checkIn, checkOut } = req.body;
        const existingBooking = await Booking.findOne({
            room,
            $or: [
                {
                    checkIn: { $lt: new Date(checkOut) },
                    checkOut: { $gt: new Date(checkIn) },
                },
            ],
        });

        if(existingBooking) {
            return res.status(400).json({ message: 'Room is already booked for the selected Dates' });

        }
        const booking = await Booking.create({
            user: req.user.id,
            room,
            checkIn,
            checkOut,
        });
        res.status(201).json({ message: "Room Booked!", booking });
    } catch(error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('room');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking canceled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user room');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking,
    getAllBookings,
}