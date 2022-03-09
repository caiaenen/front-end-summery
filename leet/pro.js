//
specificNumber = function(nums) {
    if(nums.length<3) {
        return false
    }
    let corrtnums = []
    corrtnums.push(nums[0])
    for(let i=1;i<nums.length;i++) {
        if(corrtnums.length==3) {
            return true
        }
        if(corrtnums.length==1) {
            if(nums[i]>corrtnums[0]) {
                corrtnums.push(nums[i])
            }else {
                corrtnums[0] = nums[i]
            }
        }
        if(corrtnums.length==2&&nums[i]<corrtnums[1]&&nums[i]>corrtnums[0]) {
            corrtnums.push(nums[i])
        }
    }
    if(corrtnums.length==3) {
        return true
    }else {
        return false
    }
}

/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
 var compareVersion = function(version1, version2) {
    let verArr1 = version1.split('.')
    let verArr2 = version2.split('.')
    let len = Math.min(verArr1.length,verArr2.length)
    for(let i=0;i<len;i++) {
        console.log(verArr1[i],verArr2[i],verArr1.length,verArr2.length)
        if(verArr1[i]>verArr2[i]) {
            return 1
        }
        if(verArr1[i]<verArr2[i]) {
            return -1
        }
    }
    if(verArr2.length>verArr1.length) {
        return 1
    }
    if(verArr2.length<verArr1.length) {
        return -1
    }
    if(verArr2.length==verArr1.length) {
        return 0
    }
};

/** 5
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
    if(s.length<=1) {
        return s
    }
    const sArr = s.split('')
    let len = sArr.length-1
    let longS = [] 
    for(let i=0;i<len;i++) {
        let tempS = []
        let startI = i
        while(startI<=len) {
            tempS.push(sArr[startI])
            startI++
            if(tempS.length>longS.length) {
                if(isPalindrome(tempS)) {
                    longS = JSON.parse(JSON.stringify(tempS))
                }
            }
        }
    }
    return longS.join('')
};

var isPalindrome = function(sArr) {
    let left = 0
    let right = sArr.length-1
    while(left<=right) {
        if(sArr[left]!=sArr[right]) {
            return false
        }
        left++
        right--
    }
    return true
}

/** 3
 * @param {string} s
 * @return {string}
 */
 var lengthOfLongestSubstring = function(s) {
    if(s.length<=1) {
        return s.length
    }
    const sArr = s.split('')
    let len = sArr.length-1
    let longS = [] 
    for(let i=0;i<len;i++) {
        let tempS = []
        let startI = i
        while(startI<=len) {
            if(tempS.indexOf(sArr[startI])>=0) {
                if(tempS.length>longS.length) {
                    longS = JSON.parse(JSON.stringify(tempS))
                }
                break
            }
            tempS.push(sArr[startI])
            startI++
        }
        if(startI==len) {
            if(tempS.length>longS.length) {
                longS = JSON.parse(JSON.stringify(tempS))
            }
        }
        if(longS.length>=len-i) {
            break
        }
    }
    return longS.length
};

/** 11
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
    let len = height.length - 1
    let left = 0
    let right = len
    let maxAre = 0
    while(left<right) {
        var currentArea = Math.min(height[left],height[right])*(right-left)
        maxAre = Math.max(currentArea,maxAre)
        if(height[left]<height[right]) {
            left++
        }else{
            right--
        }
    }
    return maxAre
};

/** 47
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permuteUnique = function(nums) {
    let sortedNum = nums.sort((a,b)=>a-b) 
    let len = sortedNum.length
    let outArr = []
    let uniqueArr = []
    let getUniqueArr = function() {
        for(let i=0;i<len;i++) {
            if(uniqueArr.length==len){
                outArr.push([...uniqueArr])
                return
            }
            
        }
    }
};
/** 38
 * @param {number} n
 * @return {string}
 */
var count = function(str) {
    let strArr = str.split('')
    let outputArr = []
    let num = 1
    for(let i=0;i<=strArr.length;i++) {
        if(strArr[i-1]&&strArr[i]&&strArr[i]==strArr[i-1]) {
            num ++
        }else if(strArr[i-1]){
            outputArr.push(num)
            outputArr.push(strArr[i-1])
            num = 1
        }
    }
    return outputArr.join('')
}
var countAndSay = function(n) {
    if(!parseInt(n)) {
        return n
    }
    let outPut = '1'
    for(let i=1;i<n;i++) {
        outPut = count(outPut)
    }
    return outPut
};
/** 1942
 * @param {number[][]} times
 * @param {number} targetFriend
 * @return {number}
 */
 var smallestChair = function(times, targetFriend) {
    
};

const source = {
    a: 1,
    b: {
      c: true,
      d: {
        e: 'foo'
      }
    },
    f: false,
    g: ['red', 'green', 'blue'],
    h: [{
      i: 2,
      j: 3
    }]
  }

let unFlatten = function(obj) {
    let prefix = ''
    Object.entries(obj).reduce((r,[key,values])=> {
        console.log(values)
        if(Object.prototype.toString.call(obj)=='[object Array]' ) {
            prefix += `[${key}]`
        }else if(Object.prototype.toString.call(obj)=='[object Object]' ) {
            prefix += `.${key}`
        }
    })
}

function test(params) {
    let arr = params.split('.')
    let prefix = ''
    while(Math.abs(arr[0])>1000) {
        prefix = prefix + arr[0]/1000 + ','
        arr[0] = arr[0]%1000
    }
    if(arr[1]) {
        return prefix+arr[0]+'.'+arr[1]
    }else {
        return prefix+arr[0]

    }
}

/** 15
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
    if(nums.length<3) {
        return nums
    }
    let numsArr = nums.sort((a,b)=>a-b)
    let left = 0
    let right = nums.length-1
    let res = []
    let midd = ''
    if(numsArr[left]>=0) {
        return []
    }if(numsArr[right]<=0) {
        return []
    }else {
        while(left<(nums.length-1)) {
            midd = left + 1
            while(midd<right) {
                console.log(numsArr[left],numsArr[midd],numsArr[right])
                if(numsArr[left]+numsArr[midd]+numsArr[right]<0) {
                    midd++
                }if(numsArr[left]+numsArr[midd]+numsArr[right]>0) {
                    right--
                }if(numsArr[left]+numsArr[midd]+numsArr[right]==0) {
                    res.concat([numsArr[left],numsArr[midd],numsArr[right]])
                    break
                }
            }
            left++
        }
    }
    return res
};
