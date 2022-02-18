const table = require('./productTable')

class Product {

    constructor({ id, title, price, stock, supplier }){
        this.id = id
        this.title = title
        this.price = price
        this.stock = stock
        this.supplier = supplier
    }

    async create(){
        const result = await table.insert({
            title: this.title,
            price: this.price,
            stock: this.stock,
            supplier: this.supplier
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    delete(){
        return table.delete(this.id, this.supplier)
    }
}

module.exports = Product