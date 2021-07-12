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
  }

}()


