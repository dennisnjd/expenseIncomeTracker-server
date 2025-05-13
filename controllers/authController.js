
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../constants.js";



// List users
const listUsers = async (req, res) => {
    const allUsers = await User.find({}, '-password'); // do not return password field
    return res.status(200).json({ status: 1, message: "Users fetched successfully", data: allUsers });
};

// User registration
const registerUser = async (req, res) => {

    console.log("The request reached!!!!!");
    
    const { email, password, name, dob, profileImage } = req?.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ status: 0, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            dob,
            profileImage
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ status: 1, message: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ status: 0, message: "Server error", error: err.message });
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(0).json({ status: 0, message: "Invalid credentials" });
        };

        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (!isPasswordValid) {
            return res.status(0).json({ status: 0, message: "Invalid credentials" });
        };

        const token = jwt.sign({ email: user?.email }, JWT_SECRET, { expiresIn: "10d" });
        return res.status(200).json({
            status: 1,
            message: "Logged in successfully",
            token,
            data: {
                email: user?.email,
                name: user?.name,
                dob: user?.dob,
                profileImage: user?.profileImage
            }
        });

    } catch (err) {
        return res.status(500).json({ status: 0, message: "Server error", error: err.message });
    }
};

//User logout
const logoutUser = async (req, res) => {
    // Invalidate the token on the client side by removing it from local storage or cookies
    return res.status(200).json({ status: 1, message: "Logged out successfully" });
};


export { registerUser, loginUser, listUsers, logoutUser };
