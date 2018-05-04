// 数据模型控制器

// 导入工具包
const BaseController = require('./base.js').BaseController,
      userModel = require('../schemas/user.js');

// 通过继承，创建category控制器
class UsersController extends BaseController {
    constructor() {
        super(userModel, '_id');
    }
}

// 对外暴露category控制器
exports.UsersController = UsersController;