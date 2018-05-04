'use strict';

const port = 8080;

const Koa = require('koa');
const router = require('./router/router');
const app = new Koa();

// middle
const middleware = require("./middleware");
//中间件
middleware(app);
//路径
router(app)

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
})
