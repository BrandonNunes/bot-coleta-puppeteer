const puppeteer =  require('puppeteer');
const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()
// https://br.linkedin.com/pub/dir/+/+?trk=homepage-basic_intent-module-secondBtn

async function serchPerson(nome) {
    const browser = await puppeteer.launch({headless: true});
    console.log('abrindo browser')
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 720,
        deviceScaleFactor: 2,
    });
    await page.goto('https://www.google.com');
    await page.click('.gLFyf.gsfi')
    await page.keyboard.type(nome+' '+'linkedin')
    await page.keyboard.press('Enter')
    await page.waitForNavigation({waitUntil: 'domcontentloaded'})
    const titles = await page.evaluate(() => {
               let list = document.querySelectorAll('h3.LC20lb.MBeuO.DKV0Md')
               let newList = []
                list.forEach((item) => newList.push(item.innerHTML))
                return newList;
    })
   // console.log(titles)
    titles.forEach((item) => {
        fs.appendFile(`listas/${nome.replaceAll(' ', '')}.txt`, `${item}\n`, (err) => {
            if(err) {
                console.log(err)
            }else{
                console.log(item+': Gravado')
            }
        })
    })
    await browser.close()
    console.log('Processo finalizado')
}

serchPerson('brandon alves nunes')