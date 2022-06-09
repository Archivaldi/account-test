const { User, RefreshToken } = require("../models");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const axios = require("axios");
const cloudinary = require('cloudinary').v2;


const userController = {
    googleLogin: async ({ body, res }) => {
        const { token } = body;
        try {
            const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`);
            const {email, name, picture} = userInfo.data;
            let user = await User.findOne({ where: { email, picture, name } });
            if (!user) {
                user = await User.create({email, name, picture});
            }
            const accessToken = generateToken(user, 'access');
            const refreshToken = generateToken(user, 'refresh');
            await RefreshToken.create({ refreshToken });
            const cookieOptions = { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) };
            res
                .status(200)
                .cookie('refreshToken', refreshToken, cookieOptions)
                .send({
                    success: true,
                    accessToken,
                    user
                });
        } catch (err) {
            console.log(err);
            res.status(err.status).send({
                success: false,
                error: err.data.error
            });
        };
    },

    login: async ({ body }, res) => {
        const { email, password } = body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).send({
                success: false,
                message: "Invalid email"
            });
            return;
        }
        const isValidPassword = user.checkPassword(password);
        if (!isValidPassword) {
            res.status(400).send({
                success: false,
                message: "Invalid password"
            });
            return;
        }
        const accessToken = generateToken(user, 'access');
        const refreshToken = generateToken(user, 'refresh');
        await RefreshToken.create({ refreshToken });
        const cookieOptions = { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) };
        res
            .status(200)
            .cookie('refreshToken', refreshToken, cookieOptions)
            .send({
                success: true,
                accessToken,
                user
            });
    },
    signup: async ({ body, files }, res) => {
        try {
            const { email, password, name } = body;
            console.log(body);
            console.log(files);
            const user = await User.create({ email, password, name, avatar });
            const accessToken = generateToken(user, 'access');
            const refreshToken = generateToken(user, 'refresh');
            await RefreshToken.create({ refreshToken });
            const cookieOptions = { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) };

            res
                .status(200)
                .cookie('refreshToken', refreshToken, cookieOptions)
                .send({
                    success: true,
                    accessToken,
                    user
                });
        } catch (err) {
            res.status(500).send({ message: "Something went wrong" });
        }
    },
    refresh: async ({ cookies }, res) => {
        const { refreshToken } = cookies;
        if (!refreshToken) return res.status(401).send({ success: false, message: 'Not Authenticated' });
        const tokenExists = await RefreshToken.findOne({ where: { refreshToken } });
        if (!tokenExists) return res.status(403).send({ success: false, message: "Refresh Token is not valid" });
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
            if (err) {
                console.log(err);
                res
                    .status(403)
                    .send({
                        success: false,
                        error: "The token is not valid"
                    });
                return;

            };
            await RefreshToken.destroy({ where: { refreshToken } });
            const newAccessToken = generateToken(user, 'access');
            const newRefreshToken = generateToken(user, 'refresh');
            await RefreshToken.create({ refreshToken: newRefreshToken });
            const cookieOptions = { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000), sameSite: 'strict' };
            return res
                .status(200)
                .cookie('refreshToken', newRefreshToken, cookieOptions)
                .send({
                    success: true,
                    accessToken: newAccessToken,
                    user
                });
        });
    },

    logout: async ({ cookies }, res) => {
        const { refreshToken } = cookies;
        await RefreshToken.destroy({ where: { refreshToken } });
        res
            .status(200)
            .clearCookie("refreshToken")
            .send({
                success: true,
                message: "Logged out successfully"
            });
    },

    getUsers: async (req, res) => {
        const users = await User.findAll();
        res.status(200).send(users);
    }
};

module.exports = userController;