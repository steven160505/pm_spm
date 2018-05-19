// 提供基础的CRUD

const MAX_RESULTS = 100;

/**
  Generic controller that provides CRUD operations for a given Mongoose model
*/
class BaseController {

    /**
      @param model Mongoose model
      @param key primary key of the model that will be used for
      searching, removing and reading
    */
    constructor(model, key) {
        this.model = model;
        this.modelName = model.modelName.toLowerCase();
        this.key = key;
    }

    /**
     * 新增一条记录
     * @param  {Object} data 待加入数据
     * @return {Object}      新增加的数据记录
     */
    create(data) {
        return this.model
            .create(data)
            .then((modelInstance) => {
                return modelInstance;
            });
    }

    /**
     * 读取单条记录
     * @param  {String} id   主键ID
     * @return {Object}    单条记录
     */
    read(id) {
        let filter = {};
        filter[this.key] = id;

        return this.model
            .findOne(filter)
            .then((modelInstance) => {
                return modelInstance;
            });
    }


    /**
     * 根据条件查询记录
     * @return {Object} 数据库中记录
     */
    find(data = {}, fields = null, options = {}) {
        return this.model
            .find(data, fields, options)
            .then((modelInstance) => {
                return modelInstance;
            });
    }

    /**
     * 列出所有的记录条数
     * @return {Object} 数据库中记录
     */
    list() {
        return this.model
            .find({})
            .limit(MAX_RESULTS)
            .then((modelInstances) => {
                return modelInstances;
            });
    }

    /**
     * 根据ID删除单条记录
     * @param  {String} id 需删除数据的id
     * @return {Object}    删除结果
     */
    delete(id) {
        let filter = {};
        filter[this.key] = id;

        return this.model
            .remove(filter)
            .then(() => {
                return {};
            })
    }


    /**
     * 更新数据库记录
     * @param  {String} id   该条记录的id
     * @param  {Object} data 需要更新内容
     * @return {Object}      更新结果，若更新，返货结果;若无更新，返回null;
     */
    update(id, data) {
        let filter = {};
        filter[this.key] = id;

        return this.model
            .findOne(filter)
            .then((modelInstance) => {
              console.log("findResult: ");
              console.log(modelInstance);
              if(modelInstance == null || modelInstance == undefined || modelInstance == ''){
                return null;
              }
                for (let attribute in data) {
                    if (data.hasOwnProperty(attribute) && attribute !== this.key && attribute !== "_id") {
                        modelInstance[attribute] = data[attribute];
                    }
                }

                return modelInstance.save();
            })
            .then((modelInstance) => {
                return modelInstance;
            });
    }
}

exports.BaseController = BaseController;