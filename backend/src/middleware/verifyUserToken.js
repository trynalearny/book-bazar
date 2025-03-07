const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;


const verifyUserToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

    console.log("Received Token:", token); // Debugging log

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        console.log("Decoded User:", req.user);
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = verifyUserToken;

