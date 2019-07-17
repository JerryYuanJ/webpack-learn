const { AsyncParallelBailHook } =  require('tapable')

/**
 * As long as the return value of the listener function is not undefined, 
 * will ignore the subsequent listener function execution, jump directly to callAsync
 * The callback function that triggers the function binding, and then executes the bound callback function.
 */

const q1 = new AsyncParallelBailHook(['name'])

console.time('q1')
q1.tap('sing', name => {
  console.info(name, '==> sing')
  return 'Music!'
})

q1.tap('dance', name => {
  console.info(name, '==> dance')
})

q1.callAsync('Ikun', () => {
  console.info('practice done!')
  console.timeEnd('q1')
})


console.info('======= Round 2 ========')

const q2 = new AsyncParallelBailHook(['name'])

console.time('q2')
q2.tapAsync('sing', (name, cb) => {
  setTimeout(() => {
    console.info(name, '==> sing agian')
    cb()
  }, 1000);
})

q2.tapAsync('dance', (name, cb) => {
  setTimeout(() => {
    console.info(name, '==> dance again')
    cb(11)
  }, 2000);
})

q2.callAsync('Ikun', (a) => {
  // 注意思考这里的 a 参数
  console.info(a)
  console.info('practice again done')
  console.timeEnd('q2')
  // ====
  console.info('====== Round 3 =======')
  tapPromise()
})

/**
 * 这两个需要思考，断开链式的时机
 */

function tapPromise() {
  const q3 = new AsyncParallelBailHook(['name'])
  console.time('q3')
  q3.tapPromise('sing', name => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.info(name, '==> sing!!')
        resolve()
      }, 1000);
    })
  })
  q3.tapPromise('dance', name => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.info(name, '==> dance!!')
        reject('Girly')
      }, 2000);
    })
  })
  q3.tapPromise('rap', name => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.info(name, '==> rap!!')
        resolve()
      }, 3000);
    })
  })
  q3.promise('CXK').then(() => {
    console.info('done successfully')
    console.timeEnd('q3')
  }).catch((e) => {
    console.info(e) // will print the rejected reason
    console.info('fail!! Shame')
    console.timeEnd('q3')
  })
}