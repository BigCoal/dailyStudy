const str = `<div>测\n试</div><p>你好</p>`
const regExp = /<([^>]+>)[\d\D]*<\/\1/g
console.log(str.match(regExp))