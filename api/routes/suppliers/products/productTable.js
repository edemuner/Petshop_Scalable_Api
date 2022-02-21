const Model = require('./productTableModel')

module.exports = {

    list(supplierId){
        return Model.findAll({
            where: {
                supplier: supplierId
            },
            raw: true
        })
    },

    insert(data){
        return Model.create(data)
    },

    delete(productId, supplierId){
        return Model.destroy({ where: {
            id: productId,
            supplier: supplierId
        }})
    },

    async getById(productId, supplierId){
        const found = await Model.findOne({
            where: {
                id: productId,
                supplier: supplierId
            },
            raw: true
        })

        if (!found){
            throw new Error('Product not found')
        }        
        return found
    },

    update(productData, dataToUpdate){
        return Model.update(
            dataToUpdate,
            {
                where: productData
            }
        )
    }
}