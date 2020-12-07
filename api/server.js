const express = require("express");
const server = express();
const cors = require('cors');
const accountsRouter = require('./accounts/accounts-router');

server.use(express.json());
server.get('/', (req, res) => {
    res.send('The API is live.')
});

server.use(cors());
server.use('/api/accounts', accountsRouter);
server.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' })
});

module.exports = server;
