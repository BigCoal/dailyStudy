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
const request = require("request");

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

function crawlingImg(mdPath) {
  const mdPathDir = path.dirname(mdPath);

  //目标目录下没有用静态目录创建
  const staticDir = path.join(mdPathDir, "static");
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }
  // 读取 Markdown 文件内容
  const markdownString = fs.readFileSync(mdPath, "utf-8");

  //匹配md文件内所有的图片资源
  const imgReg = /(http|https):(.*)?\.(jpg|png|awebp)/g;
  const imgs = markdownString.match(imgReg);

  if (imgs) {
    //爬取资源写入静态目录中
    imgs.forEach((imgUrl) => {
      const filename = normalizeFileName(path.basename(imgUrl));
      request(imgUrl).pipe(
        fs.createWriteStream(path.join(staticDir, filename))
      );
    });

    //替换原来的md文件中远程图片地址为本地图片地址
    let newMdString = markdownString.replace(imgReg, (match) => {
      return "./static/" + normalizeFileName(path.basename(match));
    });
    fs.writeFile(mdPath, newMdString, (err) => {
      if (err) throw err;
      console.log(`${mdPath} has been updated.`);
    });
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
const p = path.join(
  __dirname,
  "../docs/03-Front-End-Frame/02-Webpack/05-TreeShaking/05-TreeShaking.md"
);
const paths = getMDFiles(p);
paths.map((pathItem) => {
  crawlingImg(pathItem);
});
