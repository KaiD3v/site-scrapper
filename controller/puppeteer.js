const puppeteer = require("puppeteer")
const fs = require('fs')

async function GetSiteContent(req, res) {

    try {
        const { search } = req.body
        console.log(search)

        if (!search) {
            return res.status(403).send('Insira uma pesquisa!')
        }

        puppeteer.launch({ headless: 'shell' }).then(async (browser) => {
            const page = await browser.newPage()

            try {
                await page.goto(`https://${search}`)

                await page.screenshot({ path: `images/screenshot.png` })

                await browser.close();

            } catch (error) {
                console.log(error)
            }
        })

        res.send({ search: search })

    } catch (error) {
        console.error('Houve um erro ao buscar o conteúdo do site:', error)
    }
}

module.exports = {
    GetSiteContent
}