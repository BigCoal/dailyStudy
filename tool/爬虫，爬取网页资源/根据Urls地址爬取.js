const axios = require('axios');
const fs = require('fs');
const path = require('path');

// URL列表
const urls = [
    "https://vr.ff.com/textures/ledA.png",
    "https://vr.ff.com/meshes/vrBodyCompiled.json",
    "https://vr.ff.com/meshes/vrWheelBrakes.json",
    "https://vr.ff.com/textures/envReflection/xp.jpg",
    "https://vr.ff.com/textures/envReflection/yp.jpg",
    "https://vr.ff.com/textures/envReflection/yn.jpg",
    "https://vr.ff.com/textures/envReflection/zp.jpg",
    "https://vr.ff.com/textures/envReflection/xn.jpg",
    "https://vr.ff.com/textures/envReflection/zn.jpg",
    "https://vr.ff.com/textures/envSkybox/xn.jpg",
    "https://vr.ff.com/textures/envSkybox/xp.jpg",
    "https://vr.ff.com/textures/envSkybox/yp.jpg",
    "https://vr.ff.com/textures/envSkybox/yn.jpg",
    "https://vr.ff.com/textures/envSkybox/zp.jpg",
    "https://vr.ff.com/textures/envSkybox/zn.jpg",
    "https://vr.ff.com/textures/flareHead.jpg",
    "https://vr.ff.com/textures/flareTurn.jpg",
    "https://vr.ff.com/textures/lightTurn.jpg",
    "https://vr.ff.com/textures/lightStop.jpg",
    "https://vr.ff.com/textures/shadow.jpg",
    "https://vr.ff.com/textures/thread.jpg",
    "https://vr.ff.com/textures/icoBtns.png",
    "https://vr.ff.com/textures/icoCtrls.png"
];

// 创建文件夹并保存文件
function saveFile(url, data) {
    // 从URL中提取文件路径
    const filePath = url.split('https://vr.ff.com/')[1];
    const fullFilePath = path.join(__dirname, filePath);
    const directory = path.dirname(fullFilePath);

    // 确保目录存在
    fs.mkdirSync(directory, { recursive: true });

    // 写入文件
    fs.writeFile(fullFilePath, data, 'binary', (err) => {
        if (err) {
            console.error('文件保存出错:', err);
        } else {
            console.log('文件已保存:', fullFilePath);
        }
    });
}

// 处理每个URL
urls.forEach(url => {
    axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer'
    })
    .then(response => saveFile(url, response.data))
    .catch(error => console.error('下载错误:', error));
});