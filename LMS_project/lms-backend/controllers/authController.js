const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup - Create a new user
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered." });

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login - Authenticate user and return JWT
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
        );

    

        let roleMessage = "";
        if (user.role === "admin") {
            roleMessage = "Welcome Admin!";
        } else if (user.role === "instructor") {
            roleMessage = "Welcome Instructor!";
        } else if (user.role === "student") {
            roleMessage = "Welcome Student!";
        }

        // Keep only this response
        res.json({
            token,
            message: roleMessage,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};