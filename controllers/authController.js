const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async(req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: "User Already Exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({name, email, password: hashedPassword, role});
        await newUser.save();
        res.status(201).json({ success: true, message: "User Registered Successfully",  data: newUser });
    } catch (error) {
        console.error("Error in Creating User: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }

};

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({ success: false, message: "User not Found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Credentials"});
        }

        const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.json({ token, user: {id: user._id, name: user.name, role: user.role }});
    } catch (error) {
        console.error("Error in login with User: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" })    
    }
};



module.exports = { register, login }
