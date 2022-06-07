const jwt = require("jsonwebtoken");

const generateToken = (userInfo, type) => {
    const token = type === "access"
        ? jwt.sign({ id: userInfo.id }, process.env.JWT_SECRET, { expiresIn: "15s" })
        : jwt.sign({ id: userInfo.id }, process.env.JWT_REFRESH_SECRET);
    return token;
};

module.exports = generateToken;