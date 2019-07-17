const { SyncHook } = require("tapable");

/*
Don't care about the return value of the listener function
*/

let queue = new SyncHook(['message']);

queue.tap('jerry', (message) => {
  console.info(message, 'jerry')
})

queue.tap('taojie', (message) => {
  console.info(message, 'taojie')
})

queue.call('Hey')

console.info('==================')

// mock

class MySyncHook{
  constructor() {
    this.callbacks = []
  }
  tap(name, callback) {
    this.callbacks.push(callback)
  }

  call() {
    // 箭头函数不绑定 argument， 所以这里的 arguments 是 call函数接收的参数
    // 透传给了回调函数作为执行参数
    this.callbacks.forEach(cb => cb(...arguments))
  }
}

const myQueue = new MySyncHook(['msg'])

myQueue.tap('kobe', (msg) => {
  console.info(msg, 'kobe')
})

myQueue.tap('casol', (msg) => {
  console.info(msg, 'casol')
})

myQueue.call('hello')