import {crawlHtml} from '../utils/crawlHtml.js'
import htmlToMd from '../utils/htmlToMd.js'
import {saveFile,createDirectory} from '../utils/file.js'
import URLJSON from './url2.js'
import * as cheerio from 'cheerio';

const crawlUrl = 'https://cloud.iocoder.cn';
const rootDir = "."

// 根据地址解析MD
async function getMd(url,dir){
    const html =await crawlHtml(url)
    const $ = cheerio.load(html);
    const mdHMTL = $(".content-wrapper").html();
    return htmlToMd(crawlUrl,mdHMTL,dir)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//处理目录树结构
 async function dealCategory(rootDir,data){
    try {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if(!item.link){
                const dir = rootDir+"/"+item.title
                createDirectory(dir);
                dealCategory(dir,item.children)
            }else{
                const fileName = rootDir+"/"+item.title+".md"
                const romoteUrl = crawlUrl+item.link
                console.log(fileName);
                
                const md =await getMd(romoteUrl,rootDir)
                saveFile(fileName,md)
            }
            await sleep(10);
        }
    } catch (error) {
        console.log(error)
    }
    
 
}


dealCategory(rootDir,URLJSON)


console.log(URLJSON);
