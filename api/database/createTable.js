const models = [
    require('../routes/suppliers/modelSupplierTable'),
    require('../routes/suppliers/products/productTableModel')
]


async function createTables(){
    for(let counter = 0; counter < models.length; counter++){
        const model = models[counter]
        await model.sync()
    }
}

createTables()