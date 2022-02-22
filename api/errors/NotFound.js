class NotFound extends Error {

    constructor(field){
        super(`${field} not found`)
        this.name = 'NotFound'
        this.idError = 0
    }
}

module.exports = NotFound