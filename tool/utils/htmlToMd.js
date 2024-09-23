import TurndownService from "turndown";
import {crawlImage} from '../utils/crawlHtml.js'
import { saveImage } from "./file.js";


function htmlToMd(defaultUrl,htmlContent,dir) {


  const turndownService = new TurndownService();

  // 添加处理标题的规则
  turndownService.addRule("heading", {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    replacement: function (content, node, options) {
      var hLevel = Number(node.nodeName.charAt(1));
      return Array(hLevel + 1).join("#") + " " + content + "\n";
    },
  });

  turndownService.addRule("pre", {
    filter: "pre",
    replacement: function (content, node) {
      var lang = node.className.match(/language-(\w+)/);
      if (lang) {
        return "\n```" + lang[1] + "\n" + node.firstChild.textContent + "\n```\n";
      }
      return "\n```\n" + node.firstChild.textContent + "\n```\n";
    },
  });



  turndownService.addRule("image", {
    filter: "img",
    replacement: function (content, node) {
      const alt = node.getAttribute("alt") || "";
      let src = node.getAttribute("src") || "";
      if(src.includes("data:image")){
        return ``;
      }else{
        let fileInfo = src.split("?")[0].split("/")
        let fileName= decodeURIComponent(fileInfo[fileInfo.length-1])
        if(!src.includes("http")){
          src =defaultUrl+src
        }
        crawlImage(src).then(imageData=>{
          saveImage(dir+'/static/'+fileName,imageData)
        }).catch(err=>{
          console.log("下载图片报错了",dir+'/static/'+fileName)
        })
        return `![${alt}](./static/${fileName})`;
      }
    },
  });

  const markdownContent = turndownService.turndown(htmlContent);
  return markdownContent;
}

export default htmlToMd;
