const { SyncLoopHook } = require('tapable')

/**
 * When the listener function is triggered, if the listener returns true
 * This listener function will be executed repeatedly if it returns undefined Then exit the loop
 */
const queue = new SyncLoopHook(['name'])

let i = 0
queue.tap('yuanjie', msg => {
  i = i + 1
  console.info('yuanjie => ' + msg)
  return i < 3 ? true : undefined
})

queue.tap('taojie', msg => {
  console.info('taojie =>' + msg)
})

queue.call('Good')

console.info('=========================')
// =========================


class MySyncLoopHook {
  constructor() {
    this.callbacks = []
  }
  tap(name, cb) {
    this.callbacks.push(cb)
  }
  call() {
    for (let index = 0, len = this.callbacks.length; index < len; index++) {
      const hook = this.callbacks[index];
      let result
      do {
        result = hook(...arguments)
      } while(result !== undefined)
    }
  }
}

const myQueue = new MySyncLoopHook(['msg'])

let j = 0
myQueue.tap('PPP', msg => {
  j++
  console.info('PPP => ' + msg)
  return j < 5 ? true : undefined
})

myQueue.tap('QQQ', msg => {
  console.info('QQQ => ' + msg)
})

myQueue.call('hello')