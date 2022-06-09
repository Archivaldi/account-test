const { Model, INTEGER, STRING, TEXT } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model { 
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
 };

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
            allowNull: true,
            validate: {
                len: [6]
            }
        },
        name: {
            type: STRING,
            allowNull: false
        },
        picture: {
            type: TEXT,
            allowNull: false
        }
        

    },
    {
        hooks: {
            beforeCreate: async (userData) => {
                if (userData.password) {
                    userData.password =  await bcrypt.hash(userData.password, 10);
                }
                return userData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;