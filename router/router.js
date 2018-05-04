const router = require('koa-router')();
const fs = require('fs')
// const HomeController = require('../controller/home');
module.exports = (app) => {

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

// router.post('/user/register', HomeController.register)

app.use(router.routes())
   .use(router.allowedMethods())
}