const supplierTable = require('./supplierTable')
const InvalidField = require('../../errors/InvalidField')
const NotEnoughData = require('../../errors/NotEnoughData')

class Supplier {

    constructor({ id, company, email, category }){
        this.id = id
        this.company = company
        this.email = email
        this.category = category
    }

    async create() {
        this.validate() // throws error if not valid
        const result = await supplierTable.insert({
            company: this.company,
            email: this.email,
            category: this.category
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatetAt = result.updatetAt
    }

    // this method find the supplier from database by id and get the other
    // attributes based on the loaded database info
    async load(){
        const foundSupplier = await supplierTable.getById(this.id)
        this.company = foundSupplier.company
        this.email = foundSupplier.email
        this.category = foundSupplier.category
        this.createdAt = foundSupplier.createdAt
        this.updatetAt = foundSupplier.updatetAt
    }

    async update(){
        await supplierTable.getById(this.id) // throws error if not found (error instanciated in supplierTable)
        const fields = ['company', 'email', 'category']
        const dataToUpdate = {}

        fields.forEach((field) => {
            const value = this[field]
            
            // for each field, it gets the corresponding object attribute
            // and check if it fits for being updated
            if (typeof value === 'string' && value.length > 0){
                dataToUpdate[field] = value
            }
        })

        // if anything is passed to be updated
        if (Object.keys(dataToUpdate).length === 0) {
            throw new NotEnoughData()
        }

        await supplierTable.update(this.id, dataToUpdate)
    }

    remove(){
        return supplierTable.remove(this.id)
    }

    // this function checks if each field in suppliers fits the correct parameters
    // ir serves the create method, but the other methods have some inner validations as well
    validate(){
        const fields = ['company', 'email', 'category']

        fields.forEach(field => {
            const value = this[field]

            if (typeof value !== 'string' || value.length === 0){
                throw new InvalidField(field)
            }
        })
    }
}

module.exports = Supplier