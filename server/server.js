const express = require("express");
const app = express();
const sequelize = require("./config/connection");
const headers = require("./middlewares/headers");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const PORT = process.env.PORT || 8080;
let upload = require('express-fileupload');

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(headers);
app.use(cookieParser());
app.use(upload())
app.use(router);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listetning on port ${PORT}`))
});