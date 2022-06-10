
const apiController = {
    test: (req, res) => {
        res.send({
            message: "Hello world"
        })
    }
};

module.exports = apiController;