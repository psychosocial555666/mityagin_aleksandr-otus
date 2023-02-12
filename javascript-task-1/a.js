function add () {
  const numbers  = Array.from(arguments)
  if(numbers.length <= 1) {
    return function (nextNumber) {
        return numbers[0] + nextNumber;
    }
  } else {
    return numbers.reduce((acc, cur) => acc + cur)
  }
};

console.log(add(2, 5));
console.log(add(2)(5));