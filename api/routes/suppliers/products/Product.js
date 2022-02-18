const table = require('./productTable')

class Product {

    constructor({ id, title, price, stock, supplier }){
        this.id = id
        this.title = title
        this.price = price
        this.stock = stock
        this.supplier = supplier
    }

    validate(){
        if (typeof this.title !== 'string' || this.title.length === 0){
            throw new Error('Title field is invalid')
        }

        if(typeof this.price !== 'number' || this.price === 0){
            throw new Error('Price field is invalid')
        }
    }

    async create(){
        this.validate()
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