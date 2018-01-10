// import Koa from 'koa';
// import views from 'koa-views';
// import path from 'path';
// // import http from 'http';
// import socket from 'socket.io';
// import serve from 'koa-static';

// import router from './router';
// import serverRender from './middleware/serverRender';

// // import { kafkaProducer, kafkaConsumer } from './kafka';

// const app = new Koa();

// // const server = http.createServer(app.callback());
// const io = socket(server);
// io.on('connection', (sk) => {
//   // console.log('new connection');

//   sk.on('post', (data) => {
//     // console.log(data);
//     io.emit('message', data);
//   });

//   sk.on('disconnect', () => {
//     // console.log('some one disconnect');
//   });
// });


// // kafkaConsumer('kafka-node-group1');
// // kafkaConsumer('kafka-node-group2');
// // kafkaConsumer('kafka-node-group3');

// // setTimeout(() => {
// //   kafkaProducer(app)
// // }, 5000);


// app.use(views(path.resolve(__dirname, '../dist'), {
//   map: {
//     html: 'ejs'
//   }
// }))
//   .use(serverRender())
//   .use(router.routes())
//   .use(router.allowedMethods())
//   .use(serve(path.resolve(__dirname, '../dist')));


// export default { app, server };
