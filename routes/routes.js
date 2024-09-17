const express = require('express')
const router = express.Router()

const { GetSiteContent } = require('../controller/puppeteer')

//
router.post('/puppeteer', GetSiteContent)

module.exports = router