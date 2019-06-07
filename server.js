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
server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const project = db("projects").where({ id });
    const actions = db("projects")
      .join("actions", "actions.project_id", "projects.id")
      .where("projects.id", id);

    Promise.all([project, actions])
      .then(projectAll => {
        let project = projectAll[0][0];
        let actions = projectAll[1];
        actions.forEach(action => (action.complete = !!action.complete));
        const result = { ...project, actions: actions };
        res.status(200).json(result);
      })
      .catch(err => res.status(500).json({ error: 'error retrieving project' }));
});


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