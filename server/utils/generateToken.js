const jwt = require("jsonwebtoken");

const generateToken = (userInfo, type) => {
    const token = type === "access"
        ? jwt.sign({ id: userInfo.id, email:userInfo.email }, process.env.JWT_SECRET, { expiresIn: "10s" })
        : jwt.sign({ id: userInfo.id,  email:userInfo.email }, process.env.JWT_REFRESH_SECRET);
    return token;
};

module.exports = generateToken;