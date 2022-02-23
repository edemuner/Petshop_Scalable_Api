const NotSuportedValue = require('./errors/NotSupportedValue')
const jsontoxml = require('jsontoxml')

class Serializer{

    json(data){
        return JSON.stringify(data)
    }

    xml(data){
        let tag = this.singleTag

        if (Array.isArray(data)){
            tag = this.pluralTag
            data = data.map(item => {
                return {
                    [this.singleTag] : item
                }
            })
        }
        return jsontoxml({ [tag]: data })
    }

    serialize(data) {
        // this filtering only allows the specified data to be returned at response
        data = this.filter(data)

        // after the filtering, it checks for the accepted contentType for response
        // and pass data to the corresponding formatter or throws error if not supported
        if (this.contentType === 'application/json'){
            return this.json(data)
        } else if (this.contentType === 'application/xml'){
            return this.xml(data)
        }
        throw new NotSuportedValue(this.contentType)
    }

    // here, it checks for the publicFields defined in the subclasses bellow
    // if the data passed has the specified public fields, it is allowed to
    // enter the object that is returned
    objectFilter(data){
        const newObject = {}
        this.publicFields.forEach((field) => {
            if (data.hasOwnProperty(field)){
                newObject[field] = data[field]
            }
        })
        return newObject
    }

    // it filters data, and if there is an array, it filters each item in the array
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

    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        this.publicFields = ['id']
                        .concat(extraFields || [])
        this.singleTag = 'supplier'
        this.pluralTag = 'suppliers'
    }
}

class ErrorSerializer extends Serializer {

    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        this.publicFields = [
            'id',
            'message'
        ].concat(extraFields || [])
        this.singleTag = 'error'
        this.pluralTag = 'errors'

    }
}

class ProductSerializer extends Serializer {

    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        this.publicFields = [
            'id',
            'title'
        ].concat(extraFields || [])

        this.singleTag = 'product'
        this.pluralTag = 'products'
    }
}

module.exports = {
    Serializer : Serializer,
    SupplierSerializer : SupplierSerializer,
    ErrorSerializer : ErrorSerializer,
    productSerializer: ProductSerializer,
    acceptedFormats : ['application/json', 'application/xml']
    
}