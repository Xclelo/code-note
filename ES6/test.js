function reverseInt(number) {
    if (Object.prototype.toString.call(number) !="[object Number]") {
      throw new Error('number must be a int')
    }
  
    if (number === 0) {
      return 0
    }
  
    const flag = number < 0 ? '-' : ''
  
    let num = Math.abs(number)
  
    while (num % 10 === 0) {
      num = num / 10
    }
  
    let result = ''
    while (num >= 10) {
      const temp = num % 10
      result += temp
      num = parseInt(num / 10)
    }
    return flag + result + num
  }

  console.log(reverseInt(1234));
  console.log(Object.prototype.toString.call(1234));
  