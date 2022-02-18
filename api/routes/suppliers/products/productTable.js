const Model = require('./productTableModel')

module.exports = {

    list(supplierId){
        return Model.findAll({
            where: {
                supplier: supplierId
            }
        })
    }
}