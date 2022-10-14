const fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
}

const fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions = [], reduce, initialValue) {

  return new Promise(resolve => {
    let memoValue = initialValue;
    let index = 0;
    function executeFunction() {
      asyncFunctions[index]()
        .then(data => {
          memoValue = reduce(memoValue, data)
          index += 1;
          return Promise.resolve()
        })
        .then(() => {
          if (index < asyncFunctions.length) {
            executeFunction();
          } else {
            return resolve(memoValue)
          }
        })
        .catch(e => console.log(e.message))
    }
    executeFunction()
  })
}

promiseReduce(
  [fn1, fn2, fn3],
  function (memo, value) {
    console.log('reduce')
    return memo * value
  },
  1
)
  .then(console.log)


  // Доработка