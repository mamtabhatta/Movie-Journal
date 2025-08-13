const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const generateToken = require("../utils/jwt");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role: "user" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Log the login attempt
  console.log("Login attempt:", email, password);

  try {
    const user = await User.findOne({ email });

    // Log the user fetched from DB
    console.log("User from DB:", user);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    // Log whether the password matches
    console.log("Password match:", isMatch);

    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
