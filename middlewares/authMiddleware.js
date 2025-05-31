const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/user.model");

const verifyToken = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; 
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({ message: "No token, Authorization denied" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            const user = await User.findById(decoded.id).select('-password'); 

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            req.user = user; 
            console.log("Decoded user:", req.user);
            next(); 

        } catch (error) {
            console.error("Token verification error:", error);
            return res.status(400).json({ message: "Token is not valid" });
        }
    } else {
        return res.status(401).json({ message: "No token, Authorization denied" });
    }
};

module.exports = verifyToken;
