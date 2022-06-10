const { Model, TEXT, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

class RefreshToken extends Model { };

RefreshToken.init(
    {

        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        refreshToken: {
            type: TEXT,
            allowNull: false
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'refresh_token'
    }
);

module.exports = RefreshToken;