const SupplierTable = require('./supplierTable')

class Supplier {

    constructor({ id, company, email, category }){
        this.id = id
        this.company = company
        this.email = email
        this.category = category
    }

    async create() {
        const result = await SupplierTable.insert({
            company: this.company,
            email: this.email,
            category: this.category
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatetAt = result.updatetAt
    }
}

module.exports = Supplier