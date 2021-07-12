var hzzzy111 = {
  
  chunk:function(array, number){
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


}


