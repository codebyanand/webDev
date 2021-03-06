// node pepLecUrlLoader.js

// npm init -y
// npm install puppeteer

let puppeteer = require("puppeteer");
let fs = require("fs");

let userDetail = fs.readFileSync("userDetail.json", "utf-8");
let UDJSO = JSON.parse(userDetail);

// console.log(UDJSO);

let url = "https://www.pepcoding.com/login";


run();
async function run(){
    let browser = await puppeteer.launch({
        defaultViewport: null,
        args: [
            "--start-maximized"
        ],
        headless: false
    });

    let pages = await browser.pages();
    let page = pages[0];

    await page.goto(url);

    // await page.waitFor(2000);

    await page.waitForSelector("input[placeholder='email']");
    await page.type("input[placeholder='email']", UDJSO.userid);

    await page.waitForSelector("input[placeholder='Password']");
    await page.type("input[placeholder='Password']", UDJSO.password);

    await page.waitForSelector("button[type='submit']");
    await page.click("button[type='submit']");

    await page.waitForSelector("i[class='svg-user svg-header']");
    await page.click("i[class='svg-user svg-header']");

    await page.waitForSelector("span[class='col l8 s8 m8 lp-dropdown']");
    await page.click("span[class='col l8 s8 m8 lp-dropdown']");

    await page.waitForSelector("h5[class='col l7 s7 m7']");
    await page.click("h5[class='col l7 s7 m7']");

    await page.waitForSelector("a[href='/the-placement-program-pitampura-jun-22-2021/130/classvideos/6241']");
    await page.click("a[href='/the-placement-program-pitampura-jun-22-2021/130/classvideos/6241']");

    // await page.waitForSelector("li[class='searchRow']");
    // let urls = await page.$$eval("li[class='searchRow']", function (atag) {
    //     let np = parseInt(atag.getAttribute("a[href]"));
    //     return np;
    // })

    // console.log(urls);

    await handlePage(browser, page);
}


async function handlePage(browser, page){
    await page.waitForSelector("span.bold");
    let ourls = await page.$$eval("span.bold", function(atags){
        let iurls = [];
        for (let i = 0; i < atags.length; i++) {
            let url = atags[i].getAttribute("title");
            iurls.push(url);            
        }
        return iurls;
    });
    console.log(ourls);
}


// async function handlePage(browser, page){
//     await page.waitForSelector("li.searchRow > a");
//     let ourls = await page.$$eval("li.searchRow > a", function(atags){
//         let iurls = [];
//         for (let i = 0; i < atags.length; i++) {
//             let url = "https://classroom.pepcoding.com/" + atags[i].getAttribute("href");
//             iurls.push(url);            
//         }
//         return iurls;
//     });
//     console.log(ourls);
// }