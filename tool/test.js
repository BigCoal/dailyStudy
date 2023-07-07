const markdownString = `(https://cdn.nlark.com/yuque/0/2022/png/274425/1659275850571-0955ab40-2687-4691-9540-0027cc72df95.png?x-oss-process=image%2Fresize%2Cw_1500%2Climit_0 "image.png`;

const imgReg = /\((http|https):.*?\.(jpg|png|awebp|jpeg)/g;
const imgs = markdownString.match(imgReg);

console.log(imgs);
