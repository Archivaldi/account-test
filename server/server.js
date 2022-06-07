const express = require("express");
const app = express();
const sequelize = require("./config/connection");
const headers = require("./middlewares/headers");
const router = require("./routes");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(headers);
app.use(router);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listetning on port ${PORT}`))
});