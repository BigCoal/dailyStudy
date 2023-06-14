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
      const filename = path.basename(imgUrl);
      request(imgUrl).pipe(
        fs.createWriteStream(path.join(staticDir, filename))
      );
    });

    //替换原来的md文件中远程图片地址为本地图片地址
    let newMdString = markdownString.replace(imgReg, (match) => {
      return "./static/" + path.basename(match);
    });
    fs.writeFile(mdPath, newMdString, (err) => {
      if (err) throw err;
      console.log(`${mdPath} has been updated.`);
    });
  }
}

//目标文件
const p = path.join(__dirname, "../src/03-前端框架/01-Vue3/Vue3源码解析/文章");
const paths = getMDFiles(p);
paths.map((pathItem) => {
  crawlingImg(pathItem);
});
