const express = require('express');
const router = express.Router();
const { signupvalidation, loginvalidation } = require('../middleware/userAuth');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signup', signupvalidation, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newuser = new User({
            username,
            email,
            password: hashedPass
        });

        await newuser.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', loginvalidation, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist. Please sign up." });
        }

        const validpass = await bcrypt.compare(password, user.password);
        if (!validpass) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id:user._id ,username: user.username, email: user.email ,admin:user.admin}, process.env.JWT_SECRET, { expiresIn: '11h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
