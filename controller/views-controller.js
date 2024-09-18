const { searchContent } = require('./puppeteer-controller')

async function HomePage(req, res, next) {
    res.render('scrapper/home')
}

async function ScrappedPage(req, res) {
    res.render('scrapper/scrapped')
}

module.exports = {
    HomePage,
    ScrappedPage
}