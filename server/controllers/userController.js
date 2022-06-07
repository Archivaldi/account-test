const { User, RefreshToken } = require("../models");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const userController = {
    login: async ({ body }, res) => {
        const { email, password } = body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).send({ message: "Invalid email" });
            return;
        }
        const isValidPassword = user.checkPassword(password);
        if (!isValidPassword) {
            res.status(400).send({message: "Invalid password"});
            return;
        }
        const accessToken = generateToken(user, 'access');
        const refreshToken = generateToken(user, 'refresh');
        await RefreshToken.create({ refreshToken });
        res.status(200).send({
            accessToken,
            refreshToken,
            user
        });
    },
    signup: async ({ body }, res) => {
        try {
            const { email, password } = body;
            const user = await User.create({ email, password });
            const accessToken = generateToken(user, 'access');
            const refreshToken = generateToken(user, 'refresh');
            await RefreshToken.create({ refreshToken });
            res.status(200).send({
                accessToken,
                refreshToken,
                user
            });
        } catch (err) {
            res.status(500).send({ message: "Something went wrong" });
        }
    },
    refresh: async ({ body }, res) => {
        //get the refresh token from the user
        const { refreshToken } = body;
        if (!refreshToken) return res.status(401).send({ message: 'Not Authenticated' });
        const tokenExists = await RefreshToken.findOne({ where: { refreshToken } });
        if (!tokenExists) return res.status(403).send({ message: "Refresh Token is not valid" });
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
            if (err) console.log(err);
            await RefreshToken.destroy({ where: { refreshToken } });
            const newAccessToken = generateToken(user, 'access');
            const newRefreshToken = generateToken(user, 'refresh');
            await RefreshToken.create({ refreshToken: newRefreshToken });
            return res.status(200).send({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                user
            });
        });
    },

    logout: async ({ body }, res) => {
        const { refreshToken } = body;
        await RefreshToken.destroy({ where: { refreshToken } });
        res.status(200).send({ message: "Logged out successfully" });
    },

    getUsers: async (req, res) => {
        const users = await User.findAll();
        res.status(200).send(users);
    }
};

module.exports = userController;