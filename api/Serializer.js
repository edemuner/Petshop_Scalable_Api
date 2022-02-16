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
        data = this.filter(data)

        if (this.contentType === 'application/json'){
            return this.json(data)
        } else if (this.contentType === 'application/xml'){
            return this.xml(data)
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

    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'company', 'category']
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

module.exports = {
    Serializer : Serializer,
    SupplierSerializer : SupplierSerializer,
    ErrorSerializer : ErrorSerializer,
    acceptedFormats : ['application/json', 'application/xml']
    
}