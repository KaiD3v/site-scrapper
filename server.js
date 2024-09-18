const express = require('express')
const server = express()
const exphbs = require("express-handlebars");

const Handlebars = require('handlebars');


// middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json())

// view engine
server.engine("handlebars", exphbs.engine());
server.set("view engine", "handlebars");
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});

// routes path
const routes = require('./routes/routes')

// routes
server.use(routes)

// public path
server.use(express.static('public'))

server.listen(3000, () => {
    console.info('Server rodando na porta 3000')
})

module.exports = { server }