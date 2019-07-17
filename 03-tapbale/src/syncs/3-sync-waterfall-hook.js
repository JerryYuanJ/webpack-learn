const { SyncWaterfallHook } = require('tapable')

/**
 * The return value of the previous listener function can be passed to the next listener function.
 */
const queue = new SyncWaterfallHook(['name'])

queue.tap('hello', (name) => {
  console.info('hello=>' + name)
  return 'Yuanjie'
})

queue.tap('welcome', name => {
  console.info('welcome=>' + name)
})

queue.call('Taojie')

console.info('==========================')

// ==============  //

class MySyncWaterfallHook{
  constructor() {
    this.callbacks = []
  }
  tap(name, cb) {
    this.callbacks.push(cb)
  }
  call(){
    let result = null
    for(let i = 0, len = this.callbacks.length; i < len; i++) {
      const hook = this.callbacks[i]
      if (result) {
        result = hook(result)
      } else {
        result = hook(...arguments)
      }
    }
  }
}

const myQueue = new MySyncWaterfallHook()

myQueue.tap('Let\'s go', name => {
  console.info('Let\s go => ' + name)
  return 'TTTTT'
})

myQueue.tap('Come on', name => {
  console.info('Come on => ' + name)
})

myQueue.call('Yuanjie')