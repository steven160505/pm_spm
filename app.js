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
const session=require('koa-session')

const config = require('./config/config')

const koaNunjucks = require('koa-nunjucks-2')

app.keys = ['pet gooming spm'];//加密匙

app.use(session({
  key: 'pet gooming:sess',
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));

app.use(bodyParser())
// 配置静态资源加载中间件
app.use(convert(koaStatic(
    path.join(__dirname , 'public')
)))


// 设置nunjuncks
app.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  configureEnvironment: (env) => {
    env.addFilter('shorten', (str, count) => {
      return str.slice(0, count || 5);
    });
  }
}));


// 链接数据库
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

router(app)

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
})