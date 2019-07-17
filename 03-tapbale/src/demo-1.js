const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");

class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newSpeed']),
      brake: new SyncHook(),
      calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
    }
  }
}

const myCar = new Car();

myCar.hooks.brake.tap('WarningLampPlugin', () => {
  console.info('Stop the car!! There\'s the lamp')
});

myCar.hooks.brake.tap('WarningChildPlugin', () => {
  console.info('Stop the car!! You will hit the child')
});

myCar.hooks.accelerate.tap('SpeedUpPlugin', (newSpeed) => {
  console.info(`Come on, speed up to ${newSpeed}`)
})

// ==== async

myCar.hooks.calculateRoutes.tapAsync('BingsMapPlugin', (source, target, routeList, callback) => {
  const routes = ['Go left', 'Turn right after 300m', 'Walking 2km', 'Arrive']
  setTimeout(() => {
    console.info(`from ${source} to ${target}, the route list is ${routes}`);
    // call the callback
    callback()
  }, 2000)
})

myCar.hooks.calculateRoutes.tapPromise("GoogleMapsPlugin", (source, target) => {
  // return a promise
  console.info(`google guide you from ${source} to ${target}`);
	return Promise.resolve('Google good!')
});



myCar.hooks.brake.call()

myCar.hooks.accelerate.call(120)

// 会调用注册的所有 AsyncParallelHook 钩子
// 在 callAsync 中, callback 由最后一个传入
// 在 promise 中，callback 就是 then()..

// myCar.hooks.calculateRoutes.callAsync('Beijing', 'Nanjing', [], ()=>{})

myCar.hooks.calculateRoutes.promise('Anhui', 'Shanghai').then(data => {
  console.info('result :' + data)
})