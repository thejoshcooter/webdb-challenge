// import express
const express = require('express');
// implement server
const server = express();
// body parser
server.use(express.json());

// default fallback
server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the WebDB Challenge</h1>');
});

// 404 fallback
server.use('/', (req, res) => {
    res.status(404).send('<h1>Unfortunately, we could not find that page</h1>');
});

// server export
module.exports = server;