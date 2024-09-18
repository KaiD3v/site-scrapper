const puppeteer = require("puppeteer");
const fs = require('fs')

async function SiteScrapper(req, res) {
    try {
        const { search } = req.body;
        console.log(search);

        if (!search) {
            return res.status(403).send("Insira uma pesquisa!");
        }

        const scrappingResult = await puppeteer
            .launch({ headless: "shell" })
            .then(async browser => {
                const page = await browser.newPage();

                try {
                    await page.goto(`${search}`);

                    let scrappingResult = await page.evaluate(() => {
                        let nodeList = document.querySelectorAll("a");
                        let list = [...nodeList];

                        let resultedLinks = list.map(item => {
                            return {
                                text: item.textContent || item.href || 'Sem texto definido',
                                link: item.href || '/'
                            };
                        });

                        return resultedLinks;
                    });

                    fs.writeFileSync(`./db/teste.json`, JSON.stringify(scrappingResult, null, 2), err => {
                        if (err) throw new Error('Erro ao transformar conteúdo em json')
                    })

                    return scrappingResult;
                } catch (error) {
                    console.log(error);
                }
            });

        res.render('scrapper/scrapped', { searchContent: scrappingResult });

    } catch (error) {
        console.error("Houve um erro ao buscar o conteúdo do site:", error);
    }
}

module.exports = {
    SiteScrapper
};
