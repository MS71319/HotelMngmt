const express = require('express');
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
} = require('../controllers/bookingController');

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post('/', verifyToken, authorizeRoles('user'), createBooking);

router.get('/my-bookings', verifyToken, authorizeRoles('user'), getMyBookings);

router.delete('/:id', verifyToken, authorizeRoles('user'), cancelBooking);

router.get('/all-bookings', verifyToken, authorizeRoles('admin'), getAllBookings);

module.exports = router;
