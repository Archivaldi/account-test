const express = require("express");
const app = express();
const sequelize = require("./config/connection");
const headers = require("./middlewares/headers");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const PORT = process.env.PORT || 8080;
let upload = require('express-fileupload');
const path = require('path');

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(headers);
app.use(cookieParser());
app.use(upload());
app.use(router); 

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")))
};

if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"))
    })
};

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listetning on port ${PORT}`))
});