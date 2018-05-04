'use strict';

const port = 8080;

// const Koa = require('koa');
// const router = require('./router/router');
// const app = new Koa();

// // middle
// const middleware = require("./middleware");
// //中间件
// middleware(app);
// //路径
// router(app)

// app.listen(port, () => {
//   console.log(`server is running at http://localhost:${port}`);
// })
const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const koaStatic = require('koa-static')
const app = new Koa()
const fs = require('fs')
const router = require('./router/router');

app.use(bodyParser())
// 配置静态资源加载中间件
app.use(convert(koaStatic(
    path.join(__dirname , 'public')
)))

router(app)

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
})