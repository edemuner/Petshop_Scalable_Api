const Model = require('./modelSupplierTable')

module.exports = {

    list(){
        return Model.findAll()
    },

    insert(supplier){
        return Model.create(supplier)
    }
}