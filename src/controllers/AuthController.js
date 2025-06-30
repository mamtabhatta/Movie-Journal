const User = require("../models/UserModel");
const generateToken = require("../utils/jwt");

exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    //extracts username and password from client request body 

    //checks if user already exists

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        // encrypt the password using bcrypt
        //create and save new user
        let newUser = new User({ username, email, password });
        newUser.password=await bcrypt.hash(password,10);
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            token: generateToken(newUser._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });

    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user)
            return res.status(403).json({ message: "Invalid username or password" })

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid username or password" });

        res.json({
            message: "login successfull",
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Login Failed", error: err.message });

    }
};