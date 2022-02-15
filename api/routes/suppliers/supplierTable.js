const Model = require('./modelSupplierTable')

module.exports = {

    list(){
        return Model.findAll()
    }
}