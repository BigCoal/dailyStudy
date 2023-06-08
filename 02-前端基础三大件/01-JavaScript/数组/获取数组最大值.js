const arr = [1,20,34,-10,15]

function getArrMinMax1(arr){
    return Math.max.apply(null,arr)
}

function getArrMinMax2(arr){
    return arr.reduce((pre,next)=>{
        return Math.max(pre,next)
    })
}

function getArrMinMax3(arr){
    return eval("Math.max("+arr+")")
}

console.log(getArrMinMax1(arr))
console.log(getArrMinMax2(arr))
console.log(getArrMinMax3(arr))