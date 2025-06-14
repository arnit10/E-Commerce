const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, "your_secret"); // use same secret as in admin login
    req.adminId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = verifyAdmin;
