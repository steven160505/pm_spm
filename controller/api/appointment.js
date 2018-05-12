// appointment

const Appointment = require('../models/apponintment')

module.exports = {
  async create(ctx){

    if (ctx.session && ctx.session.isLogin && ctx.session.userName){
      let userId = ctx.session.userId
      console.log('data: ',ctx.request.body)
      console.log('Appointment function lists:')
      console.dir(Appointment);
    }else{
        ctx.redirect('/')
        console.log('note: ',)
        ctx.redirect('/user/signin')
    }
  }
}


