const NotSuportedValue = require('./errors/NotSupportedValue')

class Serializer{

    json(data){
        return JSON.stringify(data)
    }

    serialize(data) {
        if (this.contentType === 'application/json'){
            return this.json(data)
        }
        throw new NotSuportedValue(this.contentType)
    }
}