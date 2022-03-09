//quick
var quickSort = function(arr) {
    var left = 0
    
}
var partion = function(startIdx,endIdx,arr) {
    while(startIdx<endIdx) {
        
    }
    
}
//insert
var insert = function(arr) {
    var right = arr.length-1
    for(let i=0;i<right;i++) {
        var left = i+1
        while(left<right) {
            if(arr[left]<arr[i]) {
                swap(arr[left],arr[i])
                left++
            }
        }
    }
}
var swap = function(left,right) {
    var temp = left
    left = right
    right = temp
}