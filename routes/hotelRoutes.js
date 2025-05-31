const express = require('express');
const router = express.Router();

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getHotelById
} = require('../controllers/hotelController');

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post('/', verifyToken, authorizeRoles('admin'), createHotel );

router.get('/', getAllHotels);

router.get('/:id', getHotelById);


router.put('/:id', verifyToken, authorizeRoles('admin'), updateHotel );
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteHotel );


module.exports = router;
