const { User } = require("../models");
const res = require("express/lib/response");

const userController = {
    login: ({ body }, res) => {
        const { email, password } = body;
        res.send({
            email,
            password
        })
    },
    getUsers: async (req,res) => {
        const users = await User.findAll();
        res.status(200).send(users);
    }
};

module.exports = userController;