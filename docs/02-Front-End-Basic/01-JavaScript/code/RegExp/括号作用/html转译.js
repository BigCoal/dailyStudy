const escapeChars = {
    '<':'lt',
    '>':'gt',
    '"':'quot',
    '\'':'#39',
    '&':'amp',
    ' ':'nbsp'
}
const str = '<div>你 好"中\'国,&你真美</div>'
const regExp = /[<>"' &]/g
const newStr = str.replace(regExp,(match)=>{
    return `&${escapeChars[match]};`
})

console.log(newStr)