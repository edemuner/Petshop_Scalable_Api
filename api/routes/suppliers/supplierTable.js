const Model = require('./modelSupplierTable')

module.exports = {

    list(){
        return Model.findAll()
    },

    insert(supplier){
        return Model.create(supplier)
    },

    async getById(id){
        const found = await Model.findOne({ 
            where: {
                 id: id
                }
            })
        if (!found) {
            throw new Error('Supplier not found')
        }
        return found
    },

    update(id, dataToUpdate){
        return Model.update(
            dataToUpdate,
            {
                where: { id: id }
            }
        )
    }
}