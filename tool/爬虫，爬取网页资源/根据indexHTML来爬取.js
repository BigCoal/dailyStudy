const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');
const url = require('url');

const baseUrl = 'https://vr.ff.com/us/';
const saveDir = './downloaded';

const downloadResource = async (resourceUrl, savePath) => {
    try {
        const response = await axios.get(resourceUrl, { responseType: 'arraybuffer' });
        await fs.outputFile(savePath, response.data);
        console.log(`Downloaded and saved: ${resourceUrl}`);
    } catch (error) {
        console.error(`Error downloading ${resourceUrl}: ${error.message}`);
    }
};

const getAbsoluteUrl = (link) => {
    // 如果链接是相对的，将其转换为绝对链接
    return link.startsWith('http') ? link : url.resolve(baseUrl, link);
};

const downloadResourcesFromHtml = async (html, basePath) => {
    const $ = cheerio.load(html);
    const resources = [];

    $('link, script, img').each((i, element) => {
        const link = $(element).attr('href') || $(element).attr('src');
        if (link) {
            resources.push(getAbsoluteUrl(link));
        }
    });

    for (const resourceUrl of resources) {
        const parsedUrl = new URL(resourceUrl);
        const savePath = path.join(saveDir, basePath, parsedUrl.pathname);
        await downloadResource(resourceUrl, savePath);
    }
};

const startCrawling = async () => {
    try {
        const response = await axios.get(baseUrl);
        const basePath = new URL(baseUrl).pathname;
        await downloadResourcesFromHtml(response.data, basePath);
    } catch (error) {
        console.error(`Error in startCrawling: ${error.message}`);
    }
};

startCrawling();
