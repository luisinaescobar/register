const express = require('express');
const createUserRouter = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

function loadSwaggerinfo(server) {
    try {
        const doc = yaml.load(fs.readFileSync('./src/spec.yml', 'utf8'));
        server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    } catch (e) {
        console.log(e);
    }
};

function makeServer() {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
       
    server.use('/', createUserRouter());
    loadSwaggerinfo(server);
    return server;
}
module.exports = {
    makeServer,
};