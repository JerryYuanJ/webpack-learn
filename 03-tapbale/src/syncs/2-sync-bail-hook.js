const { SyncBailHook } = require("tapable");

const queue = new SyncBailHook(['msg'])

/**
 * As long as there is a function in the listener function, the return
 * value is not undefined, skip all remaining logic
 * 
 * 函数只有返回了undefined才能继续往下执行另一个函数
 */

queue.tap('No.1', msg => {
  console.info('No.1', msg)
})

queue.tap('No.2', msg => {
  console.info('No.2', msg)
  return 'hello'
})

queue.tap('No.3', msg => {
  console.info('No.3', msg)
})

queue.call('Go!')


console.info('==================')
// mock

class MySyncBailHook{
  constructor(){
    this.callbacks = []
  }
  tap(name, cb){
    this.callbacks.push(cb)
  }
  call(){
    for (let index = 0, len = this.callbacks.length; index < len; index++) {
      const hook = this.callbacks[index];
      const result = hook(...arguments)
      if (result !== null) {
        break
      }
    }
  }
}

const myQueue = new MySyncBailHook()

myQueue.tap('A', msg => {
  console.info(msg, 'A')
})

myQueue.tap('B', msg => {
  console.info(msg, 'B')
  return 0
})

myQueue.tap('C', msg => {
  console.info(msg, 'C')
})

myQueue.call('Just do it')