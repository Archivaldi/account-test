const { User, RefreshToken } = require("../models");
const jwt = require("jsonwebtoken");

const generateToken = (userInfo, type) => {
    const token = type === "access" 
    ? jwt.sign({ id: userInfo.id }, process.env.JWT_SECRET, { expiresIn: "15m" })
    : jwt.sign({id: userInfo.id}, process.env.JWT_REFRESH_SECRET);
    return token;
};

const userController = {
    login: async ({ body }, res) => {
        const { email, password } = body;
        const user = await User.findOne({ where: { email, password } });
        if (user) {
            const accessToken = generateToken(user, 'access');
            const refreshToken = generateToken(user, 'refresh');
            await RefreshToken.create({refreshToken});
            res.status(200).send({
                accessToken,
                refreshToken,
                userId: user.id
            });

        } else {
            res.status(404).send({
                message: "User with these credentials not found"
            });
        }
    },
    refresh: async ({ body }, res) => {
        //get the refresh token from the user
        const { refreshToken } = body;
        if (!refreshToken) return res.status(401).send({message: 'Not Authenticated'});
        const tokenExists = await RefreshToken.findOne({where: {refreshToken}});
        if (!tokenExists) return res.status(403).send({message: "Refresh Token is not valid"});
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async  (err, user) => {
            if (err) console.log(err);
            await RefreshToken.destroy({where: {refreshToken}});
            const newAccessToken = generateToken(user, 'access');
            const newRefreshToken = generateToken(user, 'refresh');
            await RefreshToken.create({refreshToken: newRefreshToken});
            return res.status(200).send({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                userId: user.id
            });
        });
    },
    getUsers: async (req, res) => {
        const users = await User.findAll();
        res.status(200).send(users);
    }
};

module.exports = userController;