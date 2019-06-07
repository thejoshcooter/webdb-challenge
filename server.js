// import knex
const knex = require('knex');
// knex config
const knexConfig = require('./knexfile.js');
// implement knex
const db = knex(knexConfig.development);

// import express
const express = require('express');
// implement server
const server = express();
// body parser
server.use(express.json());

// add a project
server.post('/api/projects', (req, res) => {
    if(req.body) {
        db('projects')
        .insert(req.body)
        .then(id => {
            res.status(201).json({ message: 'project added' });
        })
        .catch(err => {
            res.status(400).json({ error: 'error adding project' })
        })
    }
});

// add an action
server.post('/api/actions', (req, res) => {
    if(req.body) {
        db('actions')
        .insert(req.body)
        .then(id => {
            res.status(201).json({ message: 'action added' });
        })
        .catch(err => {
            res.status(400).json({ error: 'error adding action' })
        })
    }
});

// get projects by id



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