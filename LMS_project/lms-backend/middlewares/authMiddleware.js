const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        console.log("User from token: ", req.user); // Add this to debug
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

// Middleware to check if user has a specific role
exports.requireRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
