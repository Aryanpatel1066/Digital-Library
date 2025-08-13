 const bcrypt = require("bcryptjs");
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

// Register a new user
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Create token
    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

// Login user
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials wrong email" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "wrong password" });
    }

    // Create token
    const token = generateToken(existingUser);

    res.status(200).json({
      message: "Login successful",
      user: existingUser,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong while login" });
  }
};

module.exports = {
  userRegister,
  userLogin
};
