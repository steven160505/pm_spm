// 数据模型控制器

// 导入工具包
const BaseController = require('./base.js').BaseController,
      categoryModel = require('../models/categories.js'),
      goodsModel = require('../models/goods.js');


// 通过继承，创建category控制器
class CategoriesController extends BaseController {
    constructor() {
        super(categoryModel, '_id');
    }
}

// 对外暴露category控制器
exports.CategoriesController = CategoriesController;

// 通过继承，创建goods控制器
class GoodsController extends BaseController {
    constructor() {
        super(goodsModel, '_id');
    }
}

exports.GoodsController = GoodsController;
// 对外暴露goods控制器