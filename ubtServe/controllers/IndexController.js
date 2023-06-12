const IndexService = require("../services/IndexService")
const IndexController = {
    pay: async (req, res) => {
        // console.log(req.body)
        await IndexService.pay((result) => {
            console.log(result)
            res.send(result)
        });
    },
    payCS: async (req, res) => {
        // console.log(req.body)
        await IndexService.payCS((result) => {
            res.send(result)
        });
    }
}

module.exports = IndexController
