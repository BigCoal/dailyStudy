//plainObject:纯粹的对象，也就是通过{}或者new Object创建的对象
function isPlainObject(obj){
    if(!obj || Object.prototype.toString.call(obj)!=="[object Object]"){
        return false;
    }

    const proto = Object.getPrototypeOf(obj)

    if(!proto){
        return true; //Object.create(null)
    }
    
    const Ctor = proto.hasOwnProperty('constructor')  && proto['constructor']

    return typeof Ctor==='function'&& Ctor.toString()===Object.toString()
}

function Person(name) {
    this.name = name;
}

console.log(isPlainObject({})) // true

console.log(isPlainObject(new Object)) // true

console.log(isPlainObject(Object.create(null))); // true

console.log(isPlainObject(Object.assign({a: 1}, {b: 2}))); // true

console.log(isPlainObject(new Person('yayu'))); // false

console.log(isPlainObject(Object.create({}))); // false