const Model = require('./productTableModel')
const instance = require('../../../database')
const NotFound = require('../../../errors/NotFound')

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
            throw new NotFound('Product')
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
    },

    subtract(productId, supplierId, field, amount){
        return instance.transaction(async (transaction) => {
            const product = await Model.findOne({
                where: {
                    id: productId,
                    supplier: supplierId
                }
            })
            
            product[field] = amount

            console.log(product.productData)

            await product.save()

            return product
        })
    }
}