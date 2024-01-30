/*
 * @Author: zhubaokang 1048506792@qq.com
 * @Date: 2023-06-19 21:07:45
 * @LastEditors: zhubaokang 1048506792@qq.com
 * @LastEditTime: 2023-06-19 21:28:37
 * @FilePath: \dailyStudy\tool\md爬取图片保存并修改md中图片地址.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require("fs");
const path = require("path");
const axios = require("axios");

//获取.md 文件，如果传入是一个文件夹，遍历里面所有的md文件
function getMDFiles(pathName) {
  // 判断路径是否存在
  if (!fs.existsSync(pathName)) {
    console.log(`${pathName}不存在`);
    return;
  }
  // 判断路径是文件还是目录
  const stat = fs.statSync(pathName);
  if (stat.isFile()) {
    // 如果是文件判断是否为.md结尾
    if (path.extname(pathName) === ".md") {
      return [pathName];
    } else {
      console.log(`${pathName}不是.md文件`);
      return [];
    }
  } else if (stat.isDirectory()) {
    // 如果是目录返回所有.md结尾的文件
    const files = fs.readdirSync(pathName);
    const mdFiles = files
      .filter((file) => path.extname(file) === ".md")
      .map((file) => path.join(pathName, file));
    return mdFiles;
  } else {
    console.log(`${pathName}不是文件或目录`);
    return [];
  }
}
//下载图片，保存图片
async function downloadImage(imageUrl, savePath) {
  return new Promise((resolve, reject) => {
    axios
      .get(imageUrl, { responseType: "arraybuffer" })
      .then((response) => {
        const imageData = Buffer.from(response.data, "binary");

        fs.writeFile(savePath, imageData, "binary", (error) => {
          if (error) {
            reject(error);
            console.error("Error saving image:", imageUrl);
          } else {
            resolve();
            console.log("Image downloaded and saved successfully.");
          }
        });
      })
      .catch((error) => {
        reject(error);
        console.error("Error downloading image:", imageUrl);
      });
  });
}
async function crawlingImg(mdPath) {
  const mdPathDir = path.dirname(mdPath);

  //目标目录下没有用静态目录创建
  const staticDir = path.join(mdPathDir, "static");
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }
  // 读取 Markdown 文件内容
  const markdownString = fs.readFileSync(mdPath, "utf-8");

  //匹配md文件内所有的图片资源
  const imgReg = /\((http|https):.*?\.(jpg|png|awebp|jpeg|gif)/g;
  const imgs = markdownString.match(imgReg);
  try {
    if (imgs) {
      for (let i = 0; i < imgs.length; i++) {
        const imgUrl = imgs[i].slice(1);
        const filename = normalizeFileName(path.basename(imgUrl));
        const saveFile = path.join(staticDir, filename);

        await downloadImage(imgUrl, saveFile);
      }

      //替换原来的md文件中远程图片地址为本地图片地址
      let newMdString = markdownString.replace(imgReg, (match) => {
        return "(./static/" + normalizeFileName(path.basename(match));
      });
      fs.writeFile(mdPath, newMdString, (err) => {
        if (err) throw err;
        console.log(`${mdPath} has been updated.`);
      });
    }
  } catch (error) {
    throw new Error("Parameter is not a number!");
  }
}

//格式化文件名：主要针对于windows对：文件名不支持和 对awebp后缀转换为png
function normalizeFileName(url) {
  url = url.replaceAll(":", "-");
  if (url.endsWith("awebp")) {
    url = url.slice(0, -5) + "png";
  }
  return url;
}
//目标文件
const p = path.join(__dirname, "../docs/02-Front-End-Basic/06-Flutter/Getx/");
const paths = getMDFiles(p);
console.log(paths);
paths.map((pathItem) => {
  crawlingImg(pathItem);
});
