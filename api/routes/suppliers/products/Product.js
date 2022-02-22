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

    async load(){
        const product = await table.getById(this.id, this.supplier.id)
        this.title = product.title
        this.price = product.price
        this.stock = product.stock
        this.createdAt = product.createdAt
        this.updatedAt = product.updatedAt
    }

    update(){
        const dataToUpdate = {}

        if (typeof this.title === 'string' && this.title.length > 0){
            dataToUpdate.title = this.title
        }

        if (typeof this.price === 'number' && this.price > 0){
            dataToUpdate.price = this.price
        }

        if (typeof this.stock === 'number'){
            dataToUpdate.stock = this.stock
        }

        if (Object.keys(dataToUpdate).length === 0){
            throw new Error('No data to update')
        }

        return table.update(
            {
                id: this.id,
                supplier: this.supplier.id
            },
            dataToUpdate
        )
    }

    reduceStock(){
        return table.subtract(
            this.id,
            this.supplier.id,
            'stock',
            this.stock
        )
    }
}

module.exports = Product