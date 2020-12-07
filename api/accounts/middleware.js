const Accounts = require('./accounts-modal');


const validateAccountId = async (req, res, next) => {
    const { id } = req.params
    try {
        const account = await Accounts.getById(id)
        if(!account) {
            res.status(404).json({ message: `Account with ID ${id} not found.`})
        } else {
            req.Accounts = account
            next()
        }
    } catch (err) {
        res.status(500).json({ message: err.massage })
    }
};

const validateAccount = (req, res, next) => {
    if(!req.body.name || !req.body.budget) {
        res.status(400).json({ message: `Name and buget fields are required` })
    } else (
        next()
    )
};

module.exports = { validateAccount, validateAccountId }