const { AsyncParallelHook } = require('tapable')

/**
 * Don't care about the return value of the listener function.
*/

const q1 = new AsyncParallelHook(['name'])

console.time('cost')
q1.tap('1', name => {
  console.info('1 ==>', name)
})

q1.tap('2', name => {
  console.info('2 ==>', name)
})

q1.callAsync('webpack', () => {
  console.timeEnd('cost')
})

console.info('===============')
/**
 * 每个 cb() 都被执行后，最后 callAsync 中的回调才会执行
 * 上一个 cb 的执行与否不影响下一个
 * 可以尝试注释几个 cb() 看看执行结果
 */

const q2 = new AsyncParallelHook(['name'])
console.time('cost2')

q2.tapAsync('1', (name, cb) => {
  setTimeout(() => {
    console.info('1 ==> ', name)
    cb()
  }, 1000);
})

q2.tapAsync('2', (name, cb) => {
  setTimeout(() => {
    console.info('2 ==> ', name)
    cb()
  }, 2000);
})

q2.tapAsync('3', (name, cb) => {
  setTimeout(() => {
    console.info('3 ==> ', name)
    cb()
  }, 3000);
})

q2.callAsync('vue', () => {
  console.info('over')
  console.timeEnd('cost2')
  // 将第三个demo放到这个回调里面来，不然打印会因为异步的问题错乱
  console.info('===============')
  tapPromise()
})

function tapPromise() {
  /**
   * 每个 promise 都被 resolve 后，最后的 promise(xx) 中的 callback 才会执行
   * 上一个 promise 的状态 不影响下一个 promise 的执行
   */  


  const q3 = new AsyncParallelHook(['name'])
  console.time('cost3')

  q3.tapPromise('1', name => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.info('1 ==> ', name)
        resolve()
      }, 1000);
    })
  })

  q3.tapPromise('2', name => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.info('2 ==> ', name)
        resolve()
      }, 3000);
    })
  })

  q3.promise('react').then(() => {
    console.info('over')
    console.timeEnd('cost3')
  })
}