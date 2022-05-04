const express = require('express');
const createUserRouter = require('./routes/auth');

function makeServer() {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
       
    server.use('/', createUserRouter());
    
    return server;
}
module.exports = {
    makeServer,
};