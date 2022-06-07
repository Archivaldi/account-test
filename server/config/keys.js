require('dotenv').config();

const keys = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPw: process.env.DB_PW
};

module.exports = keys;