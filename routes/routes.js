const express = require('express')
const router = express.Router()

const { SiteScrapper } = require('../controller/puppeteer-controller')
const { HomePage } = require('../controller/views-controller')

// scrapper
router.post('/puppeteer', SiteScrapper)

// views
router.get('/', HomePage)


module.exports = router