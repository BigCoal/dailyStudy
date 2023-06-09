const fs = require("fs");
const path = require("path");
const request = require("request");

//目标文件
const mdPath = path.join(
  __dirname,
  "../src/04-工程化/03-Babel/ AST（抽象语法树）以及 AST 的广泛应用.md"
);
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

console.log(imgs);
//爬取资源写入静态目录中
imgs.forEach((imgUrl) => {
  const filename = path.basename(imgUrl);
  request(imgUrl).pipe(fs.createWriteStream(path.join(staticDir, filename)));
});

//替换原来的md文件中远程图片地址为本地图片地址
let newMdString = markdownString.replace(imgReg, (match) => {
  return "./static/" + path.basename(match);
});
fs.writeFile(mdPath, newMdString, (err) => {
  if (err) throw err;
  console.log(`${mdPath} has been updated.`);
});
