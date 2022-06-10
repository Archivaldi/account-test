const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send({
            success: false,
            error: "Not Authenticated"
        });
        return;
    };
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).send({
                success: false,
                error: "Token is not valid"
            });
            return;
        };
        req.user = user;
        next();
    })

};

module.exports = auth;