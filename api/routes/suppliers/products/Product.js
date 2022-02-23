const table = require('./productTable')
const NotEnoughData = require('../../../errors/NotEnoughData')
const InvalidField = require('../../../errors/InvalidField')



class Product {

    constructor({ id, title, price, stock, supplier }){
        this.id = id
        this.title = title
        this.price = price
        this.stock = stock
        this.supplier = supplier
    }

    // it doesn't validate empty non strings, non numbers and empty strings and 0 numbers
    validate(){
        if (typeof this.title !== 'string' || this.title.length === 0){
            throw new InvalidField('Title')
        }

        if(typeof this.price !== 'number' || this.price === 0){
            throw new InvalidField('Price')
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

    // as in Suppliers, it loads the object attributes from database, based on id
    async load(){
        const product = await table.getById(this.id, this.supplier.id)
        this.title = product.title
        this.price = product.price
        this.stock = product.stock
        this.createdAt = product.createdAt
        this.updatedAt = product.updatedAt
    }

    update(){
        // the object is created with the new data, so this method validates the
        // object attributes before inserting it on an object to be returned
        // if dataToUpdate is empty, no data was passed to update
        // and it throws an error

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
            throw new NotEnoughData()
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