const router = require('koa-router')();
const fs = require('fs')
const userInfoController = require('../controller/api/user.js')
const appointmentController = require('../controller/api/appointment.js')

module.exports = (app) => {


// html pages
router.get('/', async(ctx, next) => {
  if ( ctx.session && ctx.session.isLogin && ctx.session.userName ) {
    let htmlFile = fs.readFileSync('public/html/index.html')
    ctx.response.type = 'html'
    ctx.response.body = htmlFile
  }else{
    ctx.redirect('/login')
  }
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
  console.log('session id: ',ctx.session.userId)
  if ( ctx.session && ctx.session.isLogin && ctx.session.userName ) {
    let htmlFile = fs.readFileSync('public/html/dog.html')
    ctx.response.type = 'html'
    ctx.response.body = htmlFile
  }else{
    ctx.redirect('/login')
  }
})

// services module
router.get('/services', async(ctx, next) =>{

  if ( ctx.session && ctx.session.isLogin && ctx.session.userName ) {
    let htmlFile = fs.readFileSync('public/html/appointment.html')
    ctx.response.type = 'html'
    ctx.response.body = htmlFile
  }else{
    ctx.redirect('/login')
  }
})

router.post('/services', appointmentController.create)

// user profile
router.get('/user/profile', userInfoController.showProile)
router.post('/user/profile', userInfoController.editUserInfo)
router.post('/user/register', userInfoController.signUp)
router.post('/user/signin', userInfoController.signIn)
router.get('/user/logout', userInfoController.logOut)


// user appointment
// router.get('/appointment/list', appointmentController.listByUser)
// router demo
// http://localhost:8080/user/appointment/detail?id=5afe7655cc3a4f6e0def45a1
// router.get('/appointment/detail', appointmentController.getDetailById)


// admin module
router.get('/appointment/list',  userInfoController.checkAdmin, appointmentController.listAll)
router.get('/appointment/edit',  userInfoController.checkAdmin, appointmentController.editById)
router.get('/appointment/delete',userInfoController.checkAdmin, appointmentController.deleteById)


app.use(router.routes())
   .use(router.allowedMethods())
}