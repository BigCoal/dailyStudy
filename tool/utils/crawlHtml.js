import axios from 'axios'

// 爬取网页
export  async function crawlHtml(url) {
  try {
    const response = await axios({
      method: "get",
      url: url,
    });    
    return response.data;
  } catch (error) {
    console.error("下载错误:", url);
  }
}

// 爬取图片
export async function crawlImage(imageUrl, savePath) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" })
    const imageData = Buffer.from(response.data, "binary");
    return imageData;
  } catch (error) {
    console.error("下载图片错误:",imageUrl);
  }
}