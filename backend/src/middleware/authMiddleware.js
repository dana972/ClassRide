const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.token; // JWT stored in cookies
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user details
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};
