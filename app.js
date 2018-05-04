'use strict';

const port = 8080;
const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const koaStatic = require('koa-static')
const app = new Koa()
const fs = require('fs')
const router = require('./router/router')
const mongoose = require('mongoose')
const config = require('./config/config');
app.use(bodyParser())
// 配置静态资源加载中间件
app.use(convert(koaStatic(
    path.join(__dirname , 'public')
)))

// 链接数据库
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

router(app)

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
})