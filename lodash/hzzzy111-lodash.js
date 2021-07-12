var hzzzy111 = function(){
  function chunk(array, number) {
    var ary = []
    if(number != 0){
        ary.push([])
      }
    for(var i = 0; i < array.length; i++){
      if(i + 1 <= number){
        ary[0].push(array[i])
      }else{
        ary.push(array[i])
      }        
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

  //对象不成功
  function groupBy(array, iteratee){
    var map = {}
    for(var i = 0; i < array.length; i++){
      var key = iteratee(array[i])
      if( !(key in map) ){
        map[key] = []
      }
      map[key].push(array[i])
    }
    return map
  }

  //
  function forEach(array, iteratee){
    var ary = []
    for(var i = 0; i < array.length; i++){
      if(iteratee(value, index, collection)){
        ary.push(value)
      }
    }
    return ary
  }

  //
  function map(array, iteratee){
    var ary = []
    for(var i = 0; i < array.length; i++){

    }
  }

  function zip(array){
    var ary = []
    for(var i = 0; i < array.length; i++){
      
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

  }

}()


