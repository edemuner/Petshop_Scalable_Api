const NotSuportedValue = require('./errors/NotSupportedValue')

class Serializer{

    json(data){
        return JSON.stringify(data)
    }

    serialize(data) {
        if (this.contentType === 'application/json'){
            return this.json(
                this.filter(data)
            )
        }
        throw new NotSuportedValue(this.contentType)
    }

    objectFilter(data){
        const newObject = {}
        this.publicFields.forEach((field) => {
            if (data.hasOwnProperty(field)){
                newObject[field] = data[field]
            }
        })
        return newObject
    }

    filter(data){
        if (Array.isArray(data)){
            data = data.map(item => this.objectFilter(item))
        } else {
            data = this.objectFilter(data)
        }
        return data
    }
}

class SupplierSerializer extends Serializer {

    constructor(contentType){
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'company', 'category']

    }
}

module.exports = {
    Serializer : Serializer,
    SupplierSerializer : SupplierSerializer,
    acceptedFormats : ['application/json']
    
}