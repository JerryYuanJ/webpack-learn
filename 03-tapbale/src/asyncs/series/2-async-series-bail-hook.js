const { AsyncSeriesBailHook } = require('tapable')

const q1 = new AsyncSeriesBailHook(['name'])

q1.tap('s1', name => {
  console.info('s1 ==> ', name)
})

q1.tap('s2', name => {
  console.info('s2 ==> ', name)
})

q1.callAsync('webpack', e => {
  console.info(e) // 注册事件中有返回非 undefined 的, 这个 e = null ; 返回 undefined ，e = undefined
  console.info('done')
})

console.info('============')
const q2 = new AsyncSeriesBailHook(['name'])

q2.tapAsync('a1', (name, cb) => {
  console.info('a1 =>', name)
  cb('NaN')
})

q2.tapAsync('a2', (name, cb) => {
  console.info('a2 =>', name)
  cb()
})

/**
 * 只有每个注册事件都在最后调用了 cb，链才能往下走
 * 若 cb 中的参数是 falsy 的，那么链能继续往下走
 * 若 cb 中的参数是 truthy 的，链不往下走了，直接到最终的回调，将 cb 中的参数传递给最终的回调
 */
q2.callAsync('react', e => {
  console.info(e)
  console.info('done')
})

console.info('============')
const q3 = new AsyncSeriesBailHook(['name'])

q3.tapPromise('b1', name => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.info('b1', name)
      resolve()
    }, 1000);
  })
})

q3.tapPromise('b2', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.info('b2', name)
      reject({ name: 'Jerry' })
      resolve(null)
      reject()
    }, 1000);
  })
})

q3.tapPromise('b3', name => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.info('b3', name)
      resolve()
    }, 1000);
  })
})

/**
 * resolve:
 *    没有参数的话，沿着链往下执行
 *    有参数，且参数 不是 undefined 的话，不执行之后的函数，直接跳到最后的回调，参数传递给回调
 *    有参数，且参数是 undefined 的话，继续往下执行
 *  
 *  reject: 
 *    直接跳到最后的回调
 */
q3.promise('vue').then(res => {
  console.info('done, res =>' + res)
}).catch(e => {
  console.info('fail, err => ' + e)
})