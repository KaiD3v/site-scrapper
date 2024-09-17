const express = require('express')
const server = express()
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');


// middlewares
server.use(bodyParser.json());

// view engine
server.engine("handlebars", exphbs.engine());
server.set("view engine", "handlebars");

// routes path
const routes = require('./routes/routes')

// routes
server.use(routes)

server.listen(3000, () => {
    console.info('Server rodando na porta 3000')
})

module.exports = { server }