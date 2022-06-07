const { User } = require("../models");
const jwt = require("jsonwebtoken");

const userController = {
    login: async ({ body }, res) => {
        const { email, password } = body;
        const user = await User.findOne({where: {email,password}});
        if (user) {
            //generate access token
            const accessToken = jwt.sign({id: user.id}, process.env.JWT_SECRET);
            res.status(200).send({
                accessToken
            });
        } else {
            res.status(404).send({
                message: "User with these credentials not found"
            });
        }
    },
    getUsers: async (req,res) => {
        const users = await User.findAll();
        res.status(200).send(users);
    }
};

module.exports = userController;