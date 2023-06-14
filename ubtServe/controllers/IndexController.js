const IndexService = require("../services/IndexService")
const IndexController = {
    pay: async (req, res) => {
        // console.log(req.body)
        await IndexService.pay((result) => {
            console.log(result)
            res.send(result)
        });
    },
    payCs: async (req, res) => {
        await IndexService.payCs(req.body, (result) => {
            res.send(result)
        });
    },
    payCsback: async (req, res) => {
        await IndexService.payCsback(req.body, (result) => {
            res.send(result)
        });
    },
}

module.exports = IndexController
