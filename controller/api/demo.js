const demoModel = require('../models/demo.js');


module.exports = {
    /**
     * 保存数据
     * @param  {[]} data [待保存数据]
     * @return {[type]}      [description]
     */
    save(data) {
        return new Promise((resolve, reject) => {
            //model.create(保存的对象,callback)
            CategoryModel.create(data, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },

    find(data = {}, fields = null, options = {}) {
        return new Promise((resolve, reject) => {
            //model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
            CategoryModel.find(data, fields, options, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    update(id, data) {
        return new Promise((resolve, reject) => {
            // let filter = {};
            // filter[this.key] = id;
            CategoryModel.findOne({'_id':id}, (err, category) => {
                if (err) {
                    reject(err);
                }
                console.log(category)
                category = _.extend(category, data);
                category.save((err, reuslt) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(reuslt);
                })
            })
        })
    },
    findById(id) {
        return new Promise((resolve, reject) => {
            console.log(id);
            CategoryModel.findById(id, (err, doc) => {
                if (err) {
                    reject(err);
                } else { resolve(doc) };
            })
        })
    }
}