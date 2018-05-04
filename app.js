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
const router = require('koa-router')()
const path = require('path')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const koaStatic = require('koa-static')
const app = new Koa()
const fs = require('fs')

app.use(bodyParser())
// 配置静态资源加载中间件
app.use(convert(koaStatic(
    path.join(__dirname , 'public')
)))



router.get('/', async(ctx, next) => {

  let htmlFile = fs.readFileSync('public/html/dog_grooming.html')
  ctx.response.type = 'html'
  ctx.response.body = htmlFile
})


router.get('/login', async(ctx, next) => {

  let htmlFile = fs.readFileSync('public/html/login.html')
  ctx.response.type = 'html'
  ctx.response.body = htmlFile
})

router.get('/register', async(ctx, next) =>{
  let htmlFile = fs.readFileSync('public/html/register.html')
  ctx.response.type = 'html'
  ctx.response.body = htmlFile
})


router.get('/dog', async(ctx, next) =>{
  let htmlFile = fs.readFileSync('public/html/dog.html')
  ctx.response.type = 'html'
  ctx.response.body = htmlFile
})

router.get('/services', async(ctx, next) =>{
  let htmlFile = fs.readFileSync('public/html/services.html')
  ctx.response.type = 'html'
  ctx.response.body = htmlFile
})



app.use(router.routes())

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
})