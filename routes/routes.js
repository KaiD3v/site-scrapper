const express = require('express')
const router = express.Router()

// scrapper
const { SiteScrapper, DownloadScrappedDocument } = require('../controller/puppeteer-controller')

// views
const { HomePage, ScrappedPage } = require('../controller/views-controller')

// scrapper
router.post('/puppeteer', SiteScrapper)
router.get('/download', DownloadScrappedDocument)

// views
router.get('/', HomePage)
router.get('/scrapped', ScrappedPage)


module.exports = router