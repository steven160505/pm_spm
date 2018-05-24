// appointment

const AppointmentController = require('../models/apponintment').ApponintmentController

module.exports = {
    async create(ctx) {
        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            let appointmentController = new AppointmentController()
            let userId = ctx.session.userId
            let appointment = ctx.request.body
            appointment['userid'] = userId
            appointmentController.create(appointment)
            ctx.redirect('/')
        } else {
            ctx.redirect('/')
        }
    },

    async listAll(ctx) {
        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            // TODO Admin控制
            let appointmentController = new AppointmentController()
            let results = []
            let userId = ctx.session.userId
            let queryParams = {}
            if(ctx.state != 'admin'){
                queryParams['userid'] = userId
            }

            try {
                results = await appointmentController.find(queryParams)
            } catch (error) {
                ctx.status = 500
            } finally {
                console.log('results: ', results.length)
                if(ctx.state != 'admin'){
                    await ctx.render('admin/list', { "items": results,
                                                     "count": results.length,
                                                     "role":"User",
                                                     "avatar":"avatar-1.jpg"
                                                    })
                }else{
                    await ctx.render('admin/list', { "items": results,
                                                      "count": results.length,
                                                      "role":"Administrator",
                                                      "avatar":"avatar-2.jpg"
                                                    })
                }

            }
        }
    },


    async getDetailById(ctx) {
        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            // TODO 分页操作，添加客户验证，或者通过userid和 appointId 联名获取appoint
            let userId = ctx.session.userId

            let recordId = ctx.request.query['id']
            let appointmentController = new AppointmentController()
            let results = []
            let queryParams = {"_id": recordId}
            if(ctx.state != 'admin'){
                queryParams['userid'] = userId
            }
            try {
                results = await appointmentController.find(queryParams)
            } catch (error) {
                // TODO 处理异常 404
                ctx.status = 400
            } finally {
                ctx.body = results
            }
        }
    },
    // edit
    async editById(ctx) {
        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            // TODO 分页操作，添加客户验证，或者通过userid和 appointId 联名获取appoint
            let userId = ctx.session.userId

            let recordId = ctx.request.query['id']
            let appointmentController = new AppointmentController()
            let results = []

            let queryParams = {"_id": recordId}
            if(ctx.state != 'admin'){
                queryParams['userid'] = userId
            }
            console.log('params: ',queryParams)
            try {
                results = await appointmentController.find(queryParams)

                // await ctx.render('admin/detail', results[0])

                console.log('reuslt: ',results)

                if(ctx.state != 'admin'){
                    await ctx.render('admin/detail', { "item": results[0],
                                                       "role":"User",
                                                       "avatar":"avatar-1.jpg"
                                                     })
                }else{
                    await ctx.render('admin/detail',  { "item": results[0],
                                                      "role":"Administrator",
                                                      "avatar":"avatar-2.jpg"
                                                    })
                }

            } catch (error) {
                // TODO 处理异常 404
            }
        }
    },
    // delete
    async deleteById(ctx) {
        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            //TODO 添加管理员验证及用户验证
            let userId = ctx.session.userId

            let recordId = ctx.request.query['id']
            let appointmentController = new AppointmentController()

            let results = []

            let queryParams = {"_id": recordId}
            if(ctx.state != 'admin'){
                queryParams['userid'] = userId
            }

            try {
                results = await appointmentController.delete(queryParams)
            } catch (error) {
                // TODO 处理异常 404
            } finally {
                ctx.redirect('/appointment/list')
            }
        }
    }
}