const path = require('path')

const miHttpError = require('./mi-http-error')

module.exports = (app) => {

    app.use(miHttpError())

    // 增加错误的监听处理
    app.on("error", (err, ctx) => {
        if (ctx && !ctx.headerSent && ctx.status < 500) {
            ctx.status = 500
        }
    })
}