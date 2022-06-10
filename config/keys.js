require('dotenv').config();

const keys = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPw: process.env.DB_PW,
    cloud_name: process.env.CLOUD_NAME,
    apikey: process.env.CLOUD_APIKEY,
    secret: process.env.CLOUD_SECRET
};

module.exports = keys;