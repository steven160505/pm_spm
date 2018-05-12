// 数据模型控制器

// 导入工具包
const BaseController = require('./base.js').BaseController,
      apponintmentModel = require('../schemas/apponintment.js');

// 通过继承，创建category控制器
class ApponintmentController extends BaseController {
    constructor() {
        super(apponintmentModel, '_id');
    }
}

// 对外暴露category控制器
exports.ApponintmentController = ApponintmentController;