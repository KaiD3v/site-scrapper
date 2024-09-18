const puppeteer = require("puppeteer");
const fs = require("fs");

let searchContent;

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
                                text: item.innerHTML,
                                link: item.href
                            };
                        });

                        return resultedLinks;
                    });

                    await page.screenshot({ path: `images/screenshot.png` });

                    return scrappingResult;
                } catch (error) {
                    console.log(error);
                }
            });

        searchContent = scrappingResult;
        return res.json({ scrappingResult });
    } catch (error) {
        console.error("Houve um erro ao buscar o conteúdo do site:", error);
    }
}

async function DownloadScrappingJson(req, res) { }

module.exports = {
    SiteScrapper
};
