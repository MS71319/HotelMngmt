const express = require('express');
const router = express.Router();

const {
  createRoom,
  updateRoom,
  getAllRooms,
  deleteRoom,
} = require('../controllers/roomController');

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post('/', verifyToken, authorizeRoles('admin'), createRoom);

router.get('/', getAllRooms);
router.put('/:id', verifyToken, authorizeRoles('admin'), updateRoom );
router.get('/:hotelId', getAllRooms);

router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteRoom);

module.exports = router;
