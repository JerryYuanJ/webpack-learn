import { a } from './a';
import b from './b';

b()

document.writeln(`
    <h1>hello webpack, This is from ${a}</h1>
`)


//  ===  异步加载  === //

// import('./c').then(res => {
//     console.info(res.team)
// })