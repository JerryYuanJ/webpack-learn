const { AsyncSeriesWaterfallHook } = require('tapable')

const q1 = new AsyncSeriesWaterfallHook(['name'])

q1.tap('p1', name => {
  console.info('p1 ==>', name)
  return 'Jerry'
})

q1.tap('p2', name => {
  console.info('p2 ==>', name)
})

q1.callAsync('webpack', data => {
  console.info('over')
  console.info(data) // null
})

console.info('==============')

const q2 = new AsyncSeriesWaterfallHook(['name'])
q2.tapAsync('s1', (name, cb) => {
  setTimeout(() => {
    console.info('s1 =>', name)
    cb(null, 'hello')
  }, 1000);
})

q2.tapAsync('s2', (name, cb) => {
  console.info('s2 =>', name)
  cb(null, '1212')
})

q2.callAsync('react', data => {
  console.info(data)
})

// Promise 类似，但是它的最终回调中会获取到 data
// 可以参考 AsyncSeriesBailHook 的 Promise

// mock，但是没看
/** 
 * class AsyncSeriesWaterfallHook_MY {
    constructor() {
        this.hooks = [];
    }
 
    tapAsync(name, fn) {
        this.hooks.push(fn);
    }
 
    callAsync() {
        let self = this;
        var args = Array.from(arguments);
 
        let done = args.pop();
        console.log(args);
        let idx = 0;
        let result = null;
 
        function next(err, data) {
            if (idx >= self.hooks.length) return done();
            if (err) {
                return done(err);
            }
            let fn = self.hooks[idx++];
            if (idx == 1) {
 
                fn(...args, next);
            } else {
                fn(data, next);
            }
        }
        next();
    }
}
 */