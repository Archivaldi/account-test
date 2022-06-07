const { Model, INTEGER, STRING } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model { };

User.init(
    {

        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        email: {
            type: STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;