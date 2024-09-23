
import fs from 'fs'
import path from 'path'

// 创建文件夹并保存文件
export  function saveFile(filePath,data) {
    // 从URL中提取文件路径
    const directory = path.dirname(filePath);

    // 确保目录存在
    fs.mkdirSync(directory, { recursive: true });

    // 写入文件
    fs.writeFile(filePath, data,(err) => {
        if (err) {
            console.error('文件保存出错:', err);
        } else {
            // console.log('文件已保存:', filePath);
        }
    });
}

//保存图片
export  function saveImage(filePath,imageData) {
  // 从URL中提取文件路径
  const directory = path.dirname(filePath);
  // 确保目录存在
  fs.mkdirSync(directory, { recursive: true });
  // 写入文件
  fs.writeFile(filePath, imageData, "binary", (error) => {
    if (error) {
      console.error("Error saving image:", imageUrl);
    } else {
      // console.log("图片保存成功");
    }
  });
}


export async function createDirectory(dirPath) {
    try {
      // 确保路径存在
      await fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating directory:', err);
          return;
        }
      });
    } catch (err) {
      console.error(`Error creating directory: ${err.message}`);
    }
  }