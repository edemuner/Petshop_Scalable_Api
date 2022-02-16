class NotSuportedValue extends Error {

    constructor(contentType){
        super(`Content type ${contentType} not supported`)
        this.name = 'NotSuportedValue'
        this.idError = 3
    }
}

module.exports = NotSuportedValue