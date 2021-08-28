var hzzzy111 = function(){
//简单json解析器，没有处理空格，  只处理正确信息
  function parseJson(str){
    var i = 0
    return parseValue()
    function parseValue(){
      var res = str[i]
  
      if(res == '"'){
        return parseString()
      }
      if(res == '['){
        return parseArray()
      }
      if(res == '{'){
        return parseObject()
      }
      if(res == 't'){
        return parseTrue()
      }
      if(res == 'f'){
        return parseFlase()
      }
      if(res == 'n'){
        return parseNull()
      }
      return parseNumber()
    }
  
    function parseTrue(){
      i += 4
      return true
    }
    
    function parseFlase(){
      i += 5
      return false
    }
  
    function parseNull(){
      i += 4
      return null
    }
  
    function parseString(){
      i++
      var target = ''
      while (str[i] !== '"') {
        target += str[i++]
      }
      i++
      return target
    }

    function parseNumber(){
      var target = ''
      while (str[i] > '0' && str[i] < "9") {
        target += str[i++]
      }
      return Number(target)
    }
  
    //[1,"false",false]
    function parseArray(){
      i++;
      var ary = []
      while(str[i] !== ']'){
        var arg = parseValue()
        ary.push(arg)
        if(str[i] == ','){
          i++
        }else if(str[i] == ']'){
          break
        }
      }
      i++
      return ary
    }
  
  //'{"a":1,"b":[1,2,3],"c":{"x":1,"yyy":false}}'
  //'{"a":[1,2]}'
    function parseObject(){
      i++;
      var map = {}
      
      while(str[i] !== '}'){
        var key = parseString() //JSON规定了，属性名需要""
        i++   //:
        var val = parseValue()
        map[key] = val
        if(str[i] == ','){
          i++
        }
      }
      i++
      return map
    }
  
  }
 
  
//

  function chunk(array, size= 1) {
    var ary = [], count = 0
    ary.push([])
    for(var i = 0; i < size; i++){
      ary[count].push(array[i])   
      if(i == size - 1){
        ary.push([])
        count++
      }
    }
    for(var j = size; j < array.length; j++){
      ary[count].push(array[j]) 
    }
    return ary
  }

  function compact(array){
    var ary = []
    for(var i = 0; i < array.length; i++){
      if(!array[i]){
        continue
      }
      ary.push(array[i])
    }
    return ary
  }

  function uniq(array){
    var ary = []
    for(var i = 0; i < array.length; i++){
      if(!ary.includes(array[i])){
        ary.push(array[i])
      }
    }
    return ary
  }

  function uniqBy(array, mapper){
    let res = [], ary = []
    mapper = iteratee(mapper)
    for(let i = 0; i < array.length; i++){
      if(!ary.includes(mapper(array[i]))){
        res.push(array[i])
        ary.push(mapper(array[i]))
      }
    }
    return res
  }

  //对象不成功
  function uniqueBy(array, iteratee){
    var ary = []
    for(var i = 0; i < array.length; i++){
      for(var j = 1 + i; j < array.length; j++){
        if(iteratee(array[i]) != iteratee(array[j])){
          ary.push(array[i])
        }
      }
    }
    return ary
  }

  function flattenDeep(array){      
    return array.reduce( (result, item) => {
      return result = result.concat( Array.isArray(item) ? flattenDeep(item) : item )
    } ,[])
  }

  function flattenDepth(array, depth = 1){
    if(depth == 0){
      return array
    }
    var ary = []
    for(var i = 0; i < array.length; i++){
      if(Array.isArray(array[i])){
        array[i] = flattenDepth(array[i], depth - 1)
        for(var j = 0; j < array[i].length; j++){
          ary.push(array[i][j])
        }
      }else{
        ary.push(array[i])
      }
    }
    return ary
  }

  function groupBy(array, iteratee){
    var map = {}
    
    if(typeof(iteratee) === 'function'){
      for(var i = 0; i < array.length; i++){
        var key = iteratee(array[i])
        if( !(key in map) ){
          map[key] = []
        }
        map[key].push(array[i])
      }
    }else{
      for(var i = 0; i < array.length; i++){
        var key = array[i][iteratee]
        if( !(key in map) ){
          map[array[i][iteratee]] = []
        }
        map[key].push(array[i])
      }
    }

    return map
  }

  function forEach(array, iteratee){
    for(var i = 0; i < array.length; i++){
      iteratee(array[i], i, array)
    }
    return array
  }

  //
  function map(array, mapper){
    let res = []
    mapper = iteratee(mapper)

    for(let i = 0; i < array.length; i++){
      res.push(mapper(array[i], i, array))
    }
    return res
  }

  function zip(array){
    var ary = []
    for(var i = 0; i < arguments.length; i++){
      for(var j = 0; j< arguments[i].length; j++){
        if(!ary[j]){
          ary[j] = []
        }
        ary[j].push(arguments[i][j])    
      }
    }
    return ary
  }

  function unzip(array){
    var ary = []
    for(var i = 0; i < array.length; i++){
      for(var j = 0; j< array[i].length; j++){
        if(!ary[j]){
          ary[j] = []
        }
        ary[j].push(array[i][j])    
      }
    }
    return ary
  }

  function every(array, predicate){
    var map = {}
    for(var i = 0; i < array.length; i++){
      if(typeof predicate === 'function'){
        if( !predicate(array[i]) ){
          return false
        }
      }else{
        if(predicate[0] in array[i]){
          var x = predicate[0]
          predicate[1] == array[i][x]
          continue
        }else{
          return false
        }
      }
    }
    return true
  }

  function some(array, predicate){
    var map = {}
    for(var i = 0; i < array.length; i++){
      if(typeof predicate === 'function'){
        if( predicate(array[i]) ){
          return true
        }
      }else{
        if(Array.isArray(predicate)){
          if(predicate.length > 1){
            var x = predicate[i]
            if(predicate[1] == array[i][x])
            return true
          }
        }
        if(predicate in array[i]){
          return true
        }
      }
    }
    return false
  }

  function difference(preArray, ...restArray){
    var ary = []
    for(var i = 0; i < preArray.length; i++){
      var flags = false
      for(var j = 0; j < restArray.length; j++){
        for(var z = 0; z < restArray[j].length; z++){
          if(preArray[i] == restArray[j][z]){
            flags = true
          }
        }
      }
      if(!flags){
        ary.push(preArray[i])
      }
    }
    return ary
  }

  function drop(array, number = 1){
    for(var i = 0; i < number; i++){
      array.shift(array[i])
    }
    return array
  }

  function dropRight(array, number = 1){
    for(var i = 0; i < number; i++){
      array.pop(array[i])
    }
    return array
  }


  function dropRightWhile(array, predicate){
    let res = [],  flags = false
    predicate = iteratee(predicate)
    for(var i = array.length - 1; i >= 0; i--){
      if(!predicate(array[i], i, array)){
        flags = true
      }
      if(flags){
        res.unshift(array[i])
      }
    }
    return res
  }

  function dropWhile(array, predicate){
    let res = [], flags = false
    predicate = iteratee(predicate)
    for(var i = 0; i < array.length; i++){
      if(!predicate(array[i], i, array)){
        flags = true
      }
      if(flags){
        res.push(array[i])
      }
    }
    return res
  }
  

  function fill(array, value, start = 0, end = array.length){
    for(var i = start; i < end ; i++){
      array[i] = value
    }
    return array
  }

  function flatten(array) {
    var result = []
    for(var i = 0; i < array.length; i++){
      var target = array[i]
      if(Array.isArray(target)){
        for(var j = 0; j < target.length; j++){
          result.push(target[j])
        }
      }else{
        result.push(array[i])
      }
    }
    return result
  }

  function fromPairs(pairs){
    var map = {}
    for(var i = 0; i < pairs.length; i++){
      var target = pairs[i]
      map[target[0]] = target[1]
    }
    return map
  }

  function head(array){
    if(!arguments.length){
      return undefined
    }
    return array.shift()
  }

  function indexOf(array, value, fromIndex = 0){
    for(var i = fromIndex; i < array.length; i++){
      if(array[i] == value){
        return i
      }
    }
  }

  function initial(array){
    if(!arguments.length) return undefined
    array.pop()
    return array
  }

  function intersection(...arrays){
    if(!arguments.length) return []
    var result = []
    for(var i = 0; i < arrays[0].length; i++){
      for(var j = 1; j < arrays.length; j++){
        var flags = false
        if(arrays[j].includes(arrays[0][i])){
          flags = true
        }
        break
      }
      if(flags){
        result.push(arrays[0][i])
      }
    }
    return result
  }

  function intersectionBy(...array){
    let mapper = array[array.length - 1]
    mapper = iteratee(mapper)     
    let res = []
    for(var i = 0; i < array[0].length; i++){
      let target = array[0][i] 
      array[1].map(it => {
        if(mapper(it) == mapper(target) && !res.includes(target)){
          res.push(target)
        }
      })
    }
    return res
  }


  function intersectionWith(...array){
    let mapper = array[array.length - 1] 
    let res = []

    for(var i = 0; i < array[0].length; i++){
      let target = array[0][i] 
      array[1].map(it => {
        if(mapper(it, target)){
          res.push(target)
        }
      })
    }
    return res
  }
  

  function join(array, separator = ","){
    if(!array) return ""
    var str = ""
    for(var i = 0; i < array.length; i++){
      if(i == array.length - 1){
        str += array[i] + ""
      }else{
        str += array[i] + "" + separator
      }
    }
    return str
  }

  function last(array){
    if(!arguments.length) return undefined
    return array.pop()
  }

  function lastIndexOf(array, value, fromIdx = array.length - 1){
    if(!array) return undefined
    let target = -1
    for(var i = fromIdx; i > 0; i--){
      if(array[i] === value){
        target = i
        return target
      }
    }
    return target
  }

  function nth(array, num = 0){
    if(!array) return undefined
    if(num < 0){
      var target = array.length + num
    }else{
      var target = num
    }
    for(var i = 0; i <= array.length - 1; i++){
      if(i === target){
        return array[i]
      }
    }
  }

  function pull(array, ...values){
    if(!array) return []
    for(var i = 0; i < values.length; i++){
      if(array.includes(values[i])){
        for(var j = 0; j  < array.length; j++){
          if(array[j] === values[i]){
            array.splice(j, 1)
          }
        }
      }
    }
    return array
  }

  function pullAll(array, values){
    if(!array) return []
    for(var i = 0; i < values.length; i++){
      if(array.includes(values[i])){
        for(var j = 0; j  < array.length; j++){
          if(array[j] === values[i]){
            array.splice(j, 1)
          }
        }
      }
    }
    return array
  }

  function pullAllBy(array, values, f){
    f = iteratee(f)

    for(let i = 0; i < array.length;){
      let flags = false
      values.map(it => {
        if(f(array[i]) == f(it)){
          array.splice(i, 1)
          flags = true
        }
      })
      if(!flags)
        i++;
    }
    return array
  }

  function pullAllWith(array, values, comparator){
    
    for(var i = 0; i < array.length; ){
      let flags = false
      values.map(it => {
        if(comparator(array[i], it)){
          array.splice(i, 1)
          flags = true
        }
      })
      if(!flags)
        i++;
    }
    return array
  }

  function reverse(array){
    if(!array) return []
    let prvNum = 0 , lastNum = array.length - 1

    while(prvNum < lastNum){
      var t = array[prvNum]
      array[prvNum] = array[lastNum]
      array[lastNum] = t
      prvNum++, lastNum--
    }
    return array
  }

  function sortedIndex(array, value){
    //去重
    for(let i = 0; i < array.length; i++){
      if(array[i + 1] == value && array[i] == array[i + 1]){
        array.splice(i + 1, 1)
        i--
      }
    }
    let firstNum = 0, lastNum = array.length - 1
    if(array[0] >= value) return 0
    while(true) { 
      let mid = firstNum + (lastNum - firstNum >> 1)
      if(array[mid] == value) return mid
      if(array[firstNum + 1] >= value) return firstNum + 1
      if(array[mid] > value){
        lastNum = mid
      }else{
        firstNum = mid
      }
    }
  }

  function sortedIndexBy(array, value, mapper){
    let ary = [], val
    if(typeof mapper == 'function'){
      val = mapper(value)
      for(let i = 0; i < array.length; i++){
        ary.push( mapper(array[i]) )
      }
    }
    if(typeof mapper == 'string'){
      val = value[mapper]
      for(let key of array){
       if(mapper in key){
         ary.push(key[mapper])
       }
      }
    }
    return sortedIndex(ary, val)
  }

  function sortedIndexOf(array, value){
    return sortedIndex(array, value)
  }

  function sortedLastIndex(array, value){
    if(value > array[array.length - 1]) return array.length
    let firstNum = 0, lastNum = array.length - 1
    while(firstNum < lastNum) { 
      let mid = firstNum + (lastNum - firstNum >> 1)
      if(array[mid] > value){
        lastNum = mid 
      }else{
        firstNum = mid + 1
      }
    }
    
    return firstNum
    
  }

  function sortedLastIndexBy(array, value, mapper){
    let ary = [], val
    if(typeof mapper == 'function'){
      val = mapper(value)
      for(let i = 0; i < array.length; i++){
        ary.push( mapper(array[i]) )
      }
    }
    if(typeof mapper == 'string'){
      val = value[mapper]
      for(let key of array){
       if(mapper in key){
         ary.push(key[mapper])
       }
      }
    }
    return sortedLastIndex(ary, val)
  }

  function sortedLastIndexOf(array, value){
    if(!array.includes(value)) return -1
    if(value == array[0]) return 0
    if(value > array[array.length - 1]) return array.length
    let firstNum = 0, lastNum = array.length - 1
    while(firstNum < lastNum) { 
      let mid = firstNum + (lastNum - firstNum >> 1) + 1
      if(array[mid] <= value){
        firstNum = mid
      }else{
        lastNum = mid - 1
      }
    }
    return firstNum
  }

  function sortedUniq(array){
    let res = []
    for(let i = 0; i < array.length; i++){
      if(res[res.length - 1] !== array[i]){
        res.push(array[i])
      }
    }
    return res
  }
  
  function sortedUniqBy(array, mapper){
    let res = [], ary = []
    mapper = iteratee(mapper)
    for(let i = 0; i < array.length; i++){
      if(ary[res.length - 1] !== mapper(array[i])){
        res.push(array[i])
        ary.push(mapper(array[i]))
      }
    }
    return res
  }


  function tail(array){
    var length = array === 0 ? 0 : array.length
    if(!length){
      return []
    }
    var [, ...result ] = array    //字面量数组构造或字符串
    return result
  }

  function take(array, num = 1){
    var length = array === 0 ? 0 : array.length
    var number = num > array.length ?  array.length : num
    var result = []
    if(!length){
      return []
    }
    for(var i = 0; i  < number; i++){
      result.push(array.shift())
    }
    return result
  }


  function differenceBy(arys, ...values){
    //把拆散的参数变为数组
    let str = values.pop()
    let target = []
    let res = [], result = []
    for(var i = 0; i < values.length; i++){
      target = target.concat(values[i])
    }
    console.log(target)
    if(typeof str == 'string'){
      res = target.map(it => it[str])
      for(var key of arys){
        if(res.includes(key[str])){
          result.push(key)
        }
      }
    }

    if(typeof str == 'function'){
      for(var i = 0; i < target.length; i++){
        res.push(parseInt(target[i]))
      }
      
      for(var key of arys){
        if(res.includes(str(parseInt(key)))){
          result.push(key)
        }
      }
    }

    return result
  }
  
  
  function differenceWith(array, values, comparator){
    let target, res = [], flags
    values.forEach(it => {
      target = it
    })
    for(var i = 0; i < array.length; i++){
      for(var key in array[i]){
        flags =  false
        if(!comparator(array[i][key], target[key])){
          flags = true
        }
      }
      if(flags) res.push(array[i])
    }
    return res
  } 

  function findIndex(array, predicate, fromIndex = 0){
    predicate = iteratee(predicate)
    for(; fromIndex < array.length; fromIndex++){
      if(predicate(array[fromIndex])){
        return fromIndex
      }
    }
  }

  function findLastIndex(array, predicate, fromIndex = array.length - 1){
    predicate = iteratee(predicate)
    for(; fromIndex >= 0; fromIndex--){
      if(predicate(array[fromIndex])){
        return fromIndex
      }
    }
  }


  //能拆解'a[0].b.c'这种各式字符串， 并返回包含属性路径的数组
  function toPath(value){
    let res = []
    if(Array.from(value)){
      return value
    }else{
      res = value.split('/\]\[|\]\.|\.|\[|\]/')
      if (res[0] === '') {
        res.shift()
      }
      if (res[res.length - 1] === '') {
          res.pop()
      }
      return res
    }
  }



  function porperty(prop){
    // return bind(get,null, _, prop) //当一个函数调用另一个函数，传入的参数不变的情况下，永远可以被优化为bind写法
    return function(obj){
    //得到深层路径下的（属性）值
      return get(obj, prop)
    }
  }

  function toPath(value){
    if(Array.isArray(value)){
      return value
    }else{
      return value.split(/\]\[|\]\.|\.|\[|\]/)
    }
  }

  //得到深层路径下的（属性）值
  //path是一个对象的key值
  //{ 'a': [{ 'b': { 'c': 3 } }] } 按着路径深层寻找最后的值
  function get(obj, path, defaultVal = undefined){
    //字符串转数组
    if(typeof path == 'string'){
      //如果字符串是a[0].b.c这种各式，  将它拆分比化为数组
      path = toPath(path)
    }
    //循环除所有的path（key值）
    for(var i = 0; i < path.length; i++){
      if(obj == undefined){
        obj = defaultVal
      }else{
        //使用obj寻找path的属性的值
        obj = obj[path[i]]
      }
    }
    return obj
  }

  //判断参数的类型
  function iteratee(predicate){
    if(typeof predicate == 'string'){
      return porperty(predicate)
    }
    if(typeof predicate == 'function'){
      return predicate
    }
    //Array要放前面，  数组的typeof也是object
    if(Array.isArray(predicate)){
      return matchesProperty(...predicate)
    }
    if(typeof predicate == 'object'){
      return matches(predicate)
    }
  }

  //参数接数组
  function matchesProperty(key, val){
    return function(obj){
      return isEqual(get(obj, key), val)
    }
  }

  //执行深比较来确定两者的值是否相等。支持数组、对象、字符串、boolean
  function isEqual(value, other){
    //递归判断结果，或者是字符串
    if(value == other){
      return true
    }
    if(typeof value == 'object' && typeof other == 'object'){ 
      //要判断不可枚举的属性
      let a = Object.keys(value)
      let b = Object.keys(other)
      if(a.length != b.length)
        return false
      for(let key in other){
        //搜寻的键值不在value，结束
        if(!(key in value)){
          return false
        }
        //如果other是对象就继续下一层的递归
        if(!isEqual(value[key], other[key])){
          return false
        }
      }
      return true
    }else{
      return false
    }
  }


//与isMatch合体, 判断参数是对象类型
  function matches(prop){
    return function(obj){
      return isMatch(obj, prop)
    }
  }

  // 执行一个深度比较，来确定 obj 是否含有和 src 完全相等的属性值。
  function isMatch(obj, src){
    //字符串, 递归结束条件
    if(obj == src){
      return true
    }
    //有一方不是对象， 结束。  递归结束条件
    if(typeof obj !== 'object' || typeof src !== 'object'){
      return false
    }
    for(let key in src){
      //如果参数src存在并且不是对象
      if(src[key] && typeof src[key] !== 'object'){
        //不相等直接返回false
        if(src[key] !== obj[key]){
          return false
        }
      }else{
        //isMathch在递归过程中， 接受的结果为false（他们不相等或者其中一者不是对象）
        if(!isMatch(obj[key], src[key])){
          return false
        }
      }
      return true
    }
  }

  

  return {
    parseJson: parseJson,
    chunk: chunk,
    compact: compact,
    unique: unique,
    uniqueBy: uniqueBy,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    groupBy: groupBy,
    forEach: forEach,
    map:map,
    zip: zip,
    unzip:unzip,
    every: every,
    some: some,
    difference: difference,
    drop: drop,
    dropRight: dropRight,
    fill: fill,
    flatten: flatten,
    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    reverse: reverse,
    sortedIndex: sortedIndex,
    tail: tail,
    take: take,
    differenceBy: differenceBy,
    isEqual: isEqual,
    differenceWith: differenceWith,
    toPath: toPath,
    porperty: porperty,
    get: get,
    iteratee: iteratee,
    matches: matches,
    isMatch: isMatch,
    dropRightWhile: dropRightWhile,
    dropWhile: dropWhile,
    findLastIndex: findLastIndex,
    findIndex: findIndex,
    matchesProperty: matchesProperty,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,
    pullAllBy: pullAllBy,
    pullAllWith: pullAllWith,
    sortedIndexBy: sortedIndexBy,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedLastIndexOf: sortedLastIndexOf,
    uniq: uniq,
    uniqBy: uniqBy,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,

  }

}()


