// import server
const server = require('./server');

// implement heroku ready port
const port = process.env.PORT || 5000;

// server listen
server.listen(port, () => console.log(`** Server ninjas deployed to port ${port} **`));