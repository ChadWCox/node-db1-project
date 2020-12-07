/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const Accounts = require('./accounts-modal');
const { validateAccount, validateAccountId } = require('./middleware');

router.get('/', (req, res) => {
    Accounts.getAll()
    .then(account => {
        if (!account.length) {
        res.status(404).json([])
        } else {
        res.status(200).json(account)
        } 
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })
});

router.get('/:id', validateAccountId, async (req, res) => {
    const { id } = req.params
    const account = await Accounts.getById(id)
        res.status(200).json(account)
});

router.post('/', validateAccount, async (req, res) => {
    const account = req.body
    await Accounts.create(account)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
            res.status(201).status(req.body)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
});

router.put('/:id', validateAccount, validateAccountId, async (req, res) => {
    const changes = req.body
    const { id } = req.params
    await Accounts.update(id, changes)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
});

router.delete('/:id', validateAccountId, async (req, res) => {
    const { id } = req.params
    await Accounts.delete(id)
    .then(response => {
        res.status(200).json({ message: `The account with ID ${id} was deleted.`})
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
});

module.exports = router