const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) res.status(401).send({message: "Not Authenticated"});
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({message: "Token is not valid"});
        req.user = user;
        next();
    })

};

module.exports = auth;