class NotEnoughData extends Error {

    constructor(){
        super('Not enough data')
        this.name = 'NotEnoughData'
        this.idError = 2
    }
}

module.exports = NotEnoughData