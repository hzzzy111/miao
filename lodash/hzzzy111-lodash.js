var hzzzy111 = function(){
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

  function unique(array){
    var ary = []
    for(var i = 0; i < array.length; i++){
      for(var j = 1 + i; j < array.length; j++){
        if(array[i] != array[j]){
          ary.push(array[i])
        }
      }
    }
    return ary
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
  function map(array, iteratee){
    var ary = []
    if(typeof iteratee !== "function"){
      for(var i = 0; i < array.length; i++){
        ary.push(array[i][iteratee])
      }
      return ary
    }
    if(Array.isArray(array[i])){
      for(var i = 0; i < array.length; i++){
        ary.push(iteratee(array[i], i, array))
      }
    }
    if(typeof array === "object"){
      for(var i in array){
        ary.push(iteratee(array[i], i, array))
      }
    }
    return ary
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

  function join(array, separator = ","){
    if(!array) return ""
    var str = ""
    for(var i = 0; i < array.length; i++){
      str += array[i] + separator
    }
    return str
  }

  function last(array){
    if(!arguments.length) return undefined
    return array.pop()
  }

  function lastIndexOf(array, value, fromIdx = array.length - 1){
    if(!array) return undefined
    for(var i = fromIdx; i > 0; i--){
      if(array[i] === value){
        return i
      }
    }
  }

  function nth(array, num = 0){
    if(!array) return undefined
    for(var i = 0; i < array.length; i++){
      if(i === num){
        return array[i]
      }
    }
  }

  return {
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

  }

}()


