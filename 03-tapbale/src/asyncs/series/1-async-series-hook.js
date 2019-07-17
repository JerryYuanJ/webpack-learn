const { AsyncSeriesHook } = require('tapable')

const q1 = new AsyncSeriesHook(['name'])

console.time('q1')

q1.tap('1', name => {
  console.info(name, 1)
})

q1.tap('2', name => {
  console.info(name, 2)
  return 'as'
})

// Irrelevant callback() Parameter

q1.callAsync('CXK', (e) => {
  console.info(e) // undefined
  console.info('Music')
  console.timeEnd('q1')
})

console.info('=============')

const q2 = new AsyncSeriesHook(['name'])

console.time('q2')

q2.tapAsync('1', (name, cb) => {
  console.info(name, 1)
  cb()
})

q2.tapAsync('2', (name, cb) => {
  console.info(name, 2)
  cb()
  return 'as'
})

// Irrelevant callback() Parameter

q2.callAsync('CXK', (e) => {
  console.info(e) // undefined
  console.info('Music')
  console.timeEnd('q2')
})

// Promise 用法也类似