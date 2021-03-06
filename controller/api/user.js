const User = require('../schemas/user');
const _ = require('lodash');

module.exports = {
    async signUp(ctx) {

        let result = {
            success: false,
            message: '注册失败'
        };
        console.log('request body: ', ctx.request.body)
        const { username, email, password } = ctx.request.body;

        // print infomation
        if (!username && !password) {
            result.message = '请填写用户名和密码';
            ctx.body = result;
        } else {
            let user = await User.findOne({ username });
            //检查用户名是否已存在
            if (!user) {
                const newUser = new User({
                    username: username,
                    password: password,
                    email: email,
                });

                const doc = await newUser.save();
                if (!doc.errors) {
                    ctx.redirect('/')
                    // ctx.body = {success: true, message: '注册成功'}
                } else {
                    ctx.body = result;
                }
            } else {
                ctx.body = { success: false, message: '用户名已存在' };
            }
        }
    },

    async signIn(ctx) {
        let result = {
            success: false,
            message: '用户不存在'
        };
        //从请求体中获得参数
        const { username, password } = ctx.request.body;
        //检查数据库中是否存在该用户名
        await User.findOne({
            username
        }, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                ctx.body = result;
            } else {
                //判断密码是否正确
                if (password === user.password) {
                    // ctx.body = {success: true, message: '登入成功'}
                    // 设置session
                    let session = ctx.session
                    session.isLogin = true
                    session.userName = user.username
                    session.userId = user._id
                    if (user.role != undefined && user.role > 5) {
                        ctx.redirect('/appointment/list')
                    } else {
                        ctx.redirect('/')
                    }
                } else {
                    ctx.body = { success: false, message: '密码错误' }
                }
            }
        })
    },

    async logOut(ctx) {
        let session = ctx.session
        session.isLogin = false
        session.userName = ''
        session.userId = ''
        ctx.redirect('/login')
    },

    async editUserInfo(ctx) {

        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            let userId = ctx.session.userId
            let user = await User.findOne({ _id: userId })
            if (user == null || user == undefined || user == '') {
                ctx.status = 500
            } else {
                _.merge(user, ctx.request.body)
                user.save()
                ctx.redirect('/')
            }

        } else {
            ctx.redirect('/user/signin')
        }
    },

    // check current user is administrator or not
    async checkAdmin(ctx, next) {
        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            let userId = ctx.session.userId
            let user = await User.findOne({ _id: userId })

            if (user.role != undefined && user.role > 5) {
                ctx.state = 'admin'
            }
            await next()
        } else {
            ctx.redirect('/login')
        }
    },

    // creator administrator
    async createAdmin(ctx) {
        const { username, email, password } = ctx.request.body
        // check user's session
        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            let userId = ctx.session.userId
            let user = await User.findOne({ _id: userId })
            if (user.role != undefined && user.role > 5) {
                console.log('current user is administrator')
                // print infomation
                if (!username && !password) {
                    result.message = '请填写用户名和密码';
                    ctx.body = result;
                } else {
                    let user = await User.findOne({ username });
                    //检查用户名是否已存在
                    if (!user) {
                        const newUser = new User({
                            username: username,
                            password: password,
                            email: email,
                            role: 10
                        });

                        const doc = await newUser.save();
                        if (!doc.errors) {
                            ctx.redirect('/')
                            // ctx.body = {success: true, message: '注册成功'}
                        } else {
                            ctx.body = result;
                        }
                    } else {
                        ctx.body = { success: false, message: '用户名已存在' };
                    }
                }
            } else {
                console.log('not a administrator, forbidden: ')
            }
        } else {
            ctx.redirect('/user/signin')
        }
    },

    // show user's profile
    async showProile(ctx) {

        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            let userId = ctx.session.userId
            let user = await User.findOne({ _id: userId })
            if (user == null || user == undefined || user == '') {
                ctx.status = 500
            } else {

                await ctx.render('user/user_profile', user)
            }

        } else {
            ctx.redirect('/user/signin')
        }
    }
}