const express = require('express')
const server = express()
const bodyParser = require('body-parser');


// middlewares
server.use(bodyParser.json());

// routes path
const routes = require('./routes/routes')

// routes
server.use(routes)

server.listen(3000, () => {
    console.info('Server rodando na porta 3000')
})

module.exports = { server }