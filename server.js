const express = require('express')
const dotenv = require('dotenv')
const connectDB = require("./config/db.js")
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");
const hotelRoutes = require("./routes/hotelRoutes.js");
const roomRoutes = require("./routes/roomRoutes.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
console.log(PORT)

  
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})
